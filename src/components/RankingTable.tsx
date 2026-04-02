import { motion } from 'framer-motion';

export default function RankingTable({ topRichest }: { topRichest: any[] }) {
  if (!topRichest || topRichest.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:col-span-3 bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl backdrop-blur-sm"
    >
      <h2 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">
        🏆 Top 5 Contribuintes da InGen
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topRichest.map((user: any, index: number) => (
          <div key={index} className="flex flex-col bg-gray-950/50 p-4 rounded-xl border border-gray-800/50 hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-gray-500 bg-gray-800 px-2 py-1 rounded-md">#{index + 1}</span>
              <span className="font-bold text-gray-200 truncate">{user.nome}</span>
            </div>
            <span className="font-mono text-lg text-green-400 mt-auto">
              🪙 {user.bostocoins.toLocaleString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}