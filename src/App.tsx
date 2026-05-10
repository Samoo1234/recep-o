import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Recepcao } from './pages/Recepcao';
import { Pulpito } from './pages/Pulpito';

function App() {
  // Identifica o domínio/link que o usuário acessou
  const hostname = window.location.hostname;
  
  // Se o link contiver a palavra "pulpito", a rota padrão será a do púlpito. Caso contrário, recepção.
  const rotaPadrao = hostname.includes('pulpito') ? '/pulpito' : '/recepcao';

  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona para a rota padrão baseada no domínio */}
        <Route path="/" element={<Navigate to={rotaPadrao} replace />} />
        
        <Route path="/recepcao" element={<Recepcao />} />
        <Route path="/pulpito" element={<Pulpito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
