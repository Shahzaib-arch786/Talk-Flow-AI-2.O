from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    chunk_text = Column(Text)
    embedding = Column(Text)   # store as JSON string
    created_at = Column(DateTime, default=datetime.utcnow)