import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mic, Wrench, Dices, CloudSun, DollarSign, MessageCircle, 
  Tractor, Brain, Search, Gamepad2, HelpingHand, FileText, 
  Map, FileDown, Fish, Send, Target, AlignLeft, Sparkles, 
  Briefcase, Languages, Diamond 
} from 'lucide-react';

const renderFormattedText = (text: string) => {
  return text.split('\n').map((line, lineIndex) => {
    const parts = line.split(/(\*[^*]+\*|_[^_]+_)/g);
    
    return (
      <span key={lineIndex} className="block min-h-[1.5rem] mb-1">
        {parts.map((part, partIndex) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            return <strong key={partIndex} className="text-white font-bold">{part.slice(1, -1)}</strong>;
          }
          if (part.startsWith('_') && part.endsWith('_')) {
            return <em key={partIndex} className="text-gray-400 italic">{part.slice(1, -1)}</em>;
          }
          return <span key={partIndex}>{part}</span>;
        })}
      </span>
    );
  });
};

const comandosData = [
  { 
    id: 'audio', nome: '!audio', icone: Mic, cor: 'text-blue-400', bg: 'bg-blue-400/10', short: 'Transforma texto em áudio.', 
    full: 'Minha irmã mais nova lê a sua mensagem em voz alta (ou a que você respondeu).',
    detalhes: `🗣️ *COMANDO: !audio*\nMinha irmã mais nova lê a sua mensagem em voz alta (ou a que você respondeu)\n\n*Como usar:*\n!audio [língua (abreviação)] [conteúdo]\n\n*Línguagens suportadas - abreviações:*\nPortuguês - pt\nInglês - en\nEspanhol - es\nJaponês - ja\nFrancês - fr`
  },
  { 
    id: 'bico', nome: '!bico', icone: Wrench, cor: 'text-amber-500', bg: 'bg-amber-500/10', short: 'Dinheiro rápido com trampos duvidosos.', 
    full: 'Precisa de grana rápida? Vá fazer um trampo duvidoso.',
    detalhes: `🛠️ *COMANDO: !bico*\nPrecisa de grana rápida? Vá fazer um trampo duvidoso.\nPaga entre 15 e 90 Bostocoins dependendo do seu esforço.\n\n*Como usar:* !bico\n*Cooldown:* 2 horas.`
  },
  { 
    id: 'cassino', 
    nome: '!cassino', 
    icone: Dices, 
    cor: 'text-purple-400', 
    bg: 'bg-purple-400/10', 
    short: 'Jogos de azar, loteria e a Faria Lima Jurássica.', 
    full: 'Bem-vindo ao antro da perdição e do capitalismo selvagem!',
    detalhes: `🎰 *COMANDO: !cassino*
Bem-vindo ao antro da perdição e do capitalismo selvagem!

*Jogos Rápidos:*
1️⃣ *Caça-Níqueis* ➝ \`!cassino [aposta]\` (Prêmios: 1.5x a 20x)
2️⃣ *Cara/Coroa* ➝ \`!cassino [cara/coroa] [aposta]\` (Prêmio: 1.8x)
3️⃣ *Roleta* ➝ \`!cassino roleta [vermelho/preto/verde] [aposta]\` (Verde paga 12x!)

🎟️ *Loterias (Sorteio toda Segunda-feira às 10h):*
4️⃣ *BostoSena (Mega)* ➝ \`!cassino mega [1-100] [aposta]\`
5️⃣ *Bolão da Rapaziada* ➝ \`!cassino bolao [1-20] [aposta]\`

📈 *Wall Street Jurássica:*
• \`!investir\` ➝ Aplique seu dinheiro e ganhe rendimentos passivos diários. \nParâmetros: depositar/sacar. Ex:!investir depositar 100000 
• \`!emprestimo\` ➝ Faliu? Pegue dinheiro com o Agiota do bot (ele cobra do seu lucro).
• \`!titulo loja\` ➝ Compre títulos de nobreza para ostentar do lado do seu nome.

📊 *Consultas e Fofoca Financeira:*
• \`!cassino saldo\` ➝ Mostra o que sobrou na sua carteira.
• \`!cassino mega apostadores\` ➝ Lista quem jogou na Mega Sena.
• \`!cassino bolao apostadores\` ➝ Lista quem está no Bolão.

*Dica:* O bot verifica automaticamente se você tem saldo antes de aceitar a aposta. Cuidado para não acabar no !minhabosta!`
  },
  { 
    id: 'clima', nome: '!clima', icone: CloudSun, cor: 'text-sky-400', bg: 'bg-sky-400/10', short: 'Previsão do tempo para a sua região.', 
    full: 'Eu viro a Maju Coutinho por 5 segundos.',
    detalhes: `🌡️ *COMANDO: !clima*\nEu viro a Maju Coutinho por 5 segundos.\n\n*Como usar:*\n• _!clima Santos_ (Clima agora, derretendo ou chovendo)\n• _!clima São Paulo amanhã_ (Previsão pra você levar guarda-chuva)\n\nSe der erro, é culpa de São Pedro.`
  },
  { 
    id: 'cotacao', nome: '!cotacao', icone: DollarSign, cor: 'text-emerald-400', bg: 'bg-emerald-400/10', short: 'Calculadora de conversão de moedas.', 
    full: 'Calculadora de depressão. Vê quanto seu dinheiro não vale nada.',
    detalhes: `💸 *COMANDO: !cotacao*\nCalculadora de depressão. Vê quanto seu dinheiro não vale nada.\n\n*Como usar:*\n!cotacao [origem] [destino] [valor]\n\n*Exemplos:*\n• _!cotacao real dolar 10_ (Dá nem pra comprar bala)\n• _!cotacao btc real 1_ (Sonho de consumo)`
  },
  { 
    id: 'd', nome: '!d', icone: Dices, cor: 'text-rose-400', bg: 'bg-rose-400/10', short: 'Rolador de dados de RPG.', 
    full: 'Rola dados de RPG. Se cair 1, a culpa é sua.',
    detalhes: `🎲 *COMANDO: !d*\nRola dados de RPG. Se cair 1, a culpa é sua.\n\n*Como usar:* !d[lados]\n*Exemplos:*\n• _!d20_ (Clássico)\n• _!d6_ (Dado de ludo)\n• _!d100_ (Exagero)`
  },
  { 
    id: 'falador', nome: '!falador', icone: MessageCircle, cor: 'text-indigo-400', bg: 'bg-indigo-400/10', short: 'Mostra o ranking de quem mais mandou mensagem.', 
    full: 'Mostra o TOP 3 das pessoas que mais mandaram mensagem hoje.',
    detalhes: `🗣️ *COMANDO: !falador*\nMostra o TOP 3 das pessoas que mais mandaram mensagem *hoje*.\nO contador zera automaticamente quando vira o dia.\nSe ninguém falou nada, eu aviso.`
  },
{ 
    id: 'fazenda', 
    nome: '!fazenda', 
    icone: Tractor, 
    cor: 'text-orange-400', 
    bg: 'bg-orange-400/10', 
    short: 'Sistema de Agronegócio (Beta).', 
    full: 'Bem-vindo ao Agronegócio Jurássico! Gerencie seus canteiros e lucre com o Ceasa.',
    detalhes: `🚜 *COMANDO: !fazenda* (BETA)
Bem-vindo ao Agronegócio Jurássico! Aqui você divide seus suprimentos entre a pesca e a lavoura para dominar o mercado agrícola.

*Ações de Trabalho:*
🌱 *!fazenda plantar [semente]* ➝ Compra e planta no primeiro canteiro livre (Ex: !fazenda plantar trigo).
💧 *!fazenda regar [canteiro]* ➝ Gasta 1 Suprimento para adiantar o crescimento em 25%. Muito útil para colheitas rápidas.
🌱 *!fazenda adubar [canteiro]* ➝ Gasta 1 suprimento (ou peixes) para adubar a terra (aumenta a produção final).
🌾 *!fazenda colher [canteiro]* ➝ Tenta a colheita. *Cuidado:* Existe 10% de chance de seca e 5% de infestação de gafanhotos que destroem a plantação.

*Catálogo de Sementes (Exemplos):*
• *Trigo Rápido:* Custo 20 | Cresce em 4h.
• *Batata do Minecraft:* Custo 35 | Cresce em 6h.
• *Cenoura Comum:* Custo 50 | Cresce em 8h.
• *Soja Transgênica:* Custo 80 | Cresce em 12h.
• *Abóbora Gigante:* Custo 100 | Cresce em 16h.

*Gerenciamento:*
🚜 *!fazenda perfil* ➝ Veja o estado dos seus canteiros e o tempo restante para cada planta.
🏪 *!fazenda loja* ➝ Veja a lista completa de sementes disponíveis e seus preços de venda por Kg.
🎒 *!fazenda despensa* ➝ Veja quantas toneladas de comida você já colheu e tem estocadas.
💰 *!fazenda vender [numero/tudo]* ➝ Venda sua produção para o Ceasa e receba Bostocoins na hora.

*Dica de Mestre:* Fique de olho no tempo! Se demorar demais para colher após o crescimento, a planta pode murchar.`
  },
  { 
    id: 'gpt', nome: '!gpt', icone: Brain, cor: 'text-pink-400', bg: 'bg-pink-400/10', short: 'Pergunte qualquer coisa para a IA.', 
    full: 'Usa minha inteligência suprema de predador digital.',
    detalhes: `🤖 *COMANDO: !gpt*\nUsa minha inteligência suprema de predador digital.\n\n*Como usar:* !gpt [pergunta]\n*Exemplo:* _!gpt por que o céu é azul?_\n*Obs:* Se você gritar (CAPSLOCK), eu não deixo barato. Aqui é reciprocidade, fiote.`
  },
  { 
    id: 'lembrar', nome: '!lembrar', icone: Search, cor: 'text-teal-400', bg: 'bg-teal-400/10', short: 'Busca fofocas antigas no banco de dados.', 
    full: 'Eu tenho memória de elefante... digo, de T-Rex.',
    detalhes: `🧠 *COMANDO: !lembrar*\nEu tenho memória de elefante... digo, de T-Rex.\nEu busco no banco de dados algo que falaram no passado.\n\n*Como usar:* !lembrar [o que você quer buscar]\n*Exemplo:* _!lembrar o que o João falou ontem_`
  },
  { 
    id: 'lol', nome: '!lol', icone: Gamepad2, cor: 'text-cyan-400', bg: 'bg-cyan-400/10', short: 'Consulta de elo e stats do League of Legends.', 
    full: 'Ferramenta oficial de humilhação.',
    detalhes: `🎮 *COMANDO: !lol*\nFerramenta oficial de humilhação. Mostra Elo, Winrate e se você é mono.\n\n*Como usar:* !lol [Nick] #[Tag]\n*Exemplo:* _!lol Faker #T1_ (Ou seu nick de bronze aí)`
  },
  { 
    id: 'minhabosta', nome: '!minhabosta', icone: HelpingHand, cor: 'text-yellow-400', bg: 'bg-yellow-400/10', short: 'Auxílio emergencial para falidos.', 
    full: 'O famoso "Minha Bosta Minha Vida". Auxílio emergencial do governo.',
    detalhes: `🪙 *COMANDO: !minhabosta*\nO famoso "Minha Bosta Minha Vida". Auxílio emergencial do governo jurássico para quem perdeu tudo na roleta.\n\n*Regras:* Seu saldo precisa ser menor que 50 Bostocoins. Só pode pedir a cada 48 horas.\n*Como usar:* !minhabosta`
  },
  { 
    id: 'notas', nome: '!notas', icone: FileText, cor: 'text-slate-400', bg: 'bg-slate-400/10', short: 'Veja o que a IA anotou secretamente sobre você.', 
    full: 'Mostra o que eu, em minha infinita sabedoria, anotei sobre você.',
    detalhes: `📝 *COMANDO: !notas*\nMostra o que eu, em minha infinita sabedoria, anotei sobre você.\nSe tiver escrito que você é chato, não reclama.`
  },
{ 
    id: 'parque', 
    nome: '!parque', 
    icone: Map, 
    cor: 'text-lime-400', 
    bg: 'bg-lime-400/10', 
    short: 'Administre o Jurassic BostoPark cooperativo.', 
    full: 'Escave fósseis, clone dinossauros e gerencie a bilheteria do grupo.',
    detalhes: `🦖 *COMANDO: !parque*
O Jurassic BostoPark é um ecossistema cooperativo. O lucro da bilheteria é dividido entre os membros baseado na satisfação e nível dos dinossauros vivos.

*Mineração & DNA (Ganho de Recursos):*
⛏️ *!escavar* ➝ Gasta energia (mesmo cooldown do !bico). Você pode encontrar:
  • *Lixo:* Pedregulho, Terra, Cascalho.
  • *Comum:* Carvão, Calcário, Argila.
  • *Raro:* Ouro, Diamante, Esmeralda.
  • *Lendário:* Âmbar (Contém DNA para clonagem).

*Gerenciamento do Zoológico:*
🏆 *!parque missoes* ➝ Exibe as missões pra recuperar o dinheiro que a InGen rouba da gente.
🖼️ *!parque mural* ➝ Exibe os dinossauros ativos no grupo, seus níveis e IDs.
🍗 *!parque alimentar [ID] [Nº]* ➝ Usa peixes (da pescaria), vegetais (da fazenda) ou a reserva comunitária para manter os dinos vivos.
🍗 *!parque reserva [ID_PEIXE/COLHEITA]* ➝ Usa peixes ou vegetais (da fazenda) para auxiliar os amiguinhos.
🧬 *!parque perfil* ➝ Veja seus bônus de ticket e seus 5 melhores clones.

*Mecânicas Avançadas:*
🧪 *Híbridos:* Criaturas como o *Indominus Rex* surgem automaticamente se o grupo possuir os dinossauros originais necessários.
👑 *!parque titulo [pai/mae] [ID]* ➝ Assume a guarda de um dinossauro e exibe o nome dele como seu título global.
🏷️ *!parque nome [ID] [Nome]* ➝ Batize as criaturas que você descobriu.

*Dica de Sobrevivência:* Se os dinossauros ficarem com fome, a bilheteria cai drasticamente. Colabore com o grupo depositando comida na *!parque reserva*.`
  },
  { 
    id: 'pdf', nome: '!pdf', icone: FileDown, cor: 'text-red-500', bg: 'bg-red-500/10', short: 'Converte imagens ou docs enviados em PDF.', 
    full: 'Transforma a imagem/documento em um PDF.',
    detalhes: `📙 *Comando: !pdf*\nTransforma a imagem/documento que você enviou pra mim em um pdf.\n\n*Como usar:* Envia a imagem/documento com !pdf na mensagem ou responde ela com o !pdf.`
  },
  { 
    id: 'pescaria', nome: '!pescaria', icone: Fish, cor: 'text-blue-500', bg: 'bg-blue-500/10', short: 'O sistema supremo de pesca e mercado negro.', 
    full: 'Bem-vindo ao Lago do Bostossauro! Pegue sua vara e vá pro sol.',
    detalhes: `🎣 *COMANDO: !pescaria*\nBem-vindo ao Lago do Bostossauro! Você regenera 1 isca a cada 2 horas.\n\n*Ação:*\n🎣 *!pescar* (ou !pesca) ➝ Joga a isca na água e tenta a sorte.\n\n*Mercado & Loja:*\n🏪 *!pescaria loja* ➝ Gaste seus Bostocoins em iscas ou forje uma VARA.\n🛍️ *!pescaria comprar [número_ou_vara]* ➝ Compra o item.\n⚖️ *!pescaria vender* ➝ Venda seus troféus.\n\n*Inventário & Rankings:*\n🎒 *!pescaria perfil* ➝ Veja suas iscas e top 5 peixes.\n🏆 *!pescaria ranking* ➝ O Top 10 de quem mais pescou na vida.`
  },
  { 
    id: 'pix', nome: '!pix', icone: Send, cor: 'text-emerald-500', bg: 'bg-emerald-500/10', short: 'Transferência de Bostocoins entre usuários.', 
    full: 'O Banco Central do Bostossauro permite agiotagem e doações.',
    detalhes: `💸 *COMANDO: !pix*\nO Banco Central do Bostossauro permite agiotagem e doações.\n\n*Como usar:* !pix @usuario [valor]\n*Exemplo:* _!pix @João 50_`
  },
  { 
    id: 'poke', nome: '!poke', icone: Target, cor: 'text-red-400', bg: 'bg-red-400/10', short: 'Sistema completo de captura e batalhas Pokémon.', 
    full: 'O sistema completo de batalha, captura e ginásios!',
    detalhes: `🎮 *COMANDO: !poke*\nO sistema completo de batalha, captura e ginásios!\n\n*Comandos Básicos:*\n• *!poke comecar* ➝ Escolhe seu inicial.\n• *!poke explorar* ➝ Acha um Pokémon selvagem.\n• *!poke atacar [1-4]* ➝ Usa um golpe.\n• *!poke capturar* ➝ Joga uma Pokébola.\n\n*Gerenciamento e Time:*\n• *!poke perfil* ➝ Vê seus Pokémon, insígnias e dinheiro.\n• *!poke mostrar [1-6]* ➝ Vê ficha completa (HP, IVs, Nature).\n• *!poke pc* ➝ Acessa a Box.\n• *!poke daycare* ➝ Deixa o Pokémon treinando.\n\n*Progresso:*\n• *!poke ginasio* ➝ Desafia os líderes.`
  },
  { 
    id: 'resumo', nome: '!resumo', icone: AlignLeft, cor: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', short: 'Lê o chat e resume a fofoca para você.', 
    full: 'Preguiça de ler 500 mensagens de "bom dia"? Eu leio e te conto.',
    detalhes: `📜 *COMANDO: !resumo*\nPreguiça de ler 500 mensagens de "bom dia"? Eu leio e te conto o que presta.\n\n*Como usar:*\n• _!resumo_ (Padrão, leio as últimas 50 e resumo)\n• _!resumo curto_ (Curto e grosso)\n• _!resumo completo 100_ (Leio 100 msgs. Haja paciência...)`
  },
  { 
    id: 'sticker', nome: '!sticker', icone: Sparkles, cor: 'text-yellow-300', bg: 'bg-yellow-300/10', short: 'Faz figurinhas. Tem modos de destruição de imagem.', 
    full: 'Manda a mídia com a legenda !s ou responde a mensagem com !s.',
    detalhes: `🖼️ *COMANDO: !s (ou !sticker)*\nManda a mídia com a legenda *!s* ou responde a mensagem com *!s*.\nNão vem mandar vídeo de 2 horas que eu não sou cinema, hein!\n\n*Modos de destruição (Parâmetros):*\n• *!s baixa* ➝ Qualidade Tekpix (4k do paraguai).\n• *!s podi* ➝ Destruo a imagem até ela pedir socorro.`
  },
  { 
    id: 'trabalhar', nome: '!trabalhar', icone: Briefcase, cor: 'text-stone-400', bg: 'bg-stone-400/10', short: 'Bata o ponto na CLT e ganhe seu salário.', 
    full: 'Assine a CLT virtual! Agora você tem uma carreira oficial.',
    detalhes: `💼 *COMANDO: !trabalhar*\nAssine a CLT virtual! Agora você tem uma carreira oficial (The Sims style).\nSeu salário é fixo (mais ou menos) e baseado no seu nível profissional.\n\n*Como usar:* !trabalhar\n*Cooldown:* 8 horas.\n*Dica:* Fique de olho, em breve você poderá !estudar para ser promovido.`
  },
  { 
    id: 'tradutor', nome: '!tradutor', icone: Languages, cor: 'text-indigo-300', bg: 'bg-indigo-300/10', short: 'Traduz textos para a língua desejada.', 
    full: 'Eu traduzo porque aparentemente você faltou na aula de inglês do Fisk.',
    detalhes: `🗣️ *COMANDO: !tradutor*\nEu traduzo porque aparentemente você faltou na aula de inglês do Fisk.\n\n*Como usar:* !tradutor [lingua] [texto]\n*Exemplo:* _!tradutor japones bom dia_`
  },
  { 
    id: 'vip', nome: '!vip', icone: Diamond, cor: 'text-violet-400', bg: 'bg-violet-400/10', short: 'O mercado negro para comprar mais cota de IA.', 
    full: 'Se você estourou sua cota diária de respostas inteligentes, compre o perdão.',
    detalhes: `💎 *COMANDO: !vip*\nO mercado negro do Bostossauro. Se você estourou sua cota diária de respostas inteligentes (!gpt e !resumo), aqui você pode comprar perdão.\n\n*Como usar:*\n• *!vip* ➝ Abre o catálogo do mercado negro e vê sua cota atual.\n• *!vip comprar [numero]* ➝ Compra um item (Ex: Overclock Cerebral) para diminuir seu uso de IA do dia.`
  },
];

