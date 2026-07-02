import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";

/**
 * Engineering-module service card. Reads like a product/dashboard panel:
 *   status header → title + brief → capability checklist → tech-stack chips →
 *   a metric footer with a directed CTA. Clear typographic hierarchy and
 *   internal dividers give it structure a plain bordered box never has.
 */
export function ServiceCard({
  index,
  href,
  icon,
  title,
  summary,
  capabilities,
  stack,
  metric,
}: {
  index: number;
  href: string;
  icon: IconName;
  title: string;
  summary: string;
  capabilities: string[];
  stack: string[];
  metric: { value: string; label: string };
}) {
  return (
    <Link
      href={href}
      className="card-engineered card-glow group/card flex h-full flex-col p-7 md:p-8"
    >
      {/* status header */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="flex items-center gap-2 text-accent">
          <span className="status-dot scale-75" />
          Ready
        </span>
        <span className="text-muted">{String(index).padStart(2, "0")}</span>
      </div>

      {/* title block */}
      <div className="mt-6 flex items-center gap-3.5">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-accent-weak text-accent ring-1 ring-inset ring-[rgba(36,66,58,0.14)] transition-colors duration-500 group-hover/card:bg-primary group-hover/card:text-primary-foreground">
          <Icon name={icon} className="text-[20px]" />
        </span>
        <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em]">
          {title}
        </h3>
      </div>

      <p className="mt-3 text-[15px] leading-relaxed text-secondary">
        {summary}
      </p>

      {/* capability checklist */}
      <ul className="mt-6 flex flex-col gap-2 border-t border-hairline pt-6 text-sm text-ink">
        {capabilities.map((c) => (
          <li key={c} className="flex items-center gap-2.5">
            <Icon name="check" className="text-[15px] text-accent" />
            {c}
          </li>
        ))}
      </ul>

      {/* tech-stack chips */}
      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-hairline pt-6">
        {stack.map((t) => (
          <span
            key={t}
            className="rounded-md border border-hairline bg-background px-2 py-1 font-mono text-[11px] text-secondary"
          >
            {t}
          </span>
        ))}
      </div>

      {/* metric + CTA footer */}
      <div className="mt-auto flex items-end justify-between gap-4 border-t border-hairline pt-6">
        <div>
          <p className="font-mono text-xl font-medium tabular-nums text-ink">
            {metric.value}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            {metric.label}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          View
          <Icon
            name="arrow-right"
            className="text-[15px] transition-transform duration-300 group-hover/card:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
