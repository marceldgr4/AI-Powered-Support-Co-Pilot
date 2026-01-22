import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not all([SUPABASE_URL, SUPABASE_KEY, OPENAI_API_KEY]):
    mising =[]
    if not SUPABASE_URL:
        mising.append("SUPABASE_URL")
    if not SUPABASE_KEY:
        mising.append("SUPABASE_SERVICE_KEY")
    if not OPENAI_API_KEY:
        mising.append("OPENAI_API_KEY")

    raise RuntimeError ( f"Faltan variables de entorno requeridas: {', '.join(mising)}\n"
                       f"Por favor, asegúrate de que el archivo .env contiene todas las variables necesarias. "
                       )

