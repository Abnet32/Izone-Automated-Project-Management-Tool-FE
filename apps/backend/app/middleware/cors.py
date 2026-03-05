

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-production-domain.com",
]


def setup_cors(app: FastAPI) -> None:
    """
    Register CORS middleware on the FastAPI app.
    Must be called BEFORE app.include_router() so that
    error responses (401, 403) also carry CORS headers.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True,   
        allow_methods=["*"],      
        allow_headers=["*"],      
    )
