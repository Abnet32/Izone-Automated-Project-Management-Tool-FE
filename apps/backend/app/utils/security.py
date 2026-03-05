from datetime import datetime, timedelta
from uuid import UUID
import hashlib
import os

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from app.db.session import get_db
from app.models.user import User
from app.core.config import settings
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "change_this_secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > 72:
        password = hashlib.sha256(password_bytes).hexdigest()
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode("utf-8")
    if len(password_bytes) > 72:
        plain_password = hashlib.sha256(password_bytes).hexdigest()
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception

    subject = payload.get("sub")
    if subject is None:
        raise credentials_exception


    user = db.query(User).filter(User.email == subject).first()
    if user is None:
        try:
            user_id = UUID(subject)
            user = db.query(User).filter(User.id == user_id).first()
        except (ValueError, TypeError):
            user = None

    if user is None:
        raise credentials_exception

    return user
def create_invitation_token(
    workspace_id: str,
    invited_user_id: int | None = None, 
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
) -> str:
    to_encode = {
        "sub": str(invited_user_id) if invited_user_id else None,
        "workspace_id": str(workspace_id),
        "exp": expires_at,
        "iat": datetime.now(timezone.utc),
        "type": "workspace_invite",
    }

    
    to_encode["exp"] = expires_at


    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")


def verify_invitation_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        if payload.get("type") != "workspace_invite":
            return None
        return payload
    except JWTError:
        return None
