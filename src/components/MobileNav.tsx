"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Painel" },
  { href: "/roteiro-video", label: "Video" },
  { href: "/roteiro-legenda", label: "Legenda" },
  { href: "/criacao-imagem", label: "Imagem" },
  { href: "/instrucoes-kling", label: "Kling" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(11,14,19,0.94)] px-4 py-4 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-serif text-xl tracking-[0.16em] text-[var(--accent-gold)]">
            SUPER MKT
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-gray-500">
            Studio juridico
          </p>
        </div>
        <div className="rounded-full border border-[rgba(207,170,107,0.18)] bg-[rgba(207,170,107,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)]">
          Beta
        </div>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? "shrink-0 rounded-full border border-[rgba(207,170,107,0.24)] bg-[rgba(207,170,107,0.12)] px-4 py-2 text-sm font-medium text-[#f7e5c4]"
                  : "shrink-0 rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm text-gray-300"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
