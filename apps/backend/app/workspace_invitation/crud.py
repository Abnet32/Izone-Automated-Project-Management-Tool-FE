from sqlalchemy.orm import Session, joinedload
from datetime import datetime, timedelta, timezone
from uuid import UUID
from app.models import WorkspaceInvitation, WorkspaceMember,User
from app.workspace_invitation import schema as schemas

def create_workspace_invitation(
    db: Session,
    obj_in: schemas.WorkspaceInvitationCreate,
    workspace_id: UUID,
    invited_by_id: UUID,        
    token: str                  
):
  
    target_user = db.query(User).filter(User.email == obj_in.email).first()
    if not target_user:
        raise ValueError("User with this email does not exist")

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)

    db_obj = WorkspaceInvitation(
        workspace_id=workspace_id,
        invited_user_id=target_user.id,
        role=obj_in.role,
        invited_by_id=invited_by_id,
        token=token,                
        expires_at=expires_at,
        is_accepted=False
    )

    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    print(">>> Created invitation:", db_obj)

  
    return (
        db.query(WorkspaceInvitation)
        .options(joinedload(WorkspaceInvitation.invitee))
        .filter(WorkspaceInvitation.id == db_obj.id)
        .first()
    )


def get_invitation_by_token(db: Session, token: str):
    return (
        db.query(WorkspaceInvitation)
        .options(joinedload(WorkspaceInvitation.invitee))
        .filter(
            WorkspaceInvitation.token == token,
            WorkspaceInvitation.is_accepted == False,
            WorkspaceInvitation.expires_at > datetime.now(timezone.utc)
        )
        .first()
    )


def accept_workspace_invitation(
    db: Session,
    invitation: WorkspaceInvitation,
    user_id: UUID
):
    new_member = WorkspaceMember(
        workspace_id=invitation.workspace_id,
        user_id=user_id,
        role=invitation.role
    )
    db.add(new_member)

    invitation.is_accepted = True
   

    db.commit()
    db.refresh(new_member)
    
    return new_member