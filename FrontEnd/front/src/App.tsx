import { useState } from 'react'
import { Header } from './components/layout/Header'
import { StatsGrid } from './components/stats/StatsCards'
import { TicketFilters } from './components/filters/TicketFilters'
import { TicketList } from './components/tickets/TicketList'
import { useTickets } from './hooks/useTickets'

type FilterType = 'all' | 'processed' | 'pending'

function App() {
  const { tickets, stats, loading } = useTickets()
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null)

  // Lógica de filtrado en cliente
  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'processed' && !ticket.processed) return false
    if (filter === 'pending' && ticket.processed) return false
    if (selectedSentiment && ticket.sentiment !== selectedSentiment) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <StatsGrid 
          stats={stats} 
          selectedSentiment={selectedSentiment}
          onSelectSentiment={setSelectedSentiment}
        />

        <TicketFilters 
          filter={filter} 
          setFilter={setFilter} 
          selectedSentiment={selectedSentiment}
          onClearSentiment={() => setSelectedSentiment(null)}
        />

        <TicketList 
          tickets={filteredTickets} 
          loading={loading} 
        />
        
      </main>
    </div>
  )
}

export default App