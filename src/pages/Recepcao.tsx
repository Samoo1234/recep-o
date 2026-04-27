import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserPlus } from 'lucide-react';
import logoUrl from '../assets/arquivo.png';

export const Recepcao: React.FC = () => {
  const [nome, setNome] = useState('');
  const [evangelico, setEvangelico] = useState<'sim' | 'nao'>('nao');
  const [denominacao, setDenominacao] = useState('');
  const [acompanhantes, setAcompanhantes] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', erro: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setMensagem({ texto: 'O nome é obrigatório.', erro: true });
      return;
    }

    setLoading(true);
    setMensagem({ texto: '', erro: false });

    try {
      const { error } = await supabase
        .from('visitantes')
        .insert([
          {
            nome: nome.trim(),
            evangelico: evangelico === 'sim',
            denominacao: evangelico === 'sim' ? denominacao.trim() : null,
            acompanhantes: acompanhantes.trim() || null,
            status: 'novo'
          }
        ]);

      if (error) throw error;

      setMensagem({ texto: 'Visitante cadastrado com sucesso!', erro: false });
      setNome('');
      setEvangelico('nao');
      setDenominacao('');
      setAcompanhantes('');
      
      // Limpa a mensagem após 3 segundos
      setTimeout(() => setMensagem({ texto: '', erro: false }), 3000);
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      setMensagem({ texto: 'Erro ao cadastrar visitante.', erro: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img 
          src={logoUrl} 
          alt="Logo da Igreja" 
          style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} 
          onError={(e) => {
            // Se a logo não existir, oculta a imagem para não ficar um quadrado quebrado
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <h1 className="text-center mb-8">Recepção de Visitantes</h1>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="nome">Nome do Visitante *</label>
            <input
              id="nome"
              type="text"
              className="form-input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="acompanhantes">Acompanhantes (Opcional)</label>
            <input
              id="acompanhantes"
              type="text"
              className="form-input"
              value={acompanhantes}
              onChange={(e) => setAcompanhantes(e.target.value)}
              placeholder="Ex: Esposa Maria e 2 filhos"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="evangelico">Evangélico?</label>
            <select
              id="evangelico"
              className="form-input"
              value={evangelico}
              onChange={(e) => setEvangelico(e.target.value as 'sim' | 'nao')}
            >
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          {evangelico === 'sim' && (
            <div className="form-group">
              <label className="form-label" htmlFor="denominacao">Qual denominação?</label>
              <input
                id="denominacao"
                type="text"
                className="form-input"
                value={denominacao}
                onChange={(e) => setDenominacao(e.target.value)}
                placeholder="Ex: Assembleia de Deus"
              />
            </div>
          )}

          {mensagem.texto && (
            <div className={`mb-4 text-center ${mensagem.erro ? 'text-danger' : 'text-success'}`} style={{ color: mensagem.erro ? 'var(--danger)' : 'var(--success)', fontWeight: 'bold' }}>
              {mensagem.texto}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            <UserPlus size={20} />
            {loading ? 'Adicionando...' : 'Adicionar Visitante'}
          </button>
        </form>
      </div>
    </div>
  );
};
