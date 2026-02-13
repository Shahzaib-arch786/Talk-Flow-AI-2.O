from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth.routes import router as auth_router
from app.core.database import Base, engine
from app.auth.models import User

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TalkFlow AI Backend")

# CORS for frontend
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(auth_router)
