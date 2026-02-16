from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str | None = None
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
