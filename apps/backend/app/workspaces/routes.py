from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from app.db.session import get_db
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from app.middleware import get_current_user, require_workspace_member, require_workspace_admin, require_workspace_owner
from .schema import (
    WorkspaceCreate, WorkspaceOut, WorkspaceUpdate,
    MemberAdd, MemberOut, RoleUpdateRequest
)
from .crud import (
    create_workspace, update_workspace, delete_workspace,
    add_member, remove_member, get_members_with_details,
    update_member_role
)

router = APIRouter(prefix="/workspaces", tags=["Workspaces"])


@router.post("/", response_model=WorkspaceOut, status_code=status.HTTP_201_CREATED)
def create_workspace_endpoint(
    payload: WorkspaceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  
):
    
    return create_workspace(db, payload, current_user.id)


@router.get("/", response_model=List[WorkspaceOut])
def list_workspaces(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)   
):
    member_rows = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id
    ).all()
    workspace_ids = [m.workspace_id for m in member_rows]
    return db.query(Workspace).filter(Workspace.id.in_(workspace_ids)).all()


@router.get("/{workspace_id}", response_model=WorkspaceOut)
def get_workspace_endpoint(
    workspace_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_workspace_member())
):
    ws = db.get(Workspace, workspace_id)
    if not ws:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return ws


@router.put("/{workspace_id}", response_model=WorkspaceOut)
def update_workspace_endpoint(
    workspace_id: UUID,
    payload: WorkspaceUpdate,
    db: Session = Depends(get_db),

    current_user: User = Depends(require_workspace_owner())
):
    return update_workspace(db, workspace_id, payload, current_user.id)


@router.delete("/{workspace_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_workspace_endpoint(
    workspace_id: UUID,
    db: Session = Depends(get_db),

    current_user: User = Depends(require_workspace_owner())
):
    if not delete_workspace(db, workspace_id, current_user.id):
        raise HTTPException(status_code=404, detail="Workspace not found")
    return None




@router.get("/{workspace_id}/members", response_model=List[MemberOut])
def list_members_endpoint(
    workspace_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_workspace_member())
):
    return get_members_with_details(db, workspace_id)


@router.post("/{workspace_id}/members", response_model=MemberOut)
def add_member_endpoint(
    workspace_id: UUID,
    payload: MemberAdd,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_workspace_admin())
):
    return add_member(db, workspace_id, payload, current_user.id)


@router.delete("/{workspace_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_member_endpoint(
    workspace_id: UUID,
    user_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_workspace_admin())
):
    remove_member(db, workspace_id, user_id, current_user.id)
    return None


@router.patch("/{workspace_id}/members/{member_id}/role", response_model=MemberOut)
def update_member_role_endpoint(
    workspace_id: UUID,
    member_id: UUID,
    payload: RoleUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_workspace_admin())
):
    return update_member_role(db, workspace_id, member_id, payload.role, current_user.id)
