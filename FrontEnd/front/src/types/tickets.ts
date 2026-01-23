export interface Ticket {
  id: string;
  created_at: string;
  description: string;
  category: string | null;
  sentiment: string | null;
  processed: boolean;
  updated_at?: string;
}

export interface Stats {
  total: number;
  processed: number;
  pending: number;
  positivo: number;
  neutral: number;
  negativo: number;
}