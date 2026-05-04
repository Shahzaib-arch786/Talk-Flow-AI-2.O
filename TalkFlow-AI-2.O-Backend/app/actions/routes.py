from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.admin.business_model import Business
from app.actions.service import (
    create_action,
    get_actions,
    delete_action,
    get_requests
)

router = APIRouter(
    prefix="/actions",
    tags=["Actions"]
)


# ----------------------------
# CREATE ACTION
# ----------------------------
@router.post("/create")
def create_business_action(
    data: dict,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    business = db.query(Business).filter_by(
        user_id=current_user.id,
        is_active=True
    ).first()

    if not business:
        return {"error": "No active business found"}

    return create_action(
        db,
        business.id,
        data
    )


# ----------------------------
# GET ACTIONS
# ----------------------------
@router.get("/")
def fetch_actions(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    business = db.query(Business).filter_by(
        user_id=current_user.id,
        is_active=True
    ).first()

    if not business:
        return []

    return get_actions(
        db,
        business.id
    )


# ----------------------------
# GET REQUESTS
# ----------------------------
@router.get("/requests")
def fetch_requests(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    business = db.query(Business).filter_by(
        user_id=current_user.id,
        is_active=True
    ).first()

    if not business:
        return []

    return get_requests(
        db,
        business.id
    )

@router.get("/{business_id}")
def get_business_actions(
    business_id: int,
    db: Session = Depends(get_db)
):
    return get_actions(db, business_id)

@router.delete("/{action_id}")
def remove_action(
    action_id: int,
    db: Session = Depends(get_db)
):
    return delete_action(db, action_id)