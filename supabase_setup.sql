-- Crie a tabela de visitantes
CREATE TABLE public.visitantes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  convidado_por TEXT,
  telefone TEXT,
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'lido')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilite o Row Level Security (RLS)
ALTER TABLE public.visitantes ENABLE ROW LEVEL SECURITY;

-- Crie políticas para permitir acesso anônimo (apenas para facilitar, já que não temos autenticação configurada)
CREATE POLICY "Permitir leitura para todos" ON public.visitantes FOR SELECT USING (true);
CREATE POLICY "Permitir inserção para todos" ON public.visitantes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualização para todos" ON public.visitantes FOR UPDATE USING (true);

-- IMPORTANTE: Ative o Realtime para a tabela visitantes
-- Vá para Database -> Replication no Supabase Dashboard
-- Clique em "1 Tables" e marque a chave (toggle) ao lado da tabela "visitantes".

-- Alternativamente, você pode rodar este comando SQL para habilitar o realtime:
alter publication supabase_realtime add table public.visitantes;
