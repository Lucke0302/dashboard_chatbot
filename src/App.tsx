import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Commands from './pages/Commands';
import Abismo from './pages/Abismo';
import Auth from './pages/Auth';
import { type ReactNode } from 'react'; 

// O Protetor agora embrulha apenas a página interna que quisermos
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#030712] text-green-500">Carregando sistema...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route path="/" element={<Layout />}>
            
            <Route index element={<Dashboard />} />
            <Route path="docs" element={<Docs />} />
            <Route path="comandos" element={<Commands />} />

            <Route 
              path="abismo" 
              element={
                <ProtectedRoute>
                  <Abismo />
                </ProtectedRoute>
              } 
            />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}