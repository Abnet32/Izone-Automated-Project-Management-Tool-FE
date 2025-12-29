from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class ListBase(BaseModel):
    title: str
    position: Optional[int] = 0


class ListCreate(ListBase):
     project_id: UUID


class ListUpdate(BaseModel):
    title: Optional[str] = None
    position: Optional[int] = None


class ListResponse(ListBase):
    id: UUID
    project_id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True