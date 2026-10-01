import Link from "next/link";
import { siteAudit } from "@/lib/content";

/**
 * The site's own inspection certificate: Atlas, run on this repository.
 * Scores are drawn as plain ruled bars without a filled track (the length
 * is the information), sorted high to low.
 */
export function SelfAudit() {
  const a = siteAudit;
  return (
    <div data-sheet="SelfAudit: real sb analyze output" className="border border-ink bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink px-5 py-3">
        <p className="text-[14px] font-medium text-ink">
          <code className="font-mono text-[13px]">
            <span className="text-accent">$ </span>sb analyze
          </code>{" "}
          on this website
        </p>
        <p className="meta">
          {a.engine}, {a.date}
        </p>
      </div>

      <div className="grid gap-8 px-5 py-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="meta">Health</p>
          <p className="mt-1 text-[length:var(--text-5xl)] font-medium leading-none tracking-[-0.045em] text-ink tabular-nums">
            {a.overall}
            <span className="text-[0.32em] tracking-normal text-muted">/100</span>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-y-2 text-[13px]">
            <dt className="meta">High severity</dt>
            <dd className="font-mono text-ink">{a.high}</dd>
            <dt className="meta">Low</dt>
            <dd className="font-mono text-ink">{a.low}</dd>
            <dt className="meta">Files</dt>
            <dd className="font-mono text-ink">{a.filesScanned}</dd>
            <dt className="meta">Cold run</dt>
            <dd className="font-mono text-ink">~{a.coldMs} ms</dd>
          </dl>
        </div>

        <ul className="flex flex-col gap-2.5 md:col-span-8">
          {a.categories.map((c) => (
            <li key={c.name} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3">
              <span className="text-[13px] text-secondary">{c.name}</span>
              <span className="relative h-3">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 border-y border-r border-ink"
                  style={{ width: `${c.score}%`, background: c.score === 100 ? "var(--color-ink)" : "transparent" }}
                />
              </span>
              <span className="text-right font-mono text-[13px] tabular-nums text-ink">{c.score}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-hairline-strong px-5 py-5">
        <p className="text-[14px] text-ink">{a.fixed}</p>
        <p className="meta mt-4">What remains, and why</p>
        <ul className="mt-2 flex flex-col gap-2">
          {a.remaining.map((r) => (
            <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-secondary">
              <span aria-hidden className="mt-[10px] h-px w-3 shrink-0 bg-accent" />
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13px] text-muted">
          Recorded from the real JSON output. <Link href="/atlas" className="link-accent">What Atlas checks</Link>
        </p>
      </div>
    </div>
  );
}
