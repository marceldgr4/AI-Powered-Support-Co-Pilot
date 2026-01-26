import os
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
# Handle potential naming mismatch and strip whitespace
SUPABASE_KEY = (os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_SERVICE_KEY") or "").strip()
OPENAI_API_KEY = (os.getenv("OPENAI_API_KEY") or "").strip()
GROQ_API_KEY = (os.getenv("GROQ_API_KEY") or "").strip()

def validate_config():
    """Validates that necessary environment variables are set."""
    if not SUPABASE_URL:
        logger.error("SUPABASE_URL not found in environment variables.")
        raise RuntimeError("SUPABASE_URL missing.")
    
    if not SUPABASE_KEY:
        logger.error("SUPABASE_KEY (or SUPABASE_SERVICE_KEY) not found in environment variables.")
        raise RuntimeError("Supabase credentials missing.")

    if not OPENAI_API_KEY and not GROQ_API_KEY:
        logger.warning("Neither OPENAI_API_KEY nor GROQ_API_KEY found. LLM services will fail.")
    
    # Debug logging for production (masked)
    if OPENAI_API_KEY:
        logger.info(f"OpenAI Key loaded: {OPENAI_API_KEY[:8]}...")
    if GROQ_API_KEY:
        logger.info(f"Groq Key loaded: {GROQ_API_KEY[:8]}...")
    
    logger.info(f"Supabase URL: {SUPABASE_URL}")

# Perform validation on import
validate_config()
