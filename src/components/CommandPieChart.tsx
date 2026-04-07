import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#4ade80', '#a855f7', '#3b82f6', '#fbbf24', '#f43f5e', '#22d3ee'];

export default function CommandPieChart({ commandsData, totalCommands }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const data = commandsData ? Object.entries(commandsData).map(([name, value]) => ({
    name: name.startsWith('!') ? name : `!${name}`,
    value
  })).sort((a: any, b: any) => b.value - a.value).slice(0, 6) : [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="md:col-span-3 bg-gray-950/40 p-6 md:p-8 rounded-3xl border border-gray-800/50 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center h-auto md:h-[400px] relative overflow-hidden group"
    >
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full md:w-1/3 mb-6 md:mb-0 relative z-10 pr-0 md:pr-6 flex flex-col justify-center text-center md:text-left">
        <h2 className="text-gray-100 text-2xl font-black tracking-tight uppercase flex items-center justify-center md:justify-start gap-2">
          📊 Top Comandos
        </h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-md mx-auto md:mx-0">
          Distribuição de uso do prefixo "!" no servidor hoje. O total processado foi de <span className="text-green-400 font-bold">{totalCommands || 0}</span> comandos.
        </p>
      </div>

      <div className="w-full md:w-2/3 h-[350px] md:h-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy={isMobile ? "40%" : "50%"}
              innerRadius={isMobile ? 60 : 80}
              outerRadius={isMobile ? 90 : 110}
              paddingAngle={5}
              cornerRadius={6}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ filter: `drop-shadow(0px 4px 10px ${COLORS[index % COLORS.length]}30)` }}
                  className="outline-none transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(3, 7, 18, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                color: '#f1f5f9',
              }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            <Legend 
              verticalAlign={isMobile ? "bottom" : "middle"}
              align={isMobile ? "center" : "right"}
              layout={isMobile ? "horizontal" : "vertical"}
              iconType="circle"
              wrapperStyle={isMobile ? { paddingTop: '20px' } : { paddingLeft: '20px' }}
              formatter={(value, entry: any) => (
                <span className="text-gray-300 font-mono text-xs md:text-sm ml-2">
                  {value} <span className="text-gray-500 text-[10px] md:text-xs ml-1">({entry.payload.value})</span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}