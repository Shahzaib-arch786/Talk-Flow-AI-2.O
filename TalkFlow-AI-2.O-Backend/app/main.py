from fastapi import FastAPI
from dotenv import load_dotenv
import os

from app.core.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from app.demo import models  
from app.demo.routes import router as demo_router

load_dotenv()


app = FastAPI(title=os.getenv("APP_NAME"))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"status": "Backend running successfully"}


app.include_router(demo_router)
