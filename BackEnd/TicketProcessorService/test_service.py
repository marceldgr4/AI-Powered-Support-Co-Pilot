import requests
import json
import sys

def test_process_ticket(ticket_id: str, description: str):
    url = "http://localhost:8000/process-ticket"
    payload = {
        "ticket_id": ticket_id,
        "description": description
    }
    
    print(f"Sending request to {url}...")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        
        print("\nResponse Status Code:", response.status_code)
        print("Response JSON:")
        print(json.dumps(response.json(), indent=2))
        
    except requests.exceptions.RequestException as e:
        print(f"\nError: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print("Response text:", e.response.text)

if __name__ == "__main__":
    # You can pass arguments or use defaults
    # For testing, we might need a valid ticket ID from Supabase if we want the update to strictly succeed,
    # but for analyzing logic, any ID works if we don't strict-check the update result in the script (which we don't, we just log warning on backend)
    
    # Using a dummy UUID for safety if we don't know one exists
    t_id = "00000000-0000-0000-0000-000000000000" 
    desc = "My internet connection is very slow and keeps dropping every 5 minutes."
    
    if len(sys.argv) > 1:
        t_id = sys.argv[1]
    if len(sys.argv) > 2:
        desc = sys.argv[2]
        
    test_process_ticket(t_id, desc)
