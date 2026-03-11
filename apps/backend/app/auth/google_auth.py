from os import environ
import uuid
from fastapi import APIRouter, Request, Depends, HTTPException
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.workspaces.schema import RoleEnum
from app.db.session import SessionLocal
from app.utils.security import create_access_token
from app.core.config import settings

oauth = OAuth()

oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
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
        hashed_password=str(uuid.uuid4())
    )
    db.add(user)
    db.flush()
    db.refresh(user)

    default_ws = Workspace(
        name=f"{user.full_name or 'My'} Workspace",
        description="Default workspace created automatically",
        owner_id=user.id,
        created_by=user.id
    )
    db.add(default_ws)
    db.flush()

    db.add(WorkspaceMember(
        workspace_id=default_ws.id,
        user_id=user.id,
        role=RoleEnum.owner
    ))
    db.commit()
    access_token = create_access_token({"sub": str(user.id)})
    frontend = settings.FRONTEND_URL
    return RedirectResponse(url=f"{frontend}/auth/success?token={access_token}")
