from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base
from datetime import datetime

class DemoUser(Base):
    __tablename__ = "demo_users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    session_id = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)
