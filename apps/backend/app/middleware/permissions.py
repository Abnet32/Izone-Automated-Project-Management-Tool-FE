

from uuid import UUID
from typing import Callable
from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.utils.security import get_current_user
from app.workspaces.crud import is_member, is_admin_or_owner, is_owner


def require_workspace_member(workspace_id_param: str = "workspace_id") -> Callable:

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

        if not is_member(db, workspace_id, current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not a member of this workspace"
            )
        return current_user

    return dependency


def require_workspace_admin(workspace_id_param: str = "workspace_id") -> Callable:

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

        if not is_admin_or_owner(db, workspace_id, current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only an admin or workspace owner can perform this action"
            )
        return current_user

    return dependency


def require_workspace_owner(workspace_id_param: str = "workspace_id") -> Callable:

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

        if not is_owner(db, workspace_id, current_user.id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the workspace owner can perform this action"
            )
        return current_user

    return dependency
