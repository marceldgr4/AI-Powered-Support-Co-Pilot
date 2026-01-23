import { useState } from "react";
import { useTickets } from "../hooks/useTickets";
import { useUserRealtimeTickets } from "../hooks/userRealtimeTickets";
import { Header } from "../components/layout/Header";
import { StatsGrid } from "../components/stats/StatsCards";
import { TicketList } from "../components/tickets/TicketList";

export default function Dashboard() {
    const { tickets, loading, stats, setTickets } = useTickets();
    const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
    
    useUserRealtimeTickets(setTickets)

    const filteredTickets = selectedSentiment 
        ? tickets.filter(t => t.sentiment === selectedSentiment)
        : tickets;

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="max-w-7xl mx-auto p-6">   
                <StatsGrid 
                    stats={stats} 
                    selectedSentiment={selectedSentiment}
                    onSelectSentiment={setSelectedSentiment}
                />
                <TicketList tickets={filteredTickets} loading={loading} />
            </main>
        </div>
    )
}