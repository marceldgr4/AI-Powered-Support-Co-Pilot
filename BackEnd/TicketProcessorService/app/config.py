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

def validate_config():
    """Validates that necessary environment variables are set."""
    if not SUPABASE_URL:
        logger.error("SUPABASE_URL not found in environment variables.")
        raise RuntimeError("SUPABASE_URL missing.")
    
    if not SUPABASE_KEY:
        logger.error("SUPABASE_KEY (or SUPABASE_SERVICE_KEY) not found in environment variables.")
        raise RuntimeError("Supabase credentials missing.")

    if not OPENAI_API_KEY:
        logger.error("OPENAI_API_KEY not found in environment variables.")
        raise RuntimeError("OPENAI_API_KEY missing.")
    
    # Debug logging for production (masked)
    logger.info(f"Configuration loaded. OpenAI Key starts with: {OPENAI_API_KEY[:8]}...")
    logger.info(f"Supabase URL: {SUPABASE_URL}")

# Perform validation on import
validate_config()
