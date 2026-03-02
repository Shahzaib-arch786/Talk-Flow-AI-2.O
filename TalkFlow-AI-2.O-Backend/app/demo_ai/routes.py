import os
import shutil
from unittest import result
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.demo.models import DemoUser
from datetime import datetime
from app.demo_ai.pipeline import process_voice
from app.demo_ai.session_store import get_ai_session

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/voice")
async def voice_ai(
    session_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # 1. Validate session
    user = db.query(DemoUser).filter(DemoUser.session_id == session_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Invalid session")

    if datetime.utcnow() > user.expires_at:
        raise HTTPException(status_code=403, detail="Demo expired")

    # 2. Save uploaded file temporarily
    temp_audio_path = f"temp_{session_id}.webm"

    with open(temp_audio_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 3. Get AI session state
    session_data = get_ai_session(session_id)

    response_manager = session_data["manager"]
    state = session_data["state"]

    # 4. Process pipeline
    result = process_voice(temp_audio_path, response_manager, state, session_id)

    # 5. Remove temp file
    if os.path.exists(temp_audio_path):
        os.remove(temp_audio_path)

    remaining_seconds = int((user.expires_at - datetime.utcnow()).total_seconds())

    result["remaining_seconds"] = remaining_seconds

    return result