from supabase import create_client, Client
from app.core.config import SUPABASE_URL, SUPABASE_KEY

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_ticket(ticket_id: str):
    return supabase.table("tickets").select("*").eq("id", ticket_id).execute()

def update_ticket(ticket_id: str, data: dict):
    return supabase.table("tickets").update(data).eq("id", ticket_id).execute()

def get_unprocessed_tickets():
    return supabase.table("tickets").select("*").eq("processed", False).execute()
