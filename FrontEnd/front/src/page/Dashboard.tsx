import { useTickets } from "../hooks/useTickets";
import { useUserRealtimeTickets } from "../hooks/userRealtimeTickets";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import TicketsTable from "../components/TicketsTable";

export default function Dashboard() {
    const { tickets, loading, stats, setTickets } = useTickets();
    useUserRealtimeTickets(setTickets)

    return (
        <>
        <header />
        < main className="max-w-7xl mx-auto p-6">   
        <StatsCard stats={stats} />
        <TicketsTable tickets={tickets} loading={loading} />
        </main>
        </>
    )
}