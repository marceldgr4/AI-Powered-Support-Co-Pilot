import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client
from groq import Groq

# Load env from root
load_dotenv(dotenv_path=".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def check_supabase():
    print("Testing Supabase connection...", end=" ")
    try:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Missing Supabase credentials")
        
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        supabase.table("tickets").select("*").limit(1).execute()
        print("OK")
        return True
    except Exception as e:
        print(f"Failed: {e}")
        return False

def check_groq():
    print("Testing Groq connection...", end=" ")
    try:
        if not GROQ_API_KEY:
            raise ValueError("Missing Groq API Key")
        
        client = Groq(api_key=GROQ_API_KEY)
        client.models.list()
        print("OK")
        return True
    except Exception as e:
        print(f"Failed: {e}")
        return False

if __name__ == "__main__":
    print(f"Loading env from {os.path.abspath('.env')}")
    sb_ok = check_supabase()
    gr_ok = check_groq()
    
    if sb_ok and gr_ok:
        sys.exit(0)
    else:
        sys.exit(1)
