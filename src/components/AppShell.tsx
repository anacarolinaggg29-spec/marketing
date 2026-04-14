import Link from "next/link";

type AppShellProps = {
  badge: string;
  category: string;
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }[];
};

export default function AppShell({
  badge,
  category,
  title,
  description,
  children,
  actions = [],
}: AppShellProps) {
  return (
    <section className="relative min-h-full overflow-hidden px-6 py-8 md:px-10 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,170,107,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(112,145,255,0.08),transparent_24%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="glass-panel relative overflow-hidden px-6 py-6 md:px-8">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(207,170,107,0.55),transparent)]" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-gray-400">
                <span className="rounded-full border border-[rgba(207,170,107,0.24)] bg-[rgba(207,170,107,0.08)] px-3 py-1 text-[var(--accent-gold)]">
                  {badge}
                </span>
                <span>{category}</span>
              </div>
              <div className="space-y-2">
                <h1 className="font-serif text-3xl text-white md:text-5xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                  {description}
                </p>
              </div>
            </div>
            {actions.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={
                      action.variant === "secondary"
                        ? "rounded-full border border-[rgba(255,255,255,0.12)] px-4 py-2 text-sm text-gray-200 transition hover:border-[rgba(207,170,107,0.35)] hover:text-white"
                        : "rounded-full bg-[var(--accent-gold)] px-4 py-2 text-sm font-semibold text-[#17130c] transition hover:bg-[var(--accent-gold-hover)]"
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
