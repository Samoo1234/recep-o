-- 1. Remova as colunas antigas
ALTER TABLE public.visitantes DROP COLUMN IF EXISTS convidado_por;
ALTER TABLE public.visitantes DROP COLUMN IF EXISTS telefone;

-- 2. Adicione as novas colunas
ALTER TABLE public.visitantes ADD COLUMN IF NOT EXISTS evangelico BOOLEAN DEFAULT false;
ALTER TABLE public.visitantes ADD COLUMN IF NOT EXISTS denominacao TEXT;
