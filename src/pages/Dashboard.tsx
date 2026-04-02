import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import KpiCard from '../components/KpiCard';
import CommandPieChart from '../components/CommandPieChart';
import RankingTable from '../components/RankingTable';

// Conexão com o servidor
const socket = io("https://api.bostossauro.runage.tech", {
  transports: ["websocket", "polling"]
});

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    socket.on('dashboard_update', (newData) => {
      setData(newData);
    });

    return () => {
      socket.off('dashboard_update');
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      
    <header className="flex flex-col md:flex-row items-center justify-between mb-10 relative z-10">
    <div className="flex flex-col">
        <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-5xl font-black tracking-tighter bg-gradient-to-r from-green-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]"
        >
        Painel de Controle
        </motion.h1>
        <span className="text-gray-500 font-mono text-[10px] mt-1 tracking-[0.3em] uppercase">
        Sincronização em tempo real ativa
        </span>
    </div>
    
    <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 border border-green-500/20 bg-green-500/5 backdrop-blur-xl px-6 py-3 rounded-xl font-mono text-xs text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)] group"
    >
        <div className="relative h-3 w-3">
        <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
        </div>
        <span className="group-hover:text-white transition-colors uppercase tracking-widest">
        UPLINK ESTABELECIDO
        </span>
    </motion.div>
    </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <KpiCard 
          title="PIB do Bostoverso" 
          value={data ? data.economy.total_pib.toLocaleString('pt-BR') : '---'} 
          icon="🏦" 
          colorClass="bg-blue-500/10 text-blue-400"
          prefix={<span className="text-blue-500">🪙</span>}
        />

        <KpiCard 
          title="Mensagens Lidas" 
          value={data ? data.metrics.messages_read.toLocaleString('pt-BR') : '---'} 
          icon="💬" 
          colorClass="bg-green-500/10 text-green-400"
        />

        <KpiCard 
          title="Respostas da IA" 
          value={data ? data.metrics.ai_responses.toLocaleString('pt-BR') : '---'} 
          icon="⚡" 
          colorClass="bg-purple-500/10 text-purple-400"
        />

        <CommandPieChart 
          commandsData={data?.metrics?.commands_breakdown} 
          totalCommands={data?.metrics?.total_commands} 
        />
        
        <RankingTable topRichest={data?.economy?.top_richest} />

      </div>
    </div>
  );
}