import React from 'react';
import { User, Users, CheckCircle, XCircle } from 'lucide-react';
import type { Visitante } from '../lib/supabase';

interface VisitorCardProps {
  visitor: Visitante;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

export const VisitorCard: React.FC<VisitorCardProps> = ({ visitor, onMarkAsRead, onRemove }) => {
  // Simples heurística para destacar os que chegaram a menos de 5 minutos
  const isNew = new Date().getTime() - new Date(visitor.created_at).getTime() < 5 * 60 * 1000;

  return (
    <div className={`visitor-card ${isNew ? 'new-entry' : ''}`}>
      <div>
        <h2 className="visitor-name">{visitor.nome}</h2>
        {visitor.evangelico ? (
          <div className="visitor-info">
            <User size={20} />
            <span>Evangélico: <strong>{visitor.denominacao || 'Sim'}</strong></span>
          </div>
        ) : (
          <div className="visitor-info">
            <User size={20} />
            <span>Não evangélico</span>
          </div>
        )}
        
        {visitor.acompanhantes && (
          <div className="visitor-info" style={{ marginTop: '0.5rem' }}>
            <Users size={20} />
            <span>Com: <strong>{visitor.acompanhantes}</strong></span>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button 
          className="btn btn-success" 
          onClick={() => onMarkAsRead(visitor.id)}
          title="Marcar como atendido"
        >
          <CheckCircle size={20} />
          Atendido
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => onRemove(visitor.id)}
          title="Ocultar da tela"
        >
          <XCircle size={20} />
          Ocultar
        </button>
      </div>
    </div>
  );
};
