import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pickaxe, Smartphone, Lock, KeyRound, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { data } = await api.post('/auth/login', { phone, password });
        login(data.accessToken, data.user);
        navigate('/');
      } else {
        await api.post('/auth/register', { phone, password, token });
        alert('Conta vinculada com sucesso! Agora faça o login.');
        setIsLogin(true); 
        setToken('');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ocorreu um erro no servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-950 border border-gray-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-green-500"></div>

        <div className="flex flex-col items-center mb-8">
          <Pickaxe size={48} className="text-orange-500 mb-2" />
          <h1 className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent">
            {isLogin ? 'Painel Bostopark' : 'Vincular Conta'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            {isLogin ? 'Acesso restrito a funcionários da InGen.' : 'Use !gerartoken no WhatsApp para obter o código de segurança.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">WhatsApp (Apenas Números)</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="Ex: 11999999999"
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-green-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Senha da Web</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-green-500 transition"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-gray-400 text-xs font-bold uppercase mb-1 block">Token do Bot</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())}
                  placeholder="EX: A1B2C"
                  maxLength={5}
                  className="w-full bg-gray-900 border border-gray-800 text-orange-400 font-bold rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-orange-500 transition uppercase"
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-green-900/20"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar no Sistema' : 'Vincular Dispositivo')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-gray-500 hover:text-white transition"
          >
            {isLogin ? 'Não tem conta? Vincule seu WhatsApp aqui.' : 'Já tem conta? Volte para o Login.'}
          </button>
        </div>

      </div>
    </div>
  );
}