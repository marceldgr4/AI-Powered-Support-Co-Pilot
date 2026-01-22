from fastapi import APIRouter, HTTPException
from app.models.ticket import TicketRequest, TicketResponse
from app.services.ticket_service import process_ticket
import logging
logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/process-ticket", response_model=TicketResponse)
async def process_ticket_endpoint(request: TicketRequest):

    """Endpoint para procesar un ticket con IA.
    
    Args:
        request: TicketRequest con ticket_id y description
        
    Returns:
        TicketResponse con el resultado del procesamiento
    """

    try:

        logger.info(f"Processing ticket ID: {request.ticket_id}")

        analysis = process_ticket(
            request.ticket_id,
            request.description
        )

        return TicketResponse(
            success=True,
            ticket_id=request.ticket_id,
            category=analysis.category,
            sentiment=analysis.sentiment,
            message="Ticket procesado correctamente"
        )

    except ValueError as e:
        logger.error(f"Error processing ticket ID {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error processing ticket ID {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, 
                            detail=f"Error interno del servidor: {str(e)}"
                            )
