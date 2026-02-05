from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title=os.getenv("APP_NAME"))

@app.get("/")
def root():
    return {"status": "Backend running successfully"}
