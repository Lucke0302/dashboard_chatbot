import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  nome: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const storedUser = localStorage.getItem('bostopark_user');
      if (storedUser) {
        try {
          const { data } = await api.post('/auth/refresh');
          api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.log("Sessão expirada ou inválida.");
          localStorage.removeItem('bostopark_user');
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = (token: string, userData: User) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('bostopark_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error(e);
    } finally {
      api.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem('bostopark_user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);