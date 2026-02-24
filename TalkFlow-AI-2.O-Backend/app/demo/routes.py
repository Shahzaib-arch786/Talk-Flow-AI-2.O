from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from .schemas import DemoUserCreate, DemoUserResponse
from .services import create_demo_user
from datetime import datetime
from .models import DemoUser
from fastapi import HTTPException

router = APIRouter(prefix="/demo", tags=["User Panel"])


@router.post("/start", response_model=DemoUserResponse)
def start_demo(
    data: DemoUserCreate,
    db: Session = Depends(get_db)
):
    demo_user = create_demo_user(db, data.full_name, data.email)
    return demo_user

@router.get("/validate/{session_id}")
def validate_session(session_id: str, db: Session = Depends(get_db)):

    user = db.query(DemoUser).filter(DemoUser.session_id == session_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Invalid session")

    now = datetime.utcnow()

    if now > user.expires_at:
        raise HTTPException(status_code=403, detail="Demo expired")

    remaining_seconds = int((user.expires_at - now).total_seconds())

    return {
        "message": "Session valid",
        "remaining_seconds": remaining_seconds
    }