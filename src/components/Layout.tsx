import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, BookOpen, TerminalSquare } from 'lucide-react';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const rotas = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Documentação', path: '/docs', icon: <BookOpen size={20} /> },
    { name: 'Comandos', path: '/comandos', icon: <TerminalSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans">
      
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg text-green-400 shadow-xl"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed md:sticky top-0 left-0 h-screen w-64 bg-gray-950 border-r border-gray-800 shadow-2xl z-40 flex flex-col p-4"
          >
            <div className="flex items-center justify-between mt-2 mb-8 px-2">
              <h2 className="text-xl font-black bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent">
                🦖 BostoCorp
              </h2>
              <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {rotas.map((rota) => {
                const isAtivo = location.pathname === rota.path;
                return (
                  <Link 
                    key={rota.path} 
                    to={rota.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                      isAtivo 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                    }`}
                  >
                    {rota.icon}
                    {rota.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-auto p-4 text-xs font-mono text-gray-600 border-t border-gray-900">
              BostoDash OS v1.0<br/><i>By Lucas Moraes</i>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-blob" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] animate-blob animation-delay-4000" />
    </div>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="p-6 md:p-12 w-full max-w-7xl mx-auto">
          <Outlet /> 
        </div>
      </main>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}