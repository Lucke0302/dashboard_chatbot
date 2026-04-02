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
      whileHover={{ y: -5 }}
      className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl backdrop-blur-sm flex flex-col justify-between"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-lg text-xl ${colorClass}`}>
          {icon}
        </div>
        <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</h2>
      </div>
      <p className="text-4xl font-mono text-white">
        {prefix && <span className="mr-2">{prefix}</span>}
        {value}
      </p>
    </motion.div>
  );
}