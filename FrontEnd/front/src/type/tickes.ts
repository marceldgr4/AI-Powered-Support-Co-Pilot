export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  sentiment: 'positive' | 'neutral' | 'negative';
  processed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  total: number;
  process: number;
  pending: number;
  posetivo: number;
  neutral: number;
  negativo: number;
}