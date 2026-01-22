import type { Ticket } from '../../types/tickets'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale/'

interface TicketListProps {
  tickets: Ticket[]
  loading: boolean
}

export function TicketList({ tickets, loading }: TicketListProps) {
  
  const getSentimentIcon = (sentiment: string | null) => {
    if (!sentiment) return ;
    switch (sentiment) {
      case 'Positivo': return '✓'
      case 'Neutral': return '○'
      case 'Negativo': return '✕'
      default: return '?'
    }
  }

  const getSentimentColor = (sentiment: string | null) => {
    if (!sentiment) return 'bg-amber-100 text-amber-800 border-amber-200';
    switch (sentiment) {
      case 'Positivo': return 'bg-green-100 text-green-800 border-green-200'
      case 'Neutral': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Negativo': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-amber-100 text-amber-800 border-amber-200'
    }
  }

  const getCategoryColor = (category: string | null) => {
    if (!category) return 'bg-gray-100 text-gray-800 border-gray-200';
    switch (category) {
      case 'Técnico': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Facturación': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Comercial': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-slate-300 border-t-slate-900 rounded-full mx-auto"></div>
        <p className="text-slate-600 mt-4">Cargando tickets...</p>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 text-center">
        <p className="text-slate-600">No hay tickets para mostrar</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all hover:shadow-md ${
            ticket.sentiment === 'Negativo'
              ? 'border-red-300 bg-red-50/30'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">
                  {getSentimentIcon(ticket.sentiment)}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDistanceToNow(new Date(ticket.created_at), {
                    addSuffix: true,
                    locale: es
                  })}
                </span>
                {!ticket.processed && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                    Procesando...
                  </span>
                )}
              </div>
              
              {/* Descripción */}
              <p className="text-slate-900 mb-4 leading-relaxed">
                {ticket.description}
              </p>

              {/* Badges */}
              <div className="flex items-center gap-2">
                {ticket.category && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(ticket.category)}`}>
                    {ticket.category}
                  </span>
                )}
                {ticket.sentiment && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${getSentimentColor(ticket.sentiment)}`}>
                    {ticket.sentiment}
                  </span>
                )}
              </div>
            </div>

            {/* ID */}
            <div className="text-right">
              <p className="text-xs text-slate-400 font-mono">
                {ticket.id.slice(0, 8)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}