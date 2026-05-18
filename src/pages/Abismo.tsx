import { useState, useEffect } from 'react';
import { Pickaxe, Shield, HeartPulse, Coins, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface Ferramentas {
  picareta: string;
  picareta_hp: number;
  armadura: string;
  acessorio: string;
}

interface PerfilData {
  id_whatsapp: string;
  nome: string;
  bostocoins: number;
  ferramentas: Ferramentas;
  inventory: Record<string, number>;
  inventario_consumiveis: Record<string, number>;
}

interface EscavacaoData {
  ativa: boolean;
  camada: number;
  risco_porcentagem: number;
  sacola_temporaria: Record<string, number>;
  mensagem?: string;
}

export default function Abismo() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [escavacao, setEscavacao] = useState<EscavacaoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDadosDoAbismo = async () => {
      try {
        const [resPerfil, resEscavacao] = await Promise.all([
          api.get('/parque/perfil'),
          api.get('/parque/escavacao/ativa')
        ]);

        setPerfil(resPerfil.data);
        setEscavacao(resEscavacao.data);
      } catch (error) {
        console.error("Erro ao carregar dados do Abismo:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDoAbismo();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-green-500 gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-mono animate-pulse">Sincronizando com a InGen...</p>
      </div>
    );
  }

  if (!perfil) {
    return <div className="text-red-500">Erro ao carregar seu perfil. Tente recarregar a página.</div>;
  }

  const nomesArmaduras: Record<string, string> = {
    'nenhuma': 'Camisa de Time',
    'couro': 'Couro',
    'malha': 'Cota de Malha',
    'bronze': 'Bronze',
    'ferro': 'Ferro',
    'titanio': 'Titânio',
    'diamante': 'Diamante',
    'grafeno': 'Grafeno'
  };

  const isEscavando = escavacao?.ativa;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
            <Pickaxe size={32} className="text-orange-500" />
            O Abismo
          </h1>
          <p className="text-gray-400 mt-1">
            {isEscavando 
              ? `Você está escavando na Camada ${escavacao.camada}. Muito cuidado!` 
              : 'Você está seguro na superfície. Use o WhatsApp para entrar.'}
          </p>
        </div>

        {/* STATUS */}
        <div className="flex flex-wrap gap-4 bg-gray-900/50 p-3 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 text-sm font-medium text-yellow-500">
            <Coins size={16} />
            🪙 {perfil.bostocoins.toLocaleString('pt-BR')}
          </div>
          <div className="w-px bg-gray-800 hidden md:block"></div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Shield size={16} className="text-blue-400" />
            {nomesArmaduras[perfil.ferramentas.armadura] || perfil.ferramentas.armadura}
          </div>
          <div className="w-px bg-gray-800 hidden md:block"></div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <HeartPulse size={16} className="text-green-400" />
            HP da Ferramenta: {perfil.ferramentas.picareta_hp}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visão de Camadas */}
        <div className="lg:col-span-1 bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
           <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">Geologia</h2>
           <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
             
             {isEscavando ? (
               <>
                 <span className="text-2xl font-black text-white">Camada {escavacao.camada}</span>
                 <span className="text-sm mt-2 text-orange-400">Risco Base: {escavacao.risco_porcentagem}%</span>
               </>
             ) : (
               <span>Você está na Superfície 🌴</span>
             )}

           </div>
        </div>

        {/* Risco e Ações */}
        <div className="lg:col-span-2 bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">Controle de Escavação</h2>
           <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl gap-4">
             <div className="flex flex-wrap justify-center gap-4 px-4">
               <button disabled={!isEscavando} className="px-6 py-3 bg-red-600/20 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition">Descer Fundo</button>
               <button disabled={!isEscavando} className="px-6 py-3 bg-orange-600/20 text-orange-500 border border-orange-500/30 rounded-lg hover:bg-orange-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition">Cavar Lados</button>
               <button disabled={!isEscavando} className="px-6 py-3 bg-blue-600/20 text-blue-500 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition">Guardar e Fugir</button>
             </div>
             {!isEscavando && <span className="text-xs">Use <b>!escavar</b> no WhatsApp para habilitar os controles.</span>}
           </div>
        </div>

        {/* INVENTÁRIO */}
        <div className="lg:col-span-3 bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">Sacola Temporária</h2>
           <div className="min-h-32 flex flex-wrap items-center justify-start p-4 text-gray-500 border-2 border-dashed border-gray-800 rounded-xl gap-4">
             
             {!isEscavando || !escavacao?.sacola_temporaria || Object.keys(escavacao.sacola_temporaria).length === 0 ? (
               <span className="w-full text-center">Nenhum minério coletado nesta descida ainda.</span>
             ) : (
               Object.entries(escavacao.sacola_temporaria).map(([id, qtd]) => (
                 <div key={id} className="flex flex-col items-center bg-gray-900 p-3 rounded-lg border border-gray-700 min-w-[80px]">
                   <span className="text-2xl mb-1">{id === 'ambar' ? '🦟' : '🪨'}</span>
                   <span className="text-xs font-bold text-white uppercase">{id}</span>
                   <span className="text-xs text-orange-400">x{qtd}</span>
                 </div>
               ))
             )}

           </div>
        </div>

      </div>
    </div>
  );
}