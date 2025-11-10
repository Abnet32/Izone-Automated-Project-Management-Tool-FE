# routers/organization_router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ..db.session import get_db

from .schema import (
    Create, OrganizationOut, OrganizationUpdate,
    MemberAdd, MemberOut
)
from crud import (
    create_organization, get_organization_by_id, update_organization,
    delete_organization, add_member, remove_member
)
from security import get_current_user

from models.user import User

router = APIRouter(prefix="/organizations", tags=["Organizations"])


# CREATE
@router.post("/", response_model=OrganizationOut, status_code=status.HTTP_201_CREATED)
def create_org(
    payload: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    payload.owner_id = current_user.id               # force JWT user
    return create_organization(db, payload, current_user.id)


# READ ONE
@router.get("/{org_id}", response_model=OrganizationOut)
def read_org(
    org_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    org = get_organization_by_id(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org


# UPDATE
@router.put("/{org_id}", response_model=OrganizationOut)
def update_org(
    org_id: UUID,
    payload: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_organization(db, org_id, payload, current_user.id)


# DELETE
@router.delete("/{org_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_org(
    org_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not delete_organization(db, org_id, current_user.id):
        raise HTTPException(status_code=404, detail="Organization not found")
    return None


# ADD MEMBER
@router.post("/{org_id}/members", response_model=MemberOut, status_code=status.HTTP_201_CREATED)
def add_member_endpoint(
    org_id: UUID,
    payload: MemberAdd,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    member = add_member(db, org_id, payload, current_user.id)
    return MemberOut(
        user_id=member.user_id,
        role=member.role,
        created_at=member.created_at
    )


# REMOVE MEMBER
@router.delete("/{org_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_member_endpoint(
    org_id: UUID,
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    remove_member(db, org_id, user_id, current_user.id)
    return None