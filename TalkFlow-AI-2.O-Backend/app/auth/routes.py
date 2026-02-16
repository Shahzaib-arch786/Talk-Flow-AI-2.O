from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.schemas import UserCreate, UserLogin, TokenResponse
from app.auth.services import create_user, authenticate_user, generate_token
from app.core.database import get_db
from app.auth.models import User
from app.core.security import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", response_model=TokenResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = create_user(db, user.full_name, user.email, user.password)
    token = generate_token(new_user)

    return {"access_token": token}


@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = authenticate_user(db, user.email, user.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = generate_token(db_user)
    return {"access_token": token}


@router.get("/me")
def read_me(current_user: User = Depends(get_current_user)):
    return current_user
