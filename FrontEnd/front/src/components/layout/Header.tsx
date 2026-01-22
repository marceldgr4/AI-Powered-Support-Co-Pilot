interface Header {
  onNewTicket: () => void
}

export function Header({ onNewTicket }: Header) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl"></span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Support Co-Pilot
              </h1>
              <p className="text-slate-600 mt-1">
                Dashboard de tickets en tiempo real
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onNewTicket}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">+</span>
                Nuevo Ticket
              </span>
            </button>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-300 rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">
                Realtime Activo
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}