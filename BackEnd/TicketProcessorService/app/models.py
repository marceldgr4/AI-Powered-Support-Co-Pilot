from typing import Optional
from enum import Enum
from pydantic import BaseModel, Field

class TicketRequest(BaseModel):
    ticket_id: str = Field(..., description="The UUID of the ticket to process")
    description: str = Field(..., description="The content/description of the ticket")

class TicketCategory(str, Enum):
    TECHNICAL = "Técnico"
    BILLING = "Facturación"
    COMMERCIAL = "Comercial"
    FEATURE_REQUEST = "Solicitud de Funcionalidad"
    OTHER = "Otro"

class TicketSentiment(str, Enum):
    POSITIVE = "Positivo"
    NEUTRAL = "Neutral"
    NEGATIVE = "Negativo"

class TicketAnalysis(BaseModel):
    id: Optional[str] = Field(None, description="The UUID of the analyzed ticket")
    category: TicketCategory = Field(..., description="The classified category of the ticket")
    sentiment: TicketSentiment = Field(..., description="The analyzed sentiment of the ticket")
    reasoning: Optional[str] = Field(None, description="The explanation for the classification")
