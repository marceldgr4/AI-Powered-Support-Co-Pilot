import requests
import json
import sys

def test_process_ticket(ticket_id: str, description: str):
    url = "http://localhost:8000/process-ticket"
    payload = {
        "ticket_id": ticket_id,
        "description": description
    }
    
    print("-" * 50)
    print(f"🚀 Sending request to: {url}")
    print(f"📦 Payload: {json.dumps(payload, indent=2)}")
    print("-" * 50)
    
    try:
        response = requests.post(url, json=payload)
        
        print(f"\n✅ Response Status Code: {response.status_code}")
        
        try:
            result = response.json()
            print("📄 Response JSON:")
            print(json.dumps(result, indent=2))
        except ValueError:
            print("📄 Response is not JSON:")
            print(response.text)
            
        if not response.ok:
            print("\n⚠️  Note: If you get a 401, check your OPENAI_API_KEY in .env")
            print("⚠️  Note: If you get a 404, the ticket ID might not exist in Supabase.")
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the server. Is it running on http://localhost:8000?")
    except Exception as e:
        print(f"\n❌ Unexpected Error: {e}")

if __name__ == "__main__":
    # Default values for testing
    t_id = "00000000-0000-0000-0000-000000000000" 
    desc = "Mi conexión a internet está muy lenta y se desconecta cada 5 minutos."
    
    if len(sys.argv) > 1:
        t_id = sys.argv[1]
    if len(sys.argv) > 2:
        desc = sys.argv[2]
        
    print("\nStarting Ticket Processor Test...")
    print(f"Using Ticket ID: {t_id}")
    print(f"Using Description: {desc}\n")
    
    test_process_ticket(t_id, desc)
