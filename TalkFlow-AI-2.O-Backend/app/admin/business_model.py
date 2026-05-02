

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from datetime import datetime
from app.core.database import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)

    # 🔥 link to user (IMPORTANT)
    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String, nullable=False)
    description = Column(Text)
    language = Column(String, default="EN")

    is_active = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)


class KnowledgeBase(Base):
    __tablename__ = "knowledge_base"

    id = Column(Integer, primary_key=True, index=True)

    business_id = Column(Integer, ForeignKey("businesses.id"))

    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)