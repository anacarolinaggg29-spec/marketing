import { Play, Video, Sparkles, Wand2, ArrowRight } from 'lucide-react';

export default function InstrucoesKlingPage() {
  const steps = [
    {
      title: "Prompts Cinematográficos",
      desc: "Utilize descrições detalhadas de iluminação, movimento de câmera e estilo artístico.",
      icon: <Video size={24} className="text-[var(--accent-gold)]" />
    },
    {
      title: "Controle de Movimento",
      desc: "Ajuste os parâmetros de motion para garantir uma fluidez natural nos vídeos gerados.",
      icon: <ArrowRight size={24} className="text-[var(--accent-gold)]" />
    },
    {
      title: "Extensão de Duração",
      desc: "Aprenda a conectar clips para criar vídeos informativos mais longos e educativos.",
      icon: <Sparkles size={24} className="text-[var(--accent-gold)]" />
    },
    {
      title: "Refinamento de Detalhes",
      desc: "Use o upscaler integrado para garantir que o vídeo final tenha qualidade 4K.",
      icon: <Wand2 size={24} className="text-[var(--accent-gold)]" />
    }
  ];

  return (
    <div className="p-12 max-w-5xl mx-auto h-full overflow-y-auto animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-light mb-4">
          Guia de Criação – <span className="font-bold text-[var(--accent-gold)]">KLING AI</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Siga estas instruções para converter seus roteiros em vídeos de alta performance no Instagram usando Kling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="glass-panel p-8 group hover:border-[var(--accent-gold)] transition-all">
            <div className="p-3 bg-white/5 w-fit rounded-xl mb-6 group-hover:bg-[var(--accent-gold)]/10 transition-colors">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
            <p className="text-gray-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-panel p-8 bg-[rgba(207,170,107,0.05)] border-[rgba(207,170,107,0.2)]">
        <h3 className="text-xl font-bold text-[var(--accent-gold)] mb-4 flex items-center gap-2">
          <Play size={20} fill="currentColor" /> Dica de Exportação
        </h3>
        <p className="text-gray-300">
          Para o Instagram Reels, sempre exporte na resolução **1080x1920 (9:16)**. No Kling, certifique-se de que a opção de consistência de personagens esteja ativada se você estiver aparecendo em múltiplos clips.
        </p>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500 uppercase tracking-widest">
        Estúdio de Direção Artística • JURÍDICO.AI
      </div>
    </div>
  );
}
