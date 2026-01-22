import type { Ticket } from '../../types/tickets'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale/es'

interface TicketListProps {
  tickets: Ticket[]
  loading: boolean
}

export function TicketList({ tickets, loading }: TicketListProps) {
  
  const getSentimentIcon = (sentiment: string | null) => {
    if (!sentiment) return '';
    switch (sentiment) {
      case 'Positivo': return ''
      case 'Neutral': return ''
      case 'Negativo': return ''
      default: return ''
    }
  }

  const getSentimentColor = (sentiment: string | null) => {
    if (!sentiment) return 'bg-amber-100 text-amber-800 border-amber-300';
    switch (sentiment) {
      case 'Positivo': return 'bg-green-100 text-green-800 border-green-300'
      case 'Neutral': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'Negativo': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-amber-100 text-amber-800 border-amber-300'
    }
  }

  const getCategoryColor = (category: string | null) => {
    if (!category) return 'bg-gray-100 text-gray-800 border-gray-300';
    switch (category) {
      case 'Técnico': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Facturación': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Comercial': return 'bg-indigo-100 text-indigo-800 border-indigo-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getCategoryIcon = (category: string | null) => {
    if (!category) return '';
    switch (category) {
      case 'Técnico': return ''
      case 'Facturación': return ''
      case 'Comercial': return ''
      default: return ''
    }
  }

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-md border-2 border-white text-center">
        <div className="animate-spin w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full mx-auto"></div>
        <p className="text-slate-600 mt-4 font-medium">Cargando tickets...</p>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-md border-2 border-white text-center">
        <div className="text-6xl mb-4"></div>
        <p className="text-slate-600 text-lg font-medium">No hay tickets que coincidan con los filtros</p>
        <p className="text-slate-500 text-sm mt-2">Intenta ajustar tus filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 transition-all hover:shadow-xl transform hover:scale-[1.02] ${
            ticket.sentiment === 'Negativo'
              ? 'border-red-300 bg-gradient-to-r from-red-50/50 to-white'
              : 'border-white'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Header con información del ticket */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-3xl">
                  {getSentimentIcon(ticket.sentiment)}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {formatDistanceToNow(new Date(ticket.created_at), {
                    addSuffix: true,
                    locale: es
                  })}
                </span>
                {!ticket.processed && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border-2 border-amber-300 animate-pulse">
                    ⚡ Procesando...
                  </span>
                )}
                {ticket.sentiment === 'Negativo' && ticket.processed && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full border-2 border-red-300">
                     Requiere Atención
                  </span>
                )}
              </div>
              
              {/* Descripción del ticket */}
              <p className="text-slate-900 text-lg mb-4 leading-relaxed">
                {ticket.description}
              </p>

              {/* Badges de categoría y sentimiento */}
              <div className="flex items-center gap-3 flex-wrap">
                {ticket.category && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 ${getCategoryColor(ticket.category)}`}>
                    {getCategoryIcon(ticket.category)} {ticket.category}
                  </span>
                )}
                {ticket.sentiment && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 ${getSentimentColor(ticket.sentiment)}`}>
                    {getSentimentIcon(ticket.sentiment)} {ticket.sentiment}
                  </span>
                )}
              </div>
            </div>

            {/* ID del ticket */}
            <div className="text-right">
              <p className="text-xs text-slate-400 font-mono bg-slate-100 px-3 py-1 rounded-lg">
                ID: {ticket.id.slice(0, 8)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}