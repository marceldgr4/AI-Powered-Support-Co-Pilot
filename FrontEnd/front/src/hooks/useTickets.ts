import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import type { Ticket, Stats } from "../type/tickes";

export const useTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState<Stats>({
        total: 0,
        process: 0,
        pending: 0,
        posetivo: 0,
        neutral: 0,
        negativo: 0
    })
    
    const loadTickets = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('tickets')
            .select('*')
            .order('created_at', { ascending: false });
        
        setTickets(data ?? [])
        setLoading(false)
    }

    useEffect(() => {
        loadTickets();
    }, [])

    useEffect(() => {
        setStats({
            total: tickets.length,
            process: tickets.filter(t => t.processed).length,
            pending: tickets.filter(t => !t.processed).length,
            posetivo: tickets.filter(t => t.sentiment === 'positive').length,
            neutral: tickets.filter(t => t.sentiment === 'neutral').length,
            negativo: tickets.filter(t => t.sentiment === 'negative').length,
        })
    }, [tickets])

    return {
        tickets,
        loading,
        stats,
        reload: loadTickets
    }
}