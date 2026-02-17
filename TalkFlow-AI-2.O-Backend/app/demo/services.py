import uuid
import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .models import DemoUser


def create_demo_user(db: Session, full_name: str, email: str):

    existing_user = db.query(DemoUser).filter(DemoUser.email == email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="This email has already started a demo."
        )

    session_id = str(uuid.uuid4())

    
    demo_duration = int(os.getenv("DEMO_DURATION_MINUTES", 5))

    expires_at = datetime.utcnow() + timedelta(minutes=demo_duration)

    demo_user = DemoUser(
        full_name=full_name,
        email=email,
        session_id=session_id,
        expires_at=expires_at
    )

    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    return demo_user
