import type { Stats } from '../../types/tickets';

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
    sentimentValue,
    bgColor = 'bg-white'
  }: { 
    title: string
    value: number
    color: string
    sentimentValue: string | null
    bgColor?: string
  }) => {
    const isActive = selectedSentiment === sentimentValue;
    
    return (
      <button
        onClick={() => onSelectSentiment(sentimentValue)}
        className={`p-6 rounded-xl text-left transition-all transform hover:scale-105 cursor-pointer ${
          isActive 
            ? `${color} text-white shadow-lg` 
            : `${bgColor} text-slate-900 shadow-sm border border-slate-200`
        }`}
      >
        <p className={`text-sm font-medium ${isActive ? 'opacity-90' : 'text-slate-600'}`}>
          {title}
        </p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </button>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <StatCard 
        title="Total" 
        value={stats.total} 
        color="bg-slate-900"
        sentimentValue={null}
      />
      <StatCard 
        title="Procesados" 
        value={stats.processed} 
        color="bg-blue-600"
        sentimentValue="processed"
      />
      <StatCard 
        title="Pendientes" 
        value={stats.pending} 
        color="bg-amber-600"
        sentimentValue="pending"
      />
      <StatCard 
        title="Positivos" 
        value={stats.positivo} 
        color="bg-green-600"
        sentimentValue="Positivo"
      />
      <StatCard 
        title="Neutrales" 
        value={stats.neutral} 
        color="bg-gray-600"
        sentimentValue="Neutral"
      />
      <StatCard 
        title="Negativos" 
        value={stats.negativo} 
        color="bg-red-600"
        sentimentValue="Negativo"
      />
    </div>
  )
}