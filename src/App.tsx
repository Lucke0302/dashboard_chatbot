import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Commands from './pages/Commands';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="docs" element={<Docs />} />
          <Route path="comandos" element={<Commands />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}