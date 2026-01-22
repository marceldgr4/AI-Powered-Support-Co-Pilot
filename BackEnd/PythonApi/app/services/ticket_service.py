from langchain.output_parsers import PydanticOutputParser
from app.SupaBase.supabase import get_ticket, update_ticket
from app.ai.llm import llm
from app.ai.prompts import ANALYSIS_PROMPT
from app.models.ticket import TicketAnalysis
import logging

logger = logging.getLogger(__name__)

parser = PydanticOutputParser(pydantic_object=TicketAnalysis)
chain = ANALYSIS_PROMPT | llm | parser

def process_ticket(ticket_id: str, description: str) -> TicketAnalysis:
   
    """
    Procesa un ticket usando IA para clasificarlo y analizar su sentimiento.
    
    Args:
        ticket_id: UUID del ticket
        description: Descripción del ticket
        
    Returns:
        TicketAnalysis con categoría, sentimiento y reasoning
    """
    logger.info(f"Procesando ticket {ticket_id}")
    
    # Verificar que el ticket existe
    ticket = get_ticket(ticket_id)

    if not ticket.data:
        logger.error(f"Ticket {ticket_id} no encontrado")
        raise ValueError(f"Ticket {ticket_id} no encontrado")

    logger.info(f"Analizando ticket {ticket_id} con LLM...")
    analysis = chain.invoke({
        "ticket_text": description,
        "format_instructions": parser.get_format_instructions()
    })

    logger.info(f"Análisis completado: {analysis.category} - {analysis.sentiment}")

    update_ticket(ticket_id, {
        "category": analysis.category,
        "sentiment": analysis.sentiment,
        "processed": True
    })

    logger.info(f"Ticket {ticket_id} actualizado en la base de datos.")
    return analysis
