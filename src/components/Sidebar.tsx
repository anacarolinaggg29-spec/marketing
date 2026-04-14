"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuGroups = [
  {
    label: "Painel",
    links: [{ href: "/", label: "Painel principal", detail: "Visao geral do estudio" }],
  },
  {
    label: "Producao textual",
    links: [
      {
        href: "/roteiro-video",
        label: "Roteiro de video",
        detail: "Gancho, estrutura e CTA",
      },
      {
        href: "/roteiro-legenda",
        label: "Legendas para posts",
        detail: "Copy de feed e carrossel",
      },
    ],
  },
  {
    label: "Direcao de arte",
    links: [
      {
        href: "/criacao-imagem",
        label: "Criacao 1:1",
        detail: "Prompt visual e comparativo",
      },
      {
        href: "/instrucoes-kling",
        label: "Instrucoes Kling",
        detail: "Motion prompt e camera",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-80 flex-col border-r border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,#11141a,#0d1015)] lg:flex">
      <div className="border-b border-[rgba(255,255,255,0.08)] px-6 py-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl tracking-[0.18em] text-[var(--accent-gold)]">
              SUPER MKT
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-500">
              Marketing studio juridico
            </p>
          </div>
          <div className="rounded-full border border-[rgba(207,170,107,0.18)] bg-[rgba(207,170,107,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--accent-gold)]">
            Beta
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[11px] uppercase tracking-[0.28em] text-gray-500">
              {group.label}
            </p>
            <div className="mt-3 space-y-2">
              {group.links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      isActive
                        ? "block rounded-3xl border border-[rgba(207,170,107,0.24)] bg-[linear-gradient(180deg,rgba(207,170,107,0.16),rgba(207,170,107,0.05))] px-4 py-4 shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
                        : "block rounded-3xl border border-transparent px-4 py-4 transition hover:border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.03)]"
                    }
                  >
                    <p className="text-sm font-semibold text-white">{link.label}</p>
                    <p className="mt-1 text-sm text-gray-400">{link.detail}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[rgba(255,255,255,0.08)] px-6 py-6">
        <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">
            Diretriz
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Operacao orientada por sobriedade visual, autoridade tecnica e
            comunicacao compativel com as regras da OAB.
          </p>
        </div>
      </div>
    </aside>
  );
}
