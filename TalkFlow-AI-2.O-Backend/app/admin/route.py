from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.admin.service import get_dashboard_data , get_call_logs
from app.core.security import get_current_user
from app.admin.business_model import KnowledgeBase

router = APIRouter(prefix="/admin/dashboard", tags=["Dashboard"])

@router.get("/call-logs")
def call_logs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_call_logs(db, skip, limit)

@router.get("/{business_id}")
def dashboard(business_id: int, db: Session = Depends(get_db)):
    return get_dashboard_data(db, business_id)

@router.delete("/knowledge/{knowledge_id}")
def delete_kb(
    knowledge_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    kb = db.query(KnowledgeBase).filter_by(id=knowledge_id).first()

    if not kb:
        return {"message": "Knowledge not found"}

    db.delete(kb)
    db.commit()

    return {"message": "Deleted successfully"}