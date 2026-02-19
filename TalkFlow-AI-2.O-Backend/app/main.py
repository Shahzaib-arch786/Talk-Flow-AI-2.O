from fastapi import FastAPI, Depends
from app.core.database import engine, Base, test_connection
from app.auth import models  # Ensures models are registered
from app.auth.routes import router as auth_router
from app.auth.dependencies import get_current_user
from fastapi.middleware.cors import CORSMiddleware
# from app.admin.routes import router as admin_router




app = FastAPI(
    title="TalkFlow AI Backend",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
# app.include_router(admin_router, prefix="/admin", tags=["Admin"], dependencies=[Depends(get_current_user)])

# Root route
@app.get("/")
def root():
    return {"message": "TalkFlow AI Backend is running"}

# Database test route
@app.get("/db-test")
def db_test():
    return {"database_status": test_connection()}
