import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4ade80', '#60a5fa', '#c084fc', '#facc15', '#f87171'];

export default function CommandPieChart({ commandsData, totalCommands }: { commandsData: any, totalCommands: number }) {
  
  const topCommands = useMemo(() => {
    if (!commandsData) return [];
    return Object.keys(commandsData)
      .map(cmd => ({ name: cmd, value: commandsData[cmd] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [commandsData]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:col-span-3 bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl backdrop-blur-sm flex flex-col md:flex-row gap-8 items-center"
    >
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <h1 className="text-gray-400 text-lg font-bold uppercase tracking-widest border-b border-gray-800 pb-2 mb-2">
          📊 Top Comandos do Dia
        </h1>
        <p className="text-lg text-gray-500">
          Distribuição de uso do prefixo "!" no servidor hoje. O total processado foi de {totalCommands || 0} comandos.
        </p>
      </div>

      <div className="w-full md:w-2/3 h-64">
        {topCommands.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topCommands}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {topCommands.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#030712', borderColor: '#1f2937', borderRadius: '8px' }}
                itemStyle={{ color: '#f9fafb' }}
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-sm">
            Nenhum comando registrado ainda.
          </div>
        )}
      </div>
    </motion.div>
  );
}