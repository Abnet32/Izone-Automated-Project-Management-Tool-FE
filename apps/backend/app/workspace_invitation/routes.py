from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from uuid import UUID

from app.db.session import get_db
from app.utils.email import send_invitation_email
from app.models import Workspace, User, WorkspaceInvitation
from app.workspace_invitation.schema import WorkspaceInvitationCreate, WorkspaceInvitationResponse
from app.utils.security import create_invitation_token, verify_invitation_token
from app.workspace_invitation.crud import accept_workspace_invitation, create_workspace_invitation, get_invitation_by_token
from app.workspaces.crud import is_admin_or_owner
from app.middleware import get_current_user
from app.core.config import settings

router = APIRouter(prefix="/workspaces", tags=["workspace-invitations"])


@router.post("/{workspace_id}/invite", response_model=WorkspaceInvitationResponse)
async def invite_to_workspace(
    workspace_id: UUID,
    invite_in: WorkspaceInvitationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
  
    if not is_admin_or_owner(db, workspace_id, current_user.id):
        raise HTTPException(status_code=403, detail="Only admin or owner can invite users")

    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    target_user = db.query(User).filter(User.email == invite_in.email).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="User with this email does not exist. They must register first.")

    
    existing_invite = db.query(WorkspaceInvitation).filter(
        WorkspaceInvitation.workspace_id == workspace_id,
        WorkspaceInvitation.invited_user_id == target_user.id,
        WorkspaceInvitation.is_accepted == False,  
        WorkspaceInvitation.expires_at > datetime.now(timezone.utc)
    ).first()

    if existing_invite:
        raise HTTPException(status_code=400, detail="An active invitation already exists for this user")

   
    token = create_invitation_token(
        workspace_id=str(workspace_id),
        invited_user_id=target_user.id,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7)
    )

  
    new_invite = create_workspace_invitation(
        db=db,
        obj_in=invite_in,
        workspace_id=workspace_id,
        invited_by_id=current_user.id,
        token=token,
    )

   
    invite_link = f"{settings.FRONTEND_URL.rstrip('/')}/accept-invite?token={token}"
    background_tasks.add_task(
        send_invitation_email,
        email=invite_in.email,
        workspace_name=workspace.name,
        invite_link=invite_link,
    )

    return new_invite


@router.get("/invitations/{token}", response_model=WorkspaceInvitationResponse)
async def get_invitation(token: str, db: Session = Depends(get_db)):
  
    payload = verify_invitation_token(token)
    if not payload:
        raise HTTPException(status_code=404, detail="Invitation invalid or expired")

    invite = get_invitation_by_token(db, token)
    if not invite:
        raise HTTPException(status_code=404, detail="Invitation not found, already used or revoked")

    if str(invite.workspace_id) != payload.get("workspace_id"):
        raise HTTPException(status_code=400, detail="Token mismatch with stored invitation")

    return invite


@router.post("/invitations/{token}/accept")
async def accept_invite(
    token: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    payload = verify_invitation_token(token)
    if not payload:
        raise HTTPException(status_code=404, detail="Invitation invalid, expired or tampered with")

    expected_workspace_id_str = payload.get("workspace_id")
    expected_user_id_str = payload.get("sub")

    if not expected_user_id_str or not expected_workspace_id_str:
        raise HTTPException(status_code=400, detail="Invalid invitation token structure")

    try:
        expected_user_id = UUID(expected_user_id_str)
        expected_workspace_id = UUID(expected_workspace_id_str)
    except (ValueError, AttributeError):
        raise HTTPException(status_code=400, detail="Invalid invitation token")

   
    if expected_user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="This invitation was sent to a different account. Please log in with the invited email."
        )

  
    invite = get_invitation_by_token(db, token)
    if not invite:
        raise HTTPException(status_code=404, detail="Invitation not found, already used or revoked")

    if invite.workspace_id != expected_workspace_id:
        raise HTTPException(status_code=400, detail="Token does not match stored invitation")

    try:
        new_member = accept_workspace_invitation(db, invite, current_user.id)
        return {
            "status": "success",
            "workspace_id": str(new_member.workspace_id),
            "role": new_member.role
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to join workspace: {str(e)}")