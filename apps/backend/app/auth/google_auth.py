from os import environ
import uuid

from fastapi import APIRouter, Request, Depends, HTTPException
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session

from app.models.user import User
from app.db.session import SessionLocal
from app.utils.security import create_access_token

oauth = OAuth()
oauth.register(
    name="google",
    client_id=environ.get("GOOGLE_CLIENT_ID"),
    client_secret=environ.get("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/auth/google/login")
async def login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/auth/google/callback", name="google_callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    if not token:
        raise HTTPException(status_code=400, detail="Missing token")
    userinfo = token.get("userinfo") or await oauth.google.parse_id_token(request, token)
    email = userinfo.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email not provided by Google")
    user = db.query(User).filter_by(email=email).first()
    if not user:
        user = User(
            email=email,
            full_name=userinfo.get("name") or "",
            avatar_url=userinfo.get("picture"),
            hashed_password=str(uuid.uuid4())  # placeholder since hashed_password is required
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    access_token = create_access_token({"sub": str(user.id)})
    frontend = environ.get("FRONTEND_URL", "http://localhost:3000")
    return RedirectResponse(url=f"{frontend}/auth/success?token={access_token}")
