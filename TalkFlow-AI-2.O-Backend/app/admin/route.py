from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.admin.service import get_dashboard_data , get_call_logs

router = APIRouter(prefix="/admin/dashboard", tags=["Dashboard"])

@router.get("/call-logs")
def call_logs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_call_logs(db, skip, limit)

@router.get("/{business_id}")
def dashboard(business_id: int, db: Session = Depends(get_db)):
    return get_dashboard_data(db, business_id)

