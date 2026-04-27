import React, { useEffect, useState, useRef } from 'react';
import { supabase, type Visitante } from '../lib/supabase';
import { VisitorCard } from '../components/VisitorCard';

export const Pulpito: React.FC = () => {
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Audio para notificação
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializa o áudio
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    
    fetchVisitantes();

    // Configura o Realtime
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitantes'
        },
        (payload) => {
          console.log('Realtime Event:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newVisitor = payload.new as Visitante;
            if (newVisitor.status !== 'lido') {
              setVisitantes(prev => [newVisitor, ...prev]);
              // Toca o som quando chega um novo visitante
              audioRef.current?.play().catch(e => console.log('Erro ao tocar áudio:', e));
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedVisitor = payload.new as Visitante;
            if (updatedVisitor.status === 'lido') {
              setVisitantes(prev => prev.filter(v => v.id !== updatedVisitor.id));
            } else {
              setVisitantes(prev => 
                prev.map(v => v.id === updatedVisitor.id ? updatedVisitor : v)
              );
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedVisitor = payload.old;
            setVisitantes(prev => prev.filter(v => v.id !== deletedVisitor.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchVisitantes = async () => {
    try {
      const { data, error } = await supabase
        .from('visitantes')
        .select('*')
        .neq('status', 'lido')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setVisitantes(data);
    } catch (error) {
      console.error('Erro ao buscar visitantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      // Remove otimisticamente da tela para resposta imediata
      setVisitantes(prev => prev.filter(v => v.id !== id));
      
      const { error } = await supabase
        .from('visitantes')
        .update({ status: 'lido' })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Erro ao marcar como lido:', error);
      // Se der erro, recarrega a lista
      fetchVisitantes();
    }
  };

  const handleRemove = async (id: string) => {
    // Apenas oculta da tela atual sem alterar no banco
    setVisitantes(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div className="app-container" style={{ maxWidth: '1600px' }}>
      <h1 className="text-center pulpit-title">Novos Visitantes</h1>
      
      {loading ? (
        <div className="text-center" style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>
          Carregando...
        </div>
      ) : visitantes.length === 0 ? (
        <div className="empty-state">
          Nenhum visitante aguardando.
        </div>
      ) : (
        <div className="visitors-grid">
          {visitantes.map(visitor => (
            <VisitorCard
              key={visitor.id}
              visitor={visitor}
              onMarkAsRead={handleMarkAsRead}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};
