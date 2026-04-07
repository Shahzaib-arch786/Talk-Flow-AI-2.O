from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime
from app.core.database import Base


class ConversationLog(Base):
    __tablename__ = "conversation_logs"

    id = Column(Integer, primary_key=True, index=True)

    session_id = Column(String, index=True)
    business_id = Column(Integer, index=True)

    user_text = Column(Text)
    language = Column(String, default="EN")

    intent = Column(String, index=True)
    confidence = Column(Float)

    response_text = Column(Text)

    audio_url = Column(String)

    processing_time = Column(Float)

    created_at = Column(DateTime, default=datetime.utcnow)