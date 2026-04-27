import { createClient } from '@supabase/supabase-js';

// Usaremos variáveis de ambiente do Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Faltam variáveis de ambiente do Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY).');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Visitante = {
  id: string;
  nome: string;
  evangelico: boolean;
  denominacao: string | null;
  acompanhantes: string | null;
  status: 'novo' | 'lido';
  created_at: string;
};
