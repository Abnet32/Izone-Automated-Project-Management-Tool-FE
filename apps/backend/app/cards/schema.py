from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.card import Priority


class CardBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Priority = Priority.medium
    position: Optional[int] = 0


class CardCreate(CardBase):
    pass


class CardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    priority: Optional[Priority] = None
    position: Optional[int] = None


class CardResponse(CardBase):
    id: str
    list_id: str
    created_by: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
