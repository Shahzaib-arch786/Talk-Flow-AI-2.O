import uuid
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .models import DemoUser


def create_demo_user(db: Session, full_name: str, email: str):

    # 🔍 Check if email already exists
    existing_user = db.query(DemoUser).filter(DemoUser.email == email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="This email has already started a demo."
        )

    session_id = str(uuid.uuid4())

    demo_user = DemoUser(
        full_name=full_name,
        email=email,
        session_id=session_id
    )

    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    return demo_user
