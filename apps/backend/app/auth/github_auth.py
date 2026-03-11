from os import environ
import uuid
from fastapi import APIRouter, Request, Depends, HTTPException
from starlette.responses import RedirectResponse

from sqlalchemy.orm import Session
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.workspaces.schema import RoleEnum
from app.db.session import SessionLocal
from app.utils.security import create_access_token
from authlib.integrations.starlette_client import OAuth
from app.core.config import settings

oauth = OAuth()

oauth.register(
    name="github",
    client_id=settings.GITHUB_CLIENT_ID,
    client_secret=settings.GITHUB_CLIENT_SECRET,
    access_token_url="https://github.com/login/oauth/access_token",
    authorize_url="https://github.com/login/oauth/authorize",
    api_base_url="https://api.github.com/",
    client_kwargs={"scope": "user:email"},
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/auth/github/login")
async def login(request: Request):
    redirect_uri = request.url_for("github_callback")
    return await oauth.github.authorize_redirect(request, redirect_uri)
@router.get("/auth/github/callback", name="github_callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):    
    token = await oauth.github.authorize_access_token(request)
    if not token:
        raise HTTPException(status_code=400, detail="Missing token")
    resp = await oauth.github.get("user", token=token)
    profile = resp.json()
    email = profile.get("email")
    if not email:
        emails_resp = await oauth.github.get("user/emails", token=token)
        emails = emails_resp.json()
        primary_emails = [e for e in emails if e.get("primary") and e.get("verified")]
        if not primary_emails:
            raise HTTPException(status_code=400, detail="No verified primary email found for GitHub user")
        email = primary_emails[0].get("email")
    user = db.query(User).filter_by(email=email).first()
    if not user:
        user = User(
            email=email,
            full_name=profile.get("name") or "",
            avatar_url=profile.get("avatar_url"),
            hashed_password=str(uuid.uuid4())
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        default_ws = Workspace(
            name=f"{user.full_name or 'My'} Workspace",
            description="Default workspace created automatically",
            owner_id=user.id,
        )
        db.add(default_ws)
        db.flush()
        db.refresh(default_ws)

        membership = WorkspaceMember(
            workspace_id=default_ws.id,
            user_id=user.id,
            role=RoleEnum.owner
        )
        db.add(membership)
        db.commit()

    access_token = create_access_token(data={"sub": user.email})
    frontend =settings.FRONTEND_URL
    return RedirectResponse(url=f"{frontend}/auth/success?token={access_token}")