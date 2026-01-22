import { useState } from 'react'
import { Header } from './components/layout/Header'
import { StatsGrid } from './components/stats/StatsCards'
import { TicketFilters } from './components/filters/TicketFilters'
import { TicketList } from './components/tickets/TicketList'
import { NewTicketModal } from './components/modals/NewTicketModal'
import { Notification } from './components/ui/Notification'
import { useTickets } from './hooks/useTickets'
import { useNotification } from './hooks/useNotifications'

type FilterType = 'all' | 'processed' | 'pending'

function App() {
  const { tickets, stats, loading, reload } = useTickets()
  
  const { notification, showNotification, hideNotification } = useNotification()
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Filtrado en cliente (los datos ya vienen de Supabase)
  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'processed' && !ticket.processed) return false
    if (filter === 'pending' && ticket.processed) return false
    if (selectedSentiment && ticket.sentiment !== selectedSentiment) return false
    if (searchTerm && !ticket.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const handleCreateTicket = async (description: string) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })
      if (!response.ok) throw new Error('Failed to create ticket')
      await reload()
      setShowNewTicketModal(false)
      showNotification('Ticket creado exitosamente. Procesando con IA...', 'success')
    } catch (error) {
      showNotification('Error al crear el ticket', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}

      <Header 
        onNewTicket={() => setShowNewTicketModal(true)}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

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
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TicketList 
          tickets={filteredTickets} 
          loading={loading} 
        />
      </main>

      {showNewTicketModal && (
        <NewTicketModal
          onClose={() => setShowNewTicketModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}
    </div>
  )
}

export default App