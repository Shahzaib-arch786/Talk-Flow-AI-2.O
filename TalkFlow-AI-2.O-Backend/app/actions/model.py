from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.core.database import Base


# Actions created by admin
class BusinessAction(Base):
    __tablename__ = "business_actions"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True)
    name = Column(String)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


# Requests created by AI/customers
class ActionRequest(Base):
    __tablename__ = "action_requests"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, index=True)

    action_name = Column(String)
    customer_query = Column(Text)

    status = Column(String, default="pending")

    created_at = Column(DateTime, default=datetime.utcnow)