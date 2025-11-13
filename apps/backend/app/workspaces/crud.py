# crud/organization_crud.py
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from uuid import UUID
from datetime import datetime

from apps.backend.app.models.workspace import Organization, OrganizationMember, RoleEnum
from models.user import User
from schemas.organization_schema import OrganizationCreate, OrganizationUpdate, MemberAdd


# ---------- Helper ----------
def _user_exists(db: Session, user_id: UUID) -> User:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=400, detail="user_id does not exist")
    return user


# ---------- Organization ----------
def create_organization(db: Session, data: OrganizationCreate, current_user_id: UUID) -> Organization:
    _user_exists(db, data.owner_id)          # validates owner exists
    # Enforce owner == current user (optional but recommended)
    if data.owner_id != current_user_id:
        raise HTTPException(status_code=403, detail="Cannot create org for another user")

    org = Organization(
        name=data.name,
        description=data.description,
        owner_id=data.owner_id
    )
    db.add(org)
    db.flush()                               # get org.id without commit

    # Owner is automatically admin
    db.add(OrganizationMember(
        organization_id=org.id,
        user_id=data.owner_id,
        role=RoleEnum.admin
    ))
    db.commit()
    db.refresh(org)
    return org


def get_organization_by_id(db: Session, org_id: UUID) -> Organization | None:
    return db.get(Organization, org_id)


def update_organization(db: Session, org_id: UUID, data: OrganizationUpdate, user_id: UUID) -> Organization:
    org = get_organization_by_id(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    if org.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Only owner can update")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(org, key, value)

    db.commit()
    db.refresh(org)
    return org


def delete_organization(db: Session, org_id: UUID, user_id: UUID) -> bool:
    org = get_organization_by_id(db, org_id)
    if not org:
        return False
    if org.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Only owner can delete")
    db.delete(org)
    db.commit()
    return True


# ---------- Members ----------
def is_admin(db: Session, org_id: UUID, user_id: UUID) -> bool:
    member = db.query(OrganizationMember).filter(
        OrganizationMember.organization_id == org_id,
        OrganizationMember.user_id == user_id,
        OrganizationMember.role == RoleEnum.admin
    ).first()
    return member is not None


def add_member(db: Session, org_id: UUID, data: MemberAdd, requester_id: UUID) -> OrganizationMember:
    if not is_admin(db, org_id, requester_id):
        raise HTTPException(status_code=403, detail="Only admin can add members")

    if not get_organization_by_id(db, org_id):
        raise HTTPException(status_code=404, detail="Organization not found")

    _user_exists(db, data.user_id)

    # Prevent duplicate
    exists = db.query(OrganizationMember).filter(
        OrganizationMember.organization_id == org_id,
        OrganizationMember.user_id == data.user_id
    ).first()
    if exists:
        raise HTTPException(status_code=400, detail="User is already a member")

    member = OrganizationMember(
        organization_id=org_id,
        user_id=data.user_id,
        role=data.role
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


def remove_member(db: Session, org_id: UUID, user_id: UUID, requester_id: UUID) -> None:
    if not is_admin(db, org_id, requester_id):
        raise HTTPException(status_code=403, detail="Only admin can remove members")

    member = db.query(OrganizationMember).filter(
        OrganizationMember.organization_id == org_id,
        OrganizationMember.user_id == user_id
    ).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    # Last admin protection
    admin_count = db.query(OrganizationMember).filter(
        OrganizationMember.organization_id == org_id,
        OrganizationMember.role == RoleEnum.admin
    ).count()
    if member.role == RoleEnum.admin and admin_count <= 1:
        raise HTTPException(status_code=400, detail="Cannot remove the last admin")

    db.delete(member)
    db.commit()