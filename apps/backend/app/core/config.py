from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn, EmailStr, field_validator
from typing import Optional


class Settings(BaseSettings):
    # Database
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int = 5432
    DB_NAME: str

    @property
    def DATABASE_URL(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+psycopg2",
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            host=self.DB_HOST,
            port=self.DB_PORT,
            path=f"/{self.DB_NAME}",
        )

    # Security
    SECRET_KEY: str

    # Frontend
    FRONTEND_URL: str 

    # Google OAuth
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

    # GitHub OAuth
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str

    # Email
    MAIL_MAILER: str = "smtp"
    MAIL_HOST: str
    MAIL_PORT: int = 587
    MAIL_USERNAME: EmailStr
    MAIL_PASSWORD: str
    MAIL_ENCRYPTION: str = "tls"

   

    model_config = SettingsConfigDict(
        env_file=".env",            
        env_file_encoding="utf-8",
        case_sensitive=False,       
        extra="ignore",               
    )


settings = Settings()