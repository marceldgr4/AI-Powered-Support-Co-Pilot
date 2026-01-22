from pydantic import BaseModel, Field
from typing import Optional

class TicketRequest(BaseModel):
    ticket_id: str
    description: str

class TicketAnalysis(BaseModel):
    category: str
    sentiment: str
    reasoning: Optional[str] = None

class TicketResponse(BaseModel):
    success: bool
    ticket_id: str
    category: str
    sentiment: str
    message: str
