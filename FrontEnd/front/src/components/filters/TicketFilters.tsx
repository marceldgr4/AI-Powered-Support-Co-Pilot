type FilterType = 'all' | 'processed' | 'pending'

interface TicketFiltersProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  selectedSentiment: string | null
  onClearSentiment: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
}

export function TicketFilters({ 
  filter, 
  setFilter, 
  selectedSentiment, 
  onClearSentiment,
  searchTerm,
  onSearchChange
}: TicketFiltersProps) {
  
  const FilterButton = ({ value, label, color }: { value: FilterType, label: string, color: string }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
        filter === value
          ? `${color} text-white shadow-lg`
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border-2 border-white mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barra de búsqueda */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en tickets..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl"></span>
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Botones de filtro */}
        <div className="flex gap-2 flex-wrap">
          <FilterButton value="all" label="Todos" color="bg-slate-700" />
          <FilterButton value="processed" label="Procesados" color="bg-blue-600" />
          <FilterButton value="pending" label="Pendientes" color="bg-amber-600" />
          
          {selectedSentiment && (
            <button
              onClick={onClearSentiment}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-all flex items-center gap-2"
            >
              <span>✕</span>
              {selectedSentiment}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}