from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from .schemas import DemoUserCreate, DemoUserResponse
from .services import create_demo_user

router = APIRouter(prefix="/demo", tags=["User Panel"])


@router.post("/start", response_model=DemoUserResponse)
def start_demo(
    data: DemoUserCreate,
    db: Session = Depends(get_db)
):
    demo_user = create_demo_user(db, data.full_name, data.email)
    return demo_user
