import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client
from openai import OpenAI

# Load env from root (assuming running from project root)
load_dotenv(dotenv_path=".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def check_supabase():
    print("Testing Supabase connection...", end=" ")
    try:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Missing Supabase credentials")
        
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        # Try a simple query, assuming 'tickets' table exists or just check auth
        # We'll just check if client creation didn't crash and maybe list tables if possible, 
        # or just a simple select that might return empty
        supabase.table("tickets").select("*").limit(1).execute()
        print("OK")
        return True
    except Exception as e:
        print(f" Failed: {e}")
        return False

def check_openai():
    print("Testing OpenAI connection...", end=" ")
    try:
        if not OPENAI_API_KEY:
            raise ValueError("Missing OpenAI API Key")
        
        client = OpenAI(api_key=OPENAI_API_KEY)
        client.models.list()
        print("OK")
        return True
    except Exception as e:
        print(f" Failed: {e}")
        return False

if __name__ == "__main__":
    print(f"Loading env from {os.path.abspath('../../../.env')}")
    sb_ok = check_supabase()
    oa_ok = check_openai()
    
    if sb_ok and oa_ok:
        sys.exit(0)
    else:
        sys.exit(1)
