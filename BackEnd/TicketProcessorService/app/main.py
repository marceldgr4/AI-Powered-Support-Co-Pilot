from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.models import TicketRequest, TicketAnalysis
from app.services import process_ticket_service
import logging

# Configure logging (redundant if config imported, but safe for app entry)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Ticket Processor Microservice", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-powered-support-co-pilot.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-ticket", response_model=TicketAnalysis, status_code=status.HTTP_200_OK)
async def process_ticket(request: TicketRequest):
    """
    Analyzes a ticket description to determine category and sentiment,
    and updates the ticket in Supabase.
    """
    logger.info(f"Received processing request for ticket: {request.ticket_id}")

    try:
        return await process_ticket_service(request.ticket_id, request.description)

    except ValueError as ve:
        # Handle known validation/auth errors (e.g., bad API Key)
        logger.error(f"Validation/Auth Error: {ve}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(ve))
    except RuntimeError as re:
        # Handle internal runtime errors
        logger.error(f"Runtime Error: {re}")
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(re))
    except Exception as e:
        # Catch-all
        logger.error(f"Unhandled Error: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")

@app.get("/health")
def health_check():
    return {"status": "ok"}
