// src/components/CommandPieChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

// Cores sólidas e modernas (sem glow)
const COLORS = ['#4ade80', '#a855f7', '#3b82f6', '#fbbf24', '#f43f5e', '#22d3ee'];

export default function CommandPieChart({ commandsData, totalCommands }: any) {
  // Corrige o problema do "!!" verificando se a string já começa com "!"
  const data = commandsData ? Object.entries(commandsData).map(([name, value]) => ({
    name: name.startsWith('!') ? name : `!${name}`,
    value
  })).sort((a: any, b: any) => b.value - a.value).slice(0, 6) : [];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      // Mudança principal: flex-row em telas médias/grandes
      className="md:col-span-3 bg-gray-950/40 p-8 rounded-3xl border border-gray-800/50 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center h-auto md:h-[400px] relative overflow-hidden group"
    >
      {/* Luz de fundo muito mais sutil */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Lado Esquerdo: Textos */}
      <div className="w-full md:w-1/3 mb-8 md:mb-0 relative z-10 pr-0 md:pr-6 flex flex-col justify-center">
        <h2 className="text-gray-100 text-2xl font-black tracking-tight uppercase flex items-center gap-2">
          📊 Top Comandos
        </h2>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          Distribuição de uso do prefixo "!" no servidor hoje. O total processado foi de <span className="text-green-400 font-bold">{totalCommands || 0}</span> comandos.
        </p>
      </div>

      {/* Lado Direito: Gráfico de Rosca */}
      <div className="w-full md:w-2/3 h-[300px] md:h-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80} // Estilo rosca mantido
              outerRadius={110}
              paddingAngle={5} // Espaço entre as fatias
              cornerRadius={6} // Bordas arredondadas
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={color} 
                    // Removido o style de drop-shadow para tirar o excesso de brilho
                    className="outline-none transition-all duration-300 hover:opacity-80"
                  />
                );
              })}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(3, 7, 18, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                color: '#f1f5f9',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            <Legend 
              verticalAlign="middle" 
              align="right" 
              layout="vertical"
              iconType="circle"
              wrapperStyle={{ paddingLeft: '20px' }}
              formatter={(value, entry: any) => (
                <span className="text-gray-300 font-mono ml-2">
                  {value} <span className="text-gray-500 text-xs ml-1">({entry.payload.value})</span>
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}