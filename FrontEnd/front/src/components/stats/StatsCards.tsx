import type { Stats } from '../../type/tickes'

interface StatsGridProps {
  stats: Stats
  selectedSentiment: string | null
  onSelectSentiment: (sentiment: string | null) => void
}

export function StatsGrid({ stats, selectedSentiment, onSelectSentiment }: StatsGridProps) {
  const StatCard = ({ 
    title, 
    value, 
    color, 
    onClick, 
    isActive 
  }: { 
    title: string
    value: number
    color: string
    onClick: () => void
    isActive: boolean
  }) => (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl text-left transition-all transform hover:scale-105 cursor-pointer ${
        isActive 
          ? `${color} text-white shadow-lg` 
          : 'bg-white text-slate-900 shadow-sm border border-slate-200'
      }`}
    >
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className={`text-3xl font-bold mt-2`}>{value}</p>
    </button>
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <StatCard 
        title="Total" 
        value={stats.total} 
        color="bg-slate-900"
        onClick={() => onSelectSentiment(null)}
        isActive={selectedSentiment === null}
      />
      <StatCard 
        title="Procesados" 
        value={stats.process} 
        color="bg-green-500"
        onClick={() => onSelectSentiment('processed')}
        isActive={selectedSentiment === 'processed'}
      />
      <StatCard 
        title="Pendientes" 
        value={stats.pending} 
        color="bg-amber-500"
        onClick={() => onSelectSentiment('pending')}
        isActive={selectedSentiment === 'pending'}
      />
      <StatCard 
        title="Positivos" 
        value={stats.posetivo} 
        color="bg-emerald-500"
        onClick={() => onSelectSentiment('positive')}
        isActive={selectedSentiment === 'positive'}
      />
      <StatCard 
        title="Neutrales" 
        value={stats.neutral} 
        color="bg-blue-500"
        onClick={() => onSelectSentiment('neutral')}
        isActive={selectedSentiment === 'neutral'}
      />
      <StatCard 
        title="Negativos" 
        value={stats.negativo} 
        color="bg-red-500"
        onClick={() => onSelectSentiment('negative')}
        isActive={selectedSentiment === 'negative'}
      />
    </div>
  )
}
