from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.tickets import router as ticket_router
from app.core.logging import setup_logging

setup_logging()

app = FastAPI(
    title="AI Support Co-Pilot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ticket_router, prefix="/tickets")

@app.get("/")
def root():
    return {"status": "online"}
