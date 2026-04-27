import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Recepcao } from './pages/Recepcao';
import { Pulpito } from './pages/Pulpito';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/recepcao" replace />} />
        <Route path="/recepcao" element={<Recepcao />} />
        <Route path="/pulpito" element={<Pulpito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
