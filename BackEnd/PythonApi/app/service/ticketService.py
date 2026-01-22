from app.db.supabase import get_ticket, update_ticket
from app.ai.llm import llm
from app.ai.prompts import ANALYSIS_PROMPT
from app.models.ticket import TicketAnalysis
from langchain.output_parsers import PydanticOutputParser

parser = PydanticOutputParser(pydantic_object=TicketAnalysis)
chain = ANALYSIS_PROMPT | llm | parser

def process_ticket(ticket_id: str, description: str) -> TicketAnalysis:
    ticket = get_ticket(ticket_id)

    if not ticket.data:
        raise ValueError("Ticket no encontrado")

    analysis = chain.invoke({
        "ticket_text": description,
        "format_instructions": parser.get_format_instructions()
    })

    update_ticket(ticket_id, {
        "category": analysis.category,
        "sentiment": analysis.sentiment,
        "processed": True
    })

    return analysis
