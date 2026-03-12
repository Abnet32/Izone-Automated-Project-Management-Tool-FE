from fastapi import APIRouter, Depends, HTTPException, status,Request
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List,Callable
from app.db.session import get_db
from app.models.user import User
from app.models.workspace import Workspace, WorkspaceMember
from .crud import get_member_role, RoleEnum
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

def require_non_guest_member(workspace_id_param: str = "workspace_id") -> Callable:
    def dependency(
        request: Request,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user),
    ) -> User:
        raw_id = request.path_params.get(workspace_id_param)
        if not raw_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Missing path param: {workspace_id_param}"
            )
        workspace_id = UUID(str(raw_id))

        role = get_member_role(db, workspace_id, current_user.id)
        if not role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not a member of this workspace"
            )
        if role == RoleEnum.guest:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Guests cannot access this endpoint"
            )
        return current_user

    return dependency




@router.post("/", response_model=WorkspaceOut, status_code=status.HTTP_201_CREATED)
def create_workspace_endpoint(
    payload: WorkspaceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  
):
    member = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id
    ).first()

    if member:
        raise HTTPException(
            status_code=403,
            detail="You are already a member of a workspace and cannot create a new one"
        )
    
    return create_workspace(db, payload, current_user.id)


@router.get("/", response_model=List[WorkspaceOut])
def list_workspaces(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)   
):

    member_rows = db.query(WorkspaceMember).filter(
        WorkspaceMember.user_id == current_user.id,
        WorkspaceMember.role != RoleEnum.guest
    ).all()
    workspace_ids = [m.workspace_id for m in member_rows]
    return db.query(Workspace).filter(Workspace.id.in_(workspace_ids)).all()


@router.get("/{workspace_id}", response_model=WorkspaceOut)
def get_workspace_endpoint(
    workspace_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_non_guest_member())
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

    current_user: User = Depends(require_workspace_admin())
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
