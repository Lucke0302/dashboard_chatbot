// src/components/RankingTable.tsx
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Coins } from 'lucide-react';

export default function RankingTable({ topRichest }: any) {
  const getIcon = (index: number) => {
    switch(index) {
      case 0: return <Crown className="text-yellow-400 drop-shadow-[0_0_8px_#facc15]" size={28} />;
      case 1: return <Medal className="text-slate-300" size={24} />;
      case 2: return <Medal className="text-orange-400" size={24} />;
      default: return <Trophy className="text-gray-500" size={20} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:col-span-3 bg-gray-950/40 p-8 rounded-3xl border border-gray-800/50 shadow-2xl backdrop-blur-md flex flex-col group relative overflow-hidden"
    >
      {/* Brilho Dourado de Fundo */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div>
          <h2 className="text-gray-100 text-xl font-black tracking-tight uppercase">Elite do Bostoverso</h2>
          <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.3em] mt-1">Os 5 maiores bilionários</p>
        </div>
        <Coins className="text-yellow-500/20 group-hover:text-yellow-500/50 transition-colors" size={32} />
      </div>

      {/* Container com pt-8 para evitar o corte no hover */}
      <div className="flex flex-row gap-4 overflow-x-auto pt-8 pb-4 px-2 -mx-2 custom-scrollbar relative z-10">
        {topRichest?.map((user: any, index: number) => (
          <motion.div 
            key={user.nome}
            whileHover={{ y: -10, borderColor: 'rgba(234, 179, 8, 0.6)', zIndex: 50 }}
            className="flex-1 min-w-[160px] flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors relative overflow-hidden shadow-lg"
          >
            <span className="absolute -right-2 -bottom-6 text-8xl font-black text-white/[0.02] pointer-events-none select-none">
              {index + 1}
            </span>
            
            <div className={`mb-3 w-14 h-14 rounded-full flex items-center justify-center relative z-10 ${
              index === 0 ? 'bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-gray-800/30'
            }`}>
              {getIcon(index)}
            </div>
            
            <span className={`font-bold tracking-tight text-center truncate w-full mb-2 relative z-10 ${index === 0 ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'}`}>
              {user.nome}
            </span>
            
            <p className="text-green-400 font-mono font-bold text-sm bg-green-400/10 px-3 py-1 rounded-md border border-green-400/20 relative z-10">
              {user.bostocoins.toLocaleString('pt-BR')}
            </p>
          </motion.div>
        ))}

        {!topRichest && (
          <div className="w-full flex flex-col items-center justify-center py-10 text-gray-600 italic font-mono">
            <span className="animate-pulse">Sincronizando dados da blockchain...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}