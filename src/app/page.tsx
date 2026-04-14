import Link from "next/link";
import AppShell from "@/components/AppShell";
import {
  compliancePillars,
  dashboardMetrics,
  workflows,
} from "@/lib/studio-data";

export default function Home() {
  return (
    <AppShell
      badge="Painel operacional"
      category="Studio overview"
      title="Centro de comando do SUPER MKT"
      description="A base visual ja existia. Agora o produto passa a ter rotas reais, modulos acionaveis e uma leitura mais clara do que deve ser produzido em cada fluxo."
      actions={[
        { label: "Abrir roteiro de video", href: "/roteiro-video" },
        {
          label: "Ver criacao 1:1",
          href: "/criacao-imagem",
          variant: "secondary",
        },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <section className="glass-panel overflow-hidden px-6 py-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                  Proxima etapa recomendada
                </p>
                <h2 className="max-w-xl font-serif text-3xl text-white">
                  Consolidar os briefings operacionais antes de conectar IA,
                  historico e persistencia.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-gray-300">
                  O schema Prisma ja sugere usuarios, chats, mensagens e
                  imagens geradas. Nesta etapa, a interface foi evoluida para
                  refletir esses fluxos de forma navegavel e pronta para a
                  proxima integracao.
                </p>
              </div>
              <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  Estado do produto
                </p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-gray-400">Interface base</span>
                    <span className="text-sm font-semibold text-[#8fd3a9]">
                      Estruturada
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-gray-400">Rotas principais</span>
                    <span className="text-sm font-semibold text-[#8fd3a9]">
                      Criadas
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-gray-400">Persistencia real</span>
                    <span className="text-sm font-semibold text-[#f0c77b]">
                      Proxima iteracao
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-gray-400">IA generativa</span>
                    <span className="text-sm font-semibold text-[#f0c77b]">
                      A conectar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {dashboardMetrics.map((metric) => (
              <article key={metric.label} className="glass-panel px-5 py-5">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-4xl font-semibold text-[var(--accent-gold)]">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {metric.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="glass-panel px-6 py-6">
            <div className="flex items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                  Modulos principais
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Fluxos ativos no estagio atual
                </h2>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {workflows.map((workflow) => (
                <Link
                  key={workflow.slug}
                  href={workflow.href}
                  className="group rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 transition hover:border-[rgba(207,170,107,0.22)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                      {workflow.category}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                      {workflow.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white transition group-hover:text-[var(--accent-gold)]">
                    {workflow.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    {workflow.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4 text-sm">
                    <span className="text-gray-400">{workflow.estimatedTime}</span>
                    <span className="font-medium text-white">
                      Abrir modulo
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass-panel px-6 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
              Pilares de compliance
            </p>
            <div className="mt-5 space-y-3">
              {compliancePillars.map((pillar) => (
                <div
                  key={pillar}
                  className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-sm leading-6 text-gray-200"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel px-6 py-6">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
              Mapa tecnico
            </p>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <p className="text-sm font-semibold text-white">
                  `User`, `Chat` e `Message`
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  O schema ja define a espinha dorsal para historico de
                  conversas e rastreio por funcao.
                </p>
              </div>
              <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <p className="text-sm font-semibold text-white">
                  `GeneratedImage`
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Ha espaco claro para conectar motores diferentes e comparar
                  saidas 1:1 na mesma sessao.
                </p>
              </div>
              <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                <p className="text-sm font-semibold text-white">
                  Proximo encaixe natural
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Criar `lib/prisma`, seed inicial e actions para gravar
                  briefings, mensagens e resultados por modulo.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
