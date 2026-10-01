"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Principle } from "@/lib/content";

/**
 * Section view: the stack cut open, one layer at a time. Each stratum is a
 * tab; the panel states that layer's rule and the shipped work that proves
 * it. Strata are drawn at increasing indent so the list reads as a cross
 * section, top of the stack to the tools underneath.
 *
 * Motion: panel content crossfades with a 2px blur (200ms) on pointer
 * selection only. Arrow-key navigation switches instantly: keyboard actions
 * repeat, and repetition should not wait on animation.
 */
export function SectionView({
  principles,
  hrefs,
}: {
  principles: Principle[];
  hrefs: Record<string, { href: string; name: string }>;
}) {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = principles[active];
  const proof = hrefs[p.evidence.slug];

  function select(i: number, viaKeyboard: boolean) {
    setAnimate(!viaKeyboard);
    setActive(i);
    if (viaKeyboard) tabs.current[i]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const n = principles.length;
    const map: Record<string, number> = {
      ArrowDown: (active + 1) % n,
      ArrowRight: (active + 1) % n,
      ArrowUp: (active - 1 + n) % n,
      ArrowLeft: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8" data-sheet="SectionView: tablist, arrow keys">
      <div
        role="tablist"
        aria-label="Engineering layers"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-[var(--spacing-gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--spacing-gutter)] pb-1 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {principles.map((pr, i) => {
          const on = i === active;
          return (
            <button
              key={pr.layer}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`layer-tab-${i}`}
              aria-selected={on}
              aria-controls="layer-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => select(i, false)}
              style={{ "--indent": `${i * 14}px` } as React.CSSProperties}
              className={cn(
                "group/tab relative shrink-0 snap-start text-left transition-colors duration-[160ms]",
                "rounded-[var(--radius-md)] border px-3.5 py-2 text-[14px] lg:rounded-none lg:border-0 lg:border-t lg:py-3.5 lg:pl-[calc(var(--indent)+0.25rem)] lg:pr-2 lg:text-[15px]",
                on
                  ? "border-ink bg-ink text-background lg:border-t-ink lg:bg-transparent lg:text-ink"
                  : "border-hairline-strong text-secondary hover:text-ink lg:border-t-hairline-strong",
              )}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-[2px] w-4 origin-left bg-accent transition-transform duration-[280ms] ease-[var(--ease-out-soft)] lg:block",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  {pr.layer}
                </span>
                <span aria-hidden className={cn("meta hidden lg:inline", on ? "text-ink" : "")}>
                  {pr.rule}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="layer-panel"
        role="tabpanel"
        aria-labelledby={`layer-tab-${active}`}
        tabIndex={0}
        className="lg:col-span-6 lg:col-start-7"
      >
        <div
          key={active}
          className={cn(
            animate &&
              "swap-in",
          )}
        >
          <p className="text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink">
            {p.rule}
          </p>
          <p className="mt-5 max-w-[52ch] text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] text-secondary">
            {p.body}
          </p>
          <figure className="mt-8 border-t border-hairline-strong pt-4">
            <p className="meta mb-2">In shipped work</p>
            <blockquote className="max-w-[52ch] text-[15px] leading-relaxed text-ink">
              {p.evidence.text}
            </blockquote>
            {proof && (
              <figcaption className="mt-3">
                <Link href={proof.href} className="link-accent meta text-ink">
                  See {proof.name}
                </Link>
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </div>
  );
}
