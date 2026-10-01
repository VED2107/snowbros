"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Blueprint mode: the page shows its own working drawing.
 *
 * Press B (or the toggle) and every sheet-level component is outlined and
 * labelled with its name, headings and buttons are annotated with their real
 * computed type size and line height, and the 12-column grid is overlaid.
 *
 * No animation, on or off: it is a keyboard toggle a curious reader may flip
 * repeatedly, and the point is instant comparison.
 */
const KEY = "snowbros-blueprint";

function annotate(on: boolean) {
  const els = document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, footer h2");
  els.forEach((el) => {
    if (!on) {
      el.removeAttribute("data-spec");
      return;
    }
    const cs = getComputedStyle(el);
    const size = Math.round(parseFloat(cs.fontSize));
    const lh = (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2);
    const track = (parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize) || 0).toFixed(3);
    el.setAttribute("data-spec", `${el.tagName.toLowerCase()} ${size}px / ${lh} / ${track}em, ${cs.fontWeight}`);
  });
}

export function BlueprintToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);

  const apply = useCallback((next: boolean) => {
    setOn(next);
    document.documentElement.toggleAttribute("data-blueprint", next);
    annotate(next);
    try {
      sessionStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      /* storage unavailable: the toggle still works for this page */
    }
  }, []);

  useEffect(() => {
    let saved = false;
    try {
      saved = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (saved) {
      const id = requestAnimationFrame(() => apply(true));
      return () => cancelAnimationFrame(id);
    }
  }, [apply]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "b" && e.key !== "B") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      apply(!document.documentElement.hasAttribute("data-blueprint"));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [apply]);

  return (
    <>
      <button
        type="button"
        aria-pressed={on}
        onClick={() => apply(!on)}
        title="Show the drawing (B)"
        className={cn(
          "group/bp inline-flex h-9 items-center gap-2 rounded-[var(--radius-md)] border px-2.5 text-[13px] transition-[background-color,color,border-color,transform] duration-[160ms] ease-[var(--ease-out-soft)] active:scale-[0.97]",
          on ? "border-accent bg-accent text-[#fbf9f5]" : "border-hairline-strong text-secondary hover:border-ink hover:text-ink",
          className,
        )}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
          <rect x="1.5" y="1.5" width="13" height="13" />
          <path d="M5.5 1.5v13M10.5 1.5v13M1.5 8h13" />
        </svg>
        Blueprint
        <kbd className={cn("rounded-[3px] border px-1 font-mono text-[10px] leading-4", on ? "border-white/40" : "border-hairline-strong")}>B</kbd>
      </button>
      {on && <BlueprintGrid />}
    </>
  );
}

function BlueprintGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div className="mx-auto grid h-full max-w-[1240px] grid-cols-4 gap-4 px-[var(--spacing-gutter)] md:grid-cols-12 md:gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={cn("h-full bg-accent/[0.06] outline outline-1 outline-accent/25", i >= 4 && "max-md:hidden")} />
        ))}
      </div>
      <p className="fixed bottom-3 left-3 rounded-[3px] bg-accent px-2 py-1 font-mono text-[11px] text-[#fbf9f5]">
        Blueprint: 12 columns, 1240px sheet, gutter clamp(16px, 4vw, 48px). Press B to close.
      </p>
    </div>
  );
}
