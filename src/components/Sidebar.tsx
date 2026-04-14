'use client';

import Link from 'next/link';
import { Video, Type, Image as LucideImage, Film, User } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Roteiro de Vídeos', icon: <Video size={20} />, href: '/roteiro-video' },
    { name: 'Roteiro de Legendas', icon: <Type size={20} />, href: '/roteiro-legenda' },
    { name: 'Criação de Imagens', icon: <LucideImage size={20} />, href: '/criacao-imagem' },
    { name: 'Criação de Vídeos', icon: <Film size={20} />, href: '/instrucoes-kling' },
  ];

  return (
    <aside className="w-80 h-full flex flex-col bg-[#0b0c10] border-r border-[#1a1c22]">
      <div className="p-8">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">Menu Lateral</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item, idx) => (
            <Link key={idx} href={item.href} className="button-grid-item">
              {item.icon}
              <span className="leading-tight">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-8 border-t border-[#1a1c22]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[rgba(178,204,255,0.1)] border border-[rgba(178,204,255,0.2)] flex items-center justify-center text-[var(--accent-blue)]">
            <User size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Especialista</div>
            <div className="text-[10px] text-gray-500 font-medium tracking-wider">MARKETING HUB</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
