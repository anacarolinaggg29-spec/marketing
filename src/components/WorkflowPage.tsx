import AppShell from "@/components/AppShell";
import type { WorkflowDefinition } from "@/lib/studio-data";

type WorkflowPageProps = {
  workflow: WorkflowDefinition;
};

export default function WorkflowPage({ workflow }: WorkflowPageProps) {
  return (
    <AppShell
      badge={workflow.badge}
      category={workflow.category}
      title={workflow.title}
      description={workflow.description}
      actions={[
        { label: workflow.primaryAction, href: "#briefing" },
        {
          label: workflow.secondaryAction,
          href: "#historico",
          variant: "secondary",
        },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-6">
          <section className="glass-panel grid gap-5 px-6 py-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                Situacao atual
              </p>
              <div>
                <p className="text-2xl font-semibold text-white">
                  {workflow.status}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-7 text-gray-300">
                  {workflow.heroNote}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Tempo medio
                </p>
                <p className="mt-2 text-3xl font-semibold text-[var(--accent-gold)]">
                  {workflow.estimatedTime}
                </p>
              </div>
              <div className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Entregaveis
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {workflow.deliverables.length}
                </p>
              </div>
            </div>
          </section>

          <section id="briefing" className="glass-panel px-6 py-6">
            <div className="flex flex-col gap-2 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                Briefing base
              </p>
              <h2 className="text-2xl font-semibold text-white">
                O que precisa entrar no pedido
              </h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {workflow.briefingFields.map((field) => (
                <div
                  key={field}
                  className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-sm leading-6 text-gray-200"
                >
                  {field}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel px-6 py-6">
            <div className="flex flex-col gap-2 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                Entrega esperada
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Resultado padrao do fluxo
              </h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {workflow.deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-[rgba(207,170,107,0.16)] bg-[rgba(207,170,107,0.06)] px-4 py-4 text-sm font-medium text-[#f6e7cb]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass-panel px-6 py-6">
            <div className="flex flex-col gap-2 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                Compliance
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Checklist de aprovacao
              </h2>
            </div>
            <div className="mt-5 space-y-3">
              {workflow.checklist.map((item, index) => (
                <div
                  key={item}
                  className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)]">
                    Etapa {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-200">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="historico" className="glass-panel px-6 py-6">
            <div className="flex flex-col gap-2 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                Historico recente
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Ultimas sessoes
              </h2>
            </div>
            <div className="mt-5 space-y-3">
              {workflow.recentItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-300">
                        {item.detail}
                      </p>
                    </div>
                    <span className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      {item.updatedAt}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
