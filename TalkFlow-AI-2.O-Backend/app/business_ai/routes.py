import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.core.database import get_db
from app.core.security import get_current_user
from app.business_ai.pipeline import process_voice_business
from app.demo_ai.session_store import get_ai_session
from app.business_ai.response_manager import BusinessResponseManager
from app.admin.business_model import Business
from app.admin.business_service import get_business_data





router = APIRouter(
    prefix="/business-ai",
    tags=["Business AI"]
)


class TextRequest(BaseModel):
    text: str


@router.post("/voice")
async def voice_ai(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        print("VOICE ROUTE HIT")

        session_id = str(current_user.id)

        temp_audio_path = f"temp_{session_id}.webm"

        # save uploaded file
        with open(temp_audio_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        session_data = get_ai_session(session_id)
        state = session_data["state"]

        result = process_voice_business(
            temp_audio_path,
            state,
            session_id,
            db,
            current_user
        )

        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)

        return result

    except Exception as e:
        print("VOICE ERROR:", e)
        return {
            "error": str(e)
        }

@router.post("/text")
def text_ai(
    data: dict,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    # ✅ session
    session_id = str(current_user.id)
    session_data = get_ai_session(session_id)
    state = session_data["state"]

    # ✅ get business
    business = db.query(Business).filter_by(
        user_id=current_user.id,
        is_active=True
    ).first()

    if not business:
        return {"response_text": "No business found"}

    # ✅ business data
    business_data = get_business_data(db, business.id)

    # ✅ response manager
    response_manager = BusinessResponseManager()

    # ✅ generate
    response = response_manager.generate_response(
        {"intent": "general", "confidence": 0.9},
        data.get("text"),
        state,
        business_data,
        db
    )

    return {
        "response_text": response,
        "intent": "general",
        "confidence": 0.9
    }


@router.post("/text-stream")
def text_stream(
    data: TextRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    session_id = str(current_user.id)
    session_data = get_ai_session(session_id)
    state = session_data["state"]

    business = db.query(Business).filter_by(
        user_id=current_user.id,
        is_active=True
    ).first()

    if not business:
        return {
            "response_text": "No business found"
        }

    business_data = get_business_data(db, business.id)

    response_manager = BusinessResponseManager()

    def generator():
        for chunk in response_manager.generate_stream_response(
            data.text,
            state,
            business_data
        ):
            yield chunk

    return StreamingResponse(generator(), media_type="text/plain")

#     response = response_manager.generate_response(
#     {"intent": "general", "confidence": 0.9},
#     data.text,
#     state,
#     business_data,
#     db
# )

# # if response manager already returns dict
#     if isinstance(response, dict):
#         return response

#     # if response manager returns plain string
#     return {
#         "response_text": response, 
#         "intent": "general",
#         "confidence": 0.9
#     }
    