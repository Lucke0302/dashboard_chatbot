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
      
      <header className="flex flex-col md:flex-row items-center justify-between mb-6">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-green-400 to-blue-300 bg-clip-text text-transparent drop-shadow-sm mb-4 md:mb-0"
        >
          Painel de Controle
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2 border border-green-500/30 bg-green-500/10 px-4 py-2 rounded-full font-mono text-sm text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          UPLINK ESTABELECIDO
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