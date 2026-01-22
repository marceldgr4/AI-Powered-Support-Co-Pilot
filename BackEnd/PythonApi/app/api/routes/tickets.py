from fastapi import APIRouter, HTTPException
from app.models.ticket import TicketRequest, TicketResponse
from app.services.ticket_service import process_ticket

router = APIRouter()

@router.post("/process", response_model=TicketResponse)
def process_ticket_endpoint(request: TicketRequest):
    try:
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
        raise HTTPException(status_code=404, detail=str(e))
