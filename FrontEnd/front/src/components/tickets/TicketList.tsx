import type { Ticket } from '../../type/tickes'

interface TicketListProps {
  tickets: Ticket[]
  loading: boolean
}

export function TicketList({ tickets, loading }: TicketListProps) {
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
            ticket.sentiment === 'negative'
              ? 'border-red-300 bg-red-50/30'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-3 h-3 rounded-full ${
                  ticket.sentiment === 'positive' ? 'bg-green-500' :
                  ticket.sentiment === 'neutral' ? 'bg-blue-500' :
                  'bg-red-500'
                }`}></span>
                <h3 className="font-semibold text-slate-900">{ticket.title}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-2">{ticket.description}</p>
              <div className="flex gap-2 text-xs">
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">
                  {ticket.sentiment}
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {ticket.status}
                </span>
                <span className={`px-2 py-1 rounded ${
                  ticket.processed 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {ticket.processed ? 'Procesado' : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
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
                    {getCategoryIcon(ticket.category)}
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