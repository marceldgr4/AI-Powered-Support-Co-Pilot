type FilterType = 'all' | 'processed' | 'pending'

interface TicketFiltersProps {
  filter: FilterType
  setFilter: (filter: FilterType) => void
  selectedSentiment: string | null
  onClearSentiment: () => void
}

export function TicketFilters({ filter, setFilter, selectedSentiment, onClearSentiment }: TicketFiltersProps) {
  
  const FilterButton = ({ value, label, activeColor }: { value: FilterType, label: string, activeColor: string }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        filter === value
          ? `${activeColor} text-white`
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-slate-700">Filtrar:</span>
        <FilterButton value="all" label="Todos" activeColor="bg-slate-900" />
        <FilterButton value="processed" label="Procesados" activeColor="bg-blue-600" />
        <FilterButton value="pending" label="Pendientes" activeColor="bg-amber-600" />
        
        {selectedSentiment && (
          <button
            onClick={onClearSentiment}
            className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
          >
            Limpiar filtro de sentimiento ({selectedSentiment})
          </button>
        )}
      </div>
    </div>
  )
}