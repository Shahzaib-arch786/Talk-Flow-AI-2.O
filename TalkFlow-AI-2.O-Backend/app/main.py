import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base, test_connection
from app.auth import models  # Ensures models are registered
from app.auth.routes import router as auth_router
from app.auth.dependencies import get_current_user
from app.demo import models as demo_models
from app.demo.routes import router as demo_router

load_dotenv()

app = FastAPI(
    title=os.getenv("APP_NAME", "TalkFlow AI Backend"),
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(demo_router)
# app.include_router(admin_router, prefix="/admin", tags=["Admin"], dependencies=[Depends(get_current_user)])

# Root route
@app.get("/")
def root():
    return {"message": "TalkFlow AI Backend is running"}

# Database test route
@app.get("/db-test")
def db_test():
    return {"database_status": test_connection()}