export default function Commands() {
  const [comandoAberto, setComandoAberto] = useState<any>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const comandosOrdenados = [...comandosData].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="flex flex-col gap-8 relative">
      <div className="border-b border-gray-800 pb-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent drop-shadow-sm mb-3">
          Dicionário de Comandos
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Consulte o grimório oficial do Bostossauro. Passe o mouse ou clique em qualquer card para ver a documentação completa e os parâmetros de cada comando.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {comandosOrdenados.map((cmd) => {
          const Icone = cmd.icone;
          const isHovered = hoveredId === cmd.id;
          return (
            <motion.div
              layout
              key={cmd.id}
              initial={{ borderRadius: 16 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02, 
                borderColor: "rgba(34, 197, 94, 0.4)",
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setHoveredId(cmd.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setComandoAberto(cmd)}
              className="relative overflow-hidden bg-gray-950/40 border border-gray-800/50 rounded-2xl p-5 cursor-pointer shadow-2xl backdrop-blur-md flex flex-col h-full transition-colors group"
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <motion.div layout className="flex items-center gap-4 mb-3 relative z-10">
                <div className={`p-3 rounded-xl shadow-lg ${cmd.bg} ${cmd.cor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icone size={24} />
                </div>
                <h2 className="text-xl font-bold font-mono text-gray-100 tracking-tight group-hover:text-white transition-colors">
                  {cmd.nome}
                </h2>
              </motion.div>
              
              <motion.p layout className="text-gray-400 text-sm leading-relaxed mt-auto relative z-10 group-hover:text-gray-300 transition-colors">
                {cmd.short}
              </motion.p>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="pt-3 border-t border-gray-800/80">
                      <p className="text-gray-300 text-sm leading-relaxed mb-3 italic">
                        {cmd.full}
                      </p>
                      <span className="text-[10px] font-black text-green-400/80 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sparkles size={12} className="animate-pulse" />
                        Clique para ver parâmetros
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`absolute -bottom-10 -right-10 w-24 h-24 blur-[50px] opacity-20 rounded-full ${cmd.bg}`} />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {comandoAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setComandoAberto(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-gray-950/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[2rem] overflow-hidden z-10 backdrop-blur-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <div className={`p-8 border-b border-white/5 flex items-center gap-6 shrink-0 relative ${comandoAberto.bg}`}>
                <div className={`${comandoAberto.cor} p-4 rounded-2xl bg-white/5 shadow-inner border border-white/5`}>
                  <comandoAberto.icone size={40} className="drop-shadow-[0_0_12px_currentColor]" />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-black font-mono text-white tracking-tighter uppercase">
                    {comandoAberto.nome}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                      Protocolo Ativo: {comandoAberto.id}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setComandoAberto(null)}
                  className="group p-3 bg-white/5 hover:bg-red-500/20 rounded-xl text-gray-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/30"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
                <div className="text-gray-300 text-base md:text-lg leading-relaxed font-sans selection:bg-green-500/30">
                  {renderFormattedText(comandoAberto.detalhes)}
                </div>
              </div>

              <div className="p-4 bg-black/40 border-t border-white/5 flex justify-center items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <span className="text-[9px] font-mono text-gray-600 tracking-[0.5em] uppercase">
                    BostoCorp Secure Interface v6.0
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}