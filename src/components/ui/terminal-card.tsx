"use client";

import { useEffect, useRef, useState } from "react";

/*
  Authentic engineering terminal — a build-and-deploy session an engineer would
  actually have open. Tabbed chrome, window controls, streaming output with grey
  timestamps, a filling progress bar, green success lines, and a blinking
  cursor. Lines reveal in sequence; reduced motion shows the finished session.
*/

type Line =
  | { t: "cmd"; text: string; branch?: string }
  | { t: "out"; text: string; ok?: boolean; dim?: boolean }
  | { t: "done"; text: string };

const SESSION: Line[] = [
  { t: "cmd", text: "pnpm build", branch: "main" },
  { t: "out", text: "▲ Next.js 16.2.9 · turbopack", dim: true },
  { t: "out", text: "Compiled successfully in 4.2s", ok: true },
  { t: "out", text: "Types checked · 0 errors", ok: true },
  { t: "out", text: "Collecting page data (24/24)", ok: true },
  { t: "cmd", text: "git push origin main", branch: "main" },
  { t: "out", text: "→ github.com/VED2107 · 3 objects", dim: true },
  { t: "cmd", text: "gh workflow run deploy.yml" },
  { t: "out", text: "ci · test (214 passed)", ok: true },
  { t: "out", text: "ci · lighthouse 100 / 100", ok: true },
  { t: "out", text: "edge · pushed to 34 PoPs", ok: true },
  { t: "out", text: "cache · purged · snowbros.me", ok: true },
  { t: "done", text: "Deployed · snowbros.me · 2.4s" },
];

function stamp(i: number) {
  const base = 24 * 60 + 1 + i * 3; // 10:24:01 + i*3s
  const h = Math.floor(base / 60) % 24;
  const m = base % 60;
  return `10:${String(h).padStart(2, "0").slice(-2)}:${String(m).padStart(2, "0")}`;
}

export function TerminalCard() {
  const [shown, setShown] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(SESSION.length);
      return;
    }
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setInterval(() => {
          setShown((n) => {
            if (n >= SESSION.length) {
              if (timer) clearInterval(timer);
              return n;
            }
            return n + 1;
          });
        }, 380);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  const pct = Math.min(Math.round((shown / SESSION.length) * 100), 100);
  const done = shown >= SESSION.length;

  return (
    <div className="relative" ref={ref}>
      {/* Offset plate behind — depth without a heavy shadow */}
      <div
        aria-hidden
        className="absolute -right-4 -top-4 h-full w-full rounded-[var(--radius-lg)] border border-hairline bg-surface/70"
      />

      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.08] bg-[#0d1310] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_2px_6px_rgba(23,23,23,0.14),0_56px_110px_-48px_rgba(23,23,23,0.7)] ring-1 ring-white/[0.04]">
        {/* Glass reflection — soft top-left sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,0.06),transparent_45%)]"
        />
        {/* Window controls + traffic lights */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.015] px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
          </span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-[#7fd0b8]">
            <span className="status-dot scale-[0.6]" />
            snowbros — deploy
          </span>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 pt-1.5">
          {[
            { label: "deploy.sh", active: true },
            { label: "ci.yml", active: false },
            { label: "Dockerfile", active: false },
          ].map((tab) => (
            <span
              key={tab.label}
              className={
                "rounded-t-md px-3 py-1.5 font-mono text-[11px] " +
                (tab.active
                  ? "bg-white/[0.05] text-white/80"
                  : "text-white/35")
              }
            >
              {tab.label}
            </span>
          ))}
          <span className="ml-auto pr-2 font-mono text-[11px] text-white/25">
            zsh · ⌘1
          </span>
        </div>

        {/* Streaming session */}
        <div className="min-h-[236px] space-y-1 px-4 py-4 font-mono text-[12.5px] leading-relaxed">
          {SESSION.slice(0, shown).map((l, i) => {
            const isLast = i === shown - 1;
            if (l.t === "cmd") {
              return (
                <div
                  key={i}
                  className="flex items-baseline gap-2 pt-1.5 animate-in fade-in slide-in-from-bottom-1 duration-200"
                >
                  <span className="text-white/25">{stamp(i)}</span>
                  <span className="text-[#7fd0b8]">
                    ~/snowbros
                    {l.branch && (
                      <span className="text-white/30"> ({l.branch})</span>
                    )}
                    <span className="text-white/40"> $</span>
                  </span>
                  <span className="text-white/90">{l.text}</span>
                  {isLast && !done && (
                    <span className="inline-block h-3.5 w-[7px] animate-pulse bg-[#7fd0b8]" />
                  )}
                </div>
              );
            }
            if (l.t === "done") {
              return (
                <div
                  key={i}
                  className="mt-2 flex items-center justify-between rounded-md border border-[#2f5648] bg-[#14231e] px-3 py-2.5 animate-in fade-in zoom-in-95 duration-500"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="status-dot" />
                    <span className="text-[13px] font-medium text-[#8fd8c0]">
                      {l.text}
                    </span>
                  </span>
                  <span className="text-[11px] text-white/40">✓ live</span>
                </div>
              );
            }
            return (
              <div
                key={i}
                className="flex items-baseline gap-2 pl-[3.4rem] animate-in fade-in slide-in-from-bottom-1 duration-200"
              >
                <span className={l.ok ? "text-[#8fd8c0]" : "text-white/30"}>
                  {l.ok ? "✓" : "›"}
                </span>
                <span className={l.dim ? "text-white/40" : "text-white/70"}>
                  {l.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress + status foot */}
        <div className="border-t border-white/[0.06] px-4 py-3">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-white/45">
              {done ? "pipeline complete" : "running pipeline…"}
            </span>
            <span className="tabular-nums text-[#8fd8c0]">{pct}%</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3f7d6a] to-[#8fd8c0] transition-[width] duration-500 ease-[var(--ease-out-soft)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
