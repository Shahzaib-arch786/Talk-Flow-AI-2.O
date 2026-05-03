import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.admin.business_model import Business
from app.rag.service import process_document_upload

router = APIRouter(
    prefix="/rag",
    tags=["RAG"]
)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    business = db.query(Business).filter_by(
        user_id=current_user.id,
        is_active=True
    ).first()

    if not business:
        return {"error": "No active business found"}

    os.makedirs("temp_docs", exist_ok=True)

    file_path = f"temp_docs/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_document_upload(
        db,
        business.id,
        file_path
    )

    os.remove(file_path)

    return result