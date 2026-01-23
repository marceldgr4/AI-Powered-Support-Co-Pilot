import { useEffect } from "react";
import { supabase } from "../api/supabase";
import type { Ticket } from "../types/tickets";

export function useUserRealtimeTickets(setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>) {
    useEffect(() => {
        const channel = supabase
        .channel('ticket-changes')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'tickets' },
            payload => {
                setTickets(prev => {
                    if (payload.eventType === 'INSERT') {
                        return [payload.new as Ticket, ...prev];
                    }
                    if (payload.eventType === 'UPDATE') {
                        return prev.map(ticket =>
                            ticket.id === (payload.new as Ticket).id ? (payload.new as Ticket) : ticket
                        )
                    }
                    if (payload.eventType === 'DELETE') {
                        return prev.filter(ticket => ticket.id !== (payload.old as Ticket).id);
                    }
                    return prev;
                })
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
        },
     [setTickets])
    }
       
           