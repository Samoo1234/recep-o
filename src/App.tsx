import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Recepcao } from './pages/Recepcao';
import { Pulpito } from './pages/Pulpito';

function Navigation() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Link to="/recepcao" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: 'bold' }}>Recepção</Link>
      <Link to="/pulpito" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: 'bold' }}>Púlpito</Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/recepcao" replace />} />
        <Route path="/recepcao" element={<Recepcao />} />
        <Route path="/pulpito" element={<Pulpito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
