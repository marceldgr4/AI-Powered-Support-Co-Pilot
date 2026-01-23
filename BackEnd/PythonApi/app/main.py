import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.tickets import router as ticket_router
from app.core.logging import setup_logging
import logging

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Support Co-Pilot API",
    description="Microservicio de procesamiento de tickets con IA",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-powered-support-co-pilot.vercel.app"  
    ],
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ticket_router, tags=["tickets"])

@app.get("/")
async def root():
    """Endpoint de salud para verificar que el servicio está en línea."""
    return {"status": "online",
            "service": "AI Support Co-Pilot API",
            "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Verificar el estado del servicio."""
    try: 
        from app.SupaBase.supabase import supabase
        supabase.table("tickets").select("id").limit(1).execute()

        return {
            "status": "healthy",
            "database": "connected",
            "ai_model": "ready"
            }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e)
            }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
