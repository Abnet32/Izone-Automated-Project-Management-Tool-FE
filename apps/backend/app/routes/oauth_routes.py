from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from app.auth.oauth import oauth
from app.auth.auth_utils import create_jwt
import os

router = APIRouter()

FRONTEND = os.getenv("FRONTEND_URL")
@router.get("/auth/google/login")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)
@router.get("/auth/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)

    user = token.get("userinfo")

    email = user["email"]

    jwt_token = create_jwt(email)

    response = RedirectResponse(f"{FRONTEND}/dashboard")

    response.set_cookie(
        key="auth_token",
        value=jwt_token,
        httponly=True,
        samesite="lax",
        secure=False,
        path="/"
    )

    return response
@router.get("/auth/github/login")
async def github_login(request: Request):
    redirect_uri = request.url_for("github_callback")
    return await oauth.github.authorize_redirect(request, redirect_uri)
@router.get("/auth/github/callback")
async def github_callback(request: Request):
    token = await oauth.github.authorize_access_token(request)

    resp = await oauth.github.get("user", token=token)
    user = resp.json()

    username = user["login"]

    jwt_token = create_jwt(username)

    response = RedirectResponse(f"{FRONTEND}/dashboard")

    response.set_cookie(
        key="auth_token",
        value=jwt_token,
        httponly=True,
        samesite="lax",
        secure=False,
        path="/"
    )

    return response