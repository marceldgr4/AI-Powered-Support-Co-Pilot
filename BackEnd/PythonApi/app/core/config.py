import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, OPENAI_API_KEY]):
    missing =[]
    if not SUPABASE_URL:
        missing.append("SUPABASE_URL")
    if not SUPABASE_KEY:
        missing.append("SUPABASE_SERVICE_KEY")
    if not OPENAI_API_KEY:
        missing.append("OPENAI_API_KEY")

    raise RuntimeError ( f"Faltan variables de entorno requeridas: {', '.join(missing)}\n"
                       f"Por favor, asegúrate de que el archivo .env contiene todas las variables necesarias. "
                       )

