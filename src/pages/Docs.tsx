import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import { Book, Wrench } from 'lucide-react';

const RAW_README = 'https://raw.githubusercontent.com/Lucke0302/ChatbotWhats/main/readme.md';
const RAW_INSTALL = 'https://raw.githubusercontent.com/Lucke0302/ChatbotWhats/main/install.md';

export default function Docs() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'readme' | 'install'>('readme');

  useEffect(() => {
    setLoading(true);
    const url = activeTab === 'readme' ? RAW_README : RAW_INSTALL;
    
    axios.get(url)
      .then(res => {
        setContent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro na busca dos dados da InGen:", err);
        setContent('# 🚨 Erro 404\nFalha ao acessar os arquivos da InGen. Verifique se o repositório está público ou se o link está correto.');
        setLoading(false);
      });
  }, [activeTab]); 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent drop-shadow-sm">
          Manual do Sistema
        </h1>
        
        <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800 shadow-lg">
          <button 
            onClick={() => setActiveTab('readme')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'readme' 
              ? 'bg-gray-800 text-green-400 shadow-sm' 
              : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Book size={18} />
            Visão Geral
          </button>
          
          <button 
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'install' 
              ? 'bg-gray-800 text-green-400 shadow-sm' 
              : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Wrench size={18} />
            Instalação
          </button>
        </div>
      </div>

      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 md:p-10 min-h-[60vh] shadow-xl backdrop-blur-sm">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="animate-pulse text-green-500 font-mono tracking-widest uppercase">
              [ Conectando ao mainframe da InGen... ]
            </span>
          </div>
        ) : (
          <div className="prose prose-invert prose-green max-w-none prose-headings:font-black prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-img:rounded-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}