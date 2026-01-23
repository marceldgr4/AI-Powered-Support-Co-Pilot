from langchain_core.output_parsers import StrOutputParser
from app.models.ticket import TicketAnalysis

def get_ticket_analysis_parser() -> PydanticOutputParser:
    """
    Retorna el parser encargado de convertir la salida del LLM
    en un objeto TicketAnalysis validado.
    """
    return PydanticOutputParser(
        pydantic_object=TicketAnalysis
    )
