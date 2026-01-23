import logging
import json
from openai import AuthenticationError, OpenAIError
from supabase import create_client, Client
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from app.config import SUPABASE_URL, SUPABASE_KEY, OPENAI_API_KEY
from app.models import TicketAnalysis

logger = logging.getLogger(__name__)

# Initialize clients
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {e}")
    raise

# Setup LangChain
try:
    parser = PydanticOutputParser(pydantic_object=TicketAnalysis)
    
    prompt = PromptTemplate(
        template="""You are an expert customer support ticket analyzer.
Analyze the following support ticket description and determine its category and sentiment.
Provide a brief explanation for your choice in the 'reasoning' field.

Ticket Description:
{description}

{format_instructions}

Return only the valid JSON.
""",
        input_variables=["description"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo", openai_api_key=OPENAI_API_KEY)
    chain = prompt | llm | parser

except Exception as e:
    logger.error(f"Failed to initialize LangChain: {e}")
    raise

async def analyze_ticket_logic(description: str) -> TicketAnalysis:
    """Analyzes the ticket description using LLM."""
    try:
        logger.info("Calling LLM for analysis...")
        return chain.invoke({"description": description})
    except AuthenticationError as auth_err:
        logger.error(f"OpenAI Authentication Error: {auth_err}")
        raise ValueError("Invalid OpenAI API Key. Please check configuration.") from auth_err
    except OpenAIError as openai_err:
        logger.error(f"OpenAI API Error: {openai_err}")
        raise RuntimeError(f"OpenAI API Error: {openai_err}") from openai_err
    except Exception as e:
        logger.error(f"Unexpected error during analysis: {e}")
        raise RuntimeError(f"Analysis failed: {e}") from e

async def update_ticket_record(ticket_id: str, analysis: TicketAnalysis):
    """Updates the ticket record in Supabase."""
    try:
        logger.info(f"Updating ticket {ticket_id} in Supabase...")
        update_data = {
            "category": analysis.category.value,
            "sentiment": analysis.sentiment.value,
            "processed": True
        }
        
        response = supabase.table("tickets").update(update_data).eq("id", ticket_id).execute()
        
        # Check for empty data which might indicate ID not found (policy dependent)
        if hasattr(response, 'data') and not response.data:
            logger.warning(f"Ticket {ticket_id} update returned no data. Ticket might not exist.")
            
    except Exception as e:
        logger.error(f"Failed to update Supabase for ticket {ticket_id}: {e}")
        raise RuntimeError(f"Database update failed: {e}") from e

async def process_ticket_service(ticket_id: str, description: str) -> TicketAnalysis:
    """Orchestrates the ticket processing flow."""
    # 1. Analyze
    analysis = await analyze_ticket_logic(description)
    
    # 2. Update DB
    await update_ticket_record(ticket_id, analysis)
    
    return analysis
