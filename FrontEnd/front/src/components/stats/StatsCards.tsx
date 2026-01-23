import type { Stats } from '../../types/tickets';

interface StatsGrid {
  stats: Stats
  selectedSentiment: string | null
  onSelectSentiment: (sentiment: string | null) => void
}

export function StatsGrid({ stats, selectedSentiment, onSelectSentiment }: StatsGrid) {
  const StatCard = ({ 
    title, 
    value, 
    gradient,
    sentimentValue,
    icon
  }: { 
    title: string
    value: number
    gradient: string
    sentimentValue: string | null
    icon: string
  }) => {
    const isActive = selectedSentiment === sentimentValue;
    
    return (
      <button
        onClick={() => onSelectSentiment(isActive ? null : sentimentValue)}
        className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 cursor-pointer ${
          isActive 
            ? `bg-gradient-to-br ${gradient} text-white shadow-xl scale-105` 
            : 'bg-white/80 backdrop-blur-sm text-slate-900 shadow-md border-2 border-white hover:shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <p className={`text-sm font-medium ${isActive ? 'opacity-90' : 'text-slate-600'}`}>
            {title}
          </p>
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-4xl font-bold mt-2">{value}</p>
        {isActive && (
          <div className="mt-2 text-xs opacity-75">
            Click para quitar filtro
          </div>
        )}
      </button>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <StatCard 
        title="Total" 
        value={stats.total} 
        gradient="from-slate-600 to-slate-800"
        sentimentValue={null}
        icon=""
      />
      <StatCard 
        title="Procesados" 
        value={stats.processed} 
        gradient="from-blue-500 to-blue-700"
        sentimentValue="processed"
        icon=""
      />
      <StatCard 
        title="Pendientes" 
        value={stats.pending} 
        gradient="from-amber-500 to-amber-700"
        sentimentValue="pending"
        icon=""
      />
      <StatCard 
        title="Positivos" 
        value={stats.positivo} 
        gradient="from-green-500 to-green-700"
        sentimentValue="Positivo"
        icon=""
      />
      <StatCard 
        title="Neutrales" 
        value={stats.neutral} 
        gradient="from-gray-500 to-gray-700"
        sentimentValue="Neutral"
        icon=""
      />
      <StatCard 
        title="Negativos" 
        value={stats.negativo} 
        gradient="from-red-500 to-red-700"
        sentimentValue="Negativo"
        icon=""
      />
    </div>
  )
}