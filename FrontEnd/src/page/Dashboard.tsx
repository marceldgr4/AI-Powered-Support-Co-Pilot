import { useState } from "react";
import { useTickets } from "../hooks/useTickets";
import { useUserRealtimeTickets } from "../hooks/userRealtimeTickets";
import { Header } from "../components/layout/Header";
import { StatsGrid } from "../components/stats/StatsCards";
import { TicketList } from "../components/tickets/TicketList";
import { NewTicketModal } from "../components/modals/NewTicketModal";

export default function Dashboard() {
    const { tickets, loading, stats, setTickets, createTicket } = useTickets();
    const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useUserRealtimeTickets(setTickets)

    const filteredTickets = selectedSentiment 
        ? tickets.filter(t => t.sentiment === selectedSentiment)
        : tickets;

    const handleCreateTicket = async (description: string) => {
        await createTicket(description);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header onNewTicket={() => setIsModalOpen(true)} />
            <main className="max-w-7xl mx-auto p-6">   
                <StatsGrid 
                    stats={stats} 
                    selectedSentiment={selectedSentiment}
                    onSelectSentiment={setSelectedSentiment}
                />
                <TicketList tickets={filteredTickets} loading={loading} />
            </main>

            {isModalOpen && (
                <NewTicketModal 
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateTicket}
                />
            )}
        </div>
    )
}