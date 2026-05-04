from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user

# from app.admin.business_service import create_business, add_knowledge, get_business_data

from app.admin.business_service import (
    create_business,
    add_knowledge,
    get_business_data,
    get_all_businesses,
    delete_business,
)

router = APIRouter(prefix="/admin/business", tags=["Business"])


# ✅ CREATE BUSINESS
@router.post("/create")
def create(
    data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return create_business(db, data, current_user)


@router.get("/all")
def get_all(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_all_businesses(db, current_user)

# ✅ ADD KNOWLEDGE
@router.post("/knowledge")
def add_kb(
    data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return add_knowledge(db, data)


# ✅ GET BUSINESS DATA
@router.get("/{business_id}")
def get_business(
    business_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_business_data(db, business_id)


@router.delete("/{business_id}")
def delete(
    business_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return delete_business(
        db,
        business_id,
        current_user
    )



