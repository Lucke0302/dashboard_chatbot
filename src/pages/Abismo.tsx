import { useState } from 'react';
import { Pickaxe, Shield, HeartPulse } from 'lucide-react';

export default function Abismo() {
    
  const [camada] = useState(1);
  const [risco] = useState(10.0);
  const [hpPicareta] = useState(24);
  const [maxHp] = useState(24);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent flex items-center gap-2">
            <Pickaxe size={32} className="text-orange-500" />
            O Abismo
          </h1>
          <p className="text-gray-400 mt-1">Mineração profunda da BostoCorp. Camada atual: {camada}</p>
        </div>

        {/* STATUS */}
        <div className="flex gap-4 bg-gray-900/50 p-3 rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Shield size={16} className="text-blue-400" />
            Armadura: Bronze
          </div>
          <div className="w-px bg-gray-800"></div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <HeartPulse size={16} className="text-green-400" />
            HP: {hpPicareta}/{maxHp}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visão de Camadas */}
        <div className="lg:col-span-1 bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
           <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">Geologia</h2>
           <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
             <span>[ COMPONENTE CavernaGrid ]</span>
             <span className="text-xs mt-2 text-orange-400">Risco Base: {risco}%</span>
           </div>
        </div>

        {/* Risco e Ações */}
        <div className="lg:col-span-2 bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">Controle de Escavação</h2>
           <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl gap-4">
             [ COMPONENTE PainelControle ]
             <div className="flex gap-4">
               <button className="px-6 py-3 bg-red-600/20 text-red-500 border border-red-500/30 rounded-lg hover:bg-red-600/40 transition">Descer Fundo</button>
               <button className="px-6 py-3 bg-orange-600/20 text-orange-500 border border-orange-500/30 rounded-lg hover:bg-orange-600/40 transition">Cavar Lados</button>
               <button className="px-6 py-3 bg-blue-600/20 text-blue-500 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition">Guardar e Fugir</button>
             </div>
           </div>
        </div>

        {/* INVENTÁRIO */}
        <div className="lg:col-span-3 bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-xl">
           <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-800 pb-2">Acervo & Sacola</h2>
           <div className="h-48 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
             [ COMPONENTE PokedexMinerais ]
           </div>
        </div>

      </div>
    </div>
  );
}