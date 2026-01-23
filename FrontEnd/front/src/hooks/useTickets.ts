import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import type { Ticket, Stats } from "../types/tickets";
import type { RealtimeChannel } from "@supabase/supabase-js";

export const useTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<Stats>({
        total: 0,
        processed: 0,
        pending: 0,
        positivo: 0,
        neutral : 0,
        negativo: 0
    })
    
    const loadTickets = async () => {
       try{ 
        setLoading(true)
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .order('created_at', { ascending: false });

            if(error) throw error;
        
        setTickets(data ?? [])
       }catch(error){
        console.error("Error loading tickets:", error);
       }finally{
       
        setLoading(false)
    }
}


    useEffect(() => {
        loadTickets();
    }, [])

    useEffect(() => {
        const channel: RealtimeChannel = supabase
            .channel('tickets-channel')
            .on(
                'postgres_changes',
                { 
                    event: '*', 
                    schema: 'public',
                    table: 'tickets' },
                (payload) => {
                    console.log('Change received!', payload);
                    if (payload.eventType === 'INSERT') {
                        setTickets((prevTickets) => [payload.new as Ticket, ...prevTickets]);
                    } else if (payload.eventType === 'UPDATE') {
                        setTickets((prevTickets) =>
                            prevTickets.map((ticket) =>
                                ticket.id === (payload.new as Ticket).id ? (payload.new as Ticket) : ticket
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setTickets((prevTickets) =>
                            prevTickets.filter((ticket) => ticket.id !== (payload.old as Ticket).id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);



    useEffect(() => {
        const newStats: Stats = {
            total: tickets.length,
            processed: tickets.filter(t => t.processed).length,
            pending: tickets.filter(t => !t.processed).length,
            positivo: tickets.filter(t => t.sentiment === 'Positivo').length,
            neutral: tickets.filter(t => t.sentiment === 'Neutral').length,
            negativo: tickets.filter(t => t.sentiment === 'Negativo').length,
        }
        setStats(newStats)
    }, [tickets])

    return {
        tickets,
        loading,
        stats,
        reload: loadTickets
    }
}