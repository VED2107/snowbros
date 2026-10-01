"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/*
  Atlas hero specimen: the README's sample run, as live text, with the
  finding's import chain drawn underneath as an evidence path.

  "Run again" is the product's thesis made touchable: the second run reads
  the cache (512 reused, 0 parsed) and the findings do not change. The new
  output lands with a 200ms opacity + 2px blur swap (a state change in place,
  not a performance), and the stamp confirms what stayed identical.
*/

const chain = [
  { file: "src/components/Dashboard.tsx", note: '"use client"' },
  { file: "src/lib/metrics.ts", note: "imported by Dashboard" },
  { file: "src/lib/db.ts", note: 'imports "server-only"', hit: true },
];

export function AtlasProof() {
  const [run, setRun] = useState(1);
  const warm = run > 1;

  return (
    <figure className="flex flex-col gap-0" data-sheet="AtlasProof: README sample, re-runnable">
      <div className="frame-night">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <span className="font-mono text-[12px] text-[#a7a196]">
            <span className="text-accent">$ </span>sb analyze
          </span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex h-8 items-center gap-2 rounded-[var(--radius-md)] border border-white/20 px-2.5 font-mono text-[12px] text-[#e9e4da] transition-[background-color,border-color,transform] duration-[160ms] ease-[var(--ease-out-soft)] hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
          >
            <Icon name="bolt" className="text-[13px] text-accent" />
            Run again
          </button>
        </div>

        <pre
          key={run}
          aria-live="polite"
          className={cn(
            "overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.65] text-[#d8d2c6] [scrollbar-width:thin]",
            run > 1 && "swap-in",
          )}
        >
          <span className="text-[#f7f4ee]">Snowbros Atlas</span> analyze{"  "}
          <span className="text-[#8b857a]">run {run}</span>
          {"\n"}  root: /work/acme-web
          {"\n"}  files scanned: 512
          {"\n"}  cache:{" "}
          <span className={warm ? "text-[#f7f4ee]" : undefined}>
            {warm ? "512 reused, 0 parsed" : "0 reused, 512 parsed"}
          </span>
          {"\n"}  frameworks: Next.js 15.1.0, React 19.0.0
          {"\n\n"}
          <span className="text-[#ff8a65]">HIGH</span> Server-only module imported by a client component
          {"\n"}  <span className="text-[#8b857a]">[next/server-only-in-client]</span>
          {"\n"}  at src/components/Dashboard.tsx, confidence: certain
          {"\n\n"}
          <span className="text-[#ff8a65]">x</span> 1 finding: 1 High
          {"\n"}health: 92/100 (security 100, architecture 85)
        </pre>
      </div>

      {/* Evidence chain */}
      <div className="border border-t-0 border-ink/80 bg-surface px-4 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium text-ink">Evidence chain</p>
          <p
            key={`stamp-${run}`}
            className={cn("text-[12px] text-secondary", warm && "swap-in text-ink")}
          >
            {warm ? `Run ${run}: findings identical to run 1` : "Same input, same output"}
          </p>
        </div>
        <ol className="mt-3">
          {chain.map((c, i) => (
            <li key={c.file} className="relative flex items-start gap-3 pb-3 last:pb-0">
              {i < chain.length - 1 && (
                <span aria-hidden className="absolute left-[5px] top-[14px] h-[calc(100%-6px)] w-px bg-ink/60" />
              )}
              <span
                aria-hidden
                className={cn(
                  "relative mt-[5px] h-[11px] w-[11px] shrink-0 rounded-full border",
                  c.hit ? "border-accent bg-accent" : "border-ink bg-surface",
                )}
              />
              <span className="flex min-w-0 flex-wrap items-baseline gap-x-3">
                <code className={cn("font-mono text-[12.5px]", c.hit ? "text-accent" : "text-ink")}>{c.file}</code>
                <span className="text-[12px] text-muted">{c.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-2 text-[12px] text-muted">
        Sample run from the Atlas README. The second run reads the cache; the findings do not move.{" "}
        <a href="/work/snowbros-website#inspection" className="link-accent text-ink">
          We also run it on this website: 94/100
        </a>
        .
      </figcaption>
    </figure>
  );
}

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked: the command stays selectable */
        }
      }}
      className="group/copy inline-flex h-12 items-stretch overflow-hidden rounded-[var(--radius-md)] border border-ink bg-ink font-mono text-[13px] text-background transition-transform duration-[160ms] ease-[var(--ease-out-soft)] active:scale-[0.97]"
      aria-label={copied ? "Copied" : `Copy command: ${command}`}
    >
      <span className="flex items-center px-4 select-all">
        <span className="text-accent">$&nbsp;</span>
        {command}
      </span>
      <span className="grid w-20 place-items-center border-l border-white/15 text-[12px] text-[#b9b3a7] transition-colors group-hover/copy:text-background">
        <span key={copied ? "y" : "n"} className="swap-in">
          {copied ? "Copied" : "Copy"}
        </span>
      </span>
    </button>
  );
}
