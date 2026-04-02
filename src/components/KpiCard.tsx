import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  prefix?: ReactNode;
}

export default function KpiCard({ title, value, icon, colorClass, prefix }: KpiCardProps) {
  return (
    <motion.div 
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2 },
        borderColor: "rgba(34, 197, 94, 0.5)" 
      }}
      className="relative overflow-hidden bg-gray-950/40 p-6 rounded-2xl border border-gray-800/50 shadow-2xl backdrop-blur-md flex flex-col justify-between group"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className={`p-3 rounded-xl text-xl shadow-lg ${colorClass} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">{title}</h2>
      </div>

      <p className="text-4xl font-mono text-white relative z-10 flex items-baseline gap-2">
        {prefix && <span className="opacity-80 scale-75">{prefix}</span>}
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {value}
        </span>
      </p>
    </motion.div>
  );
}