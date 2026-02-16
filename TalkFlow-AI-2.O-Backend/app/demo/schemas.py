from pydantic import BaseModel


class DemoUserCreate(BaseModel):
    full_name: str
    email: str


class DemoUserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    session_id: str

    class Config:
        from_attributes = True
