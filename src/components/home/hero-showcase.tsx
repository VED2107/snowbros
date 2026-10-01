"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

export type ShowcaseItem = {
  slug: string;
  name: string;
  href: string;
  outcome: string;
  meta: string;
  caption: string;
  media: { src: string; alt: string; width: number; height: number; tone: "light" | "night" };
  /** Optional second screen, stacked under the first on dark plates. */
  second?: { src: string; alt: string; width: number; height: number };
};

/**
 * Hero showcase: one stage, one index.
 *
 * The stage is the drafting mat holding a single screenshot, large enough to
 * read. The index lists shipped systems; pointing at or focusing a row puts
 * that system on the stage, clicking opens its case study.
 *
 * Motion: the stage crossfades (opacity + 2px blur, 240ms ease-out) because
 * it is a state change in one place; blur bridges the two screenshots so
 * they never double-expose. The active row's rule draws in (scaleX, 280ms).
 * No autoplay: the visitor decides what is on the table.
 */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-8" data-sheet="HeroShowcase: stage + index">
      {/* Stage */}
      <div className="lg:col-span-8">
        <Link href={current.href} className="table-mat group/stage block p-4 pt-8 sm:p-6 sm:pt-10" aria-label={`Open ${current.name} case study`}>
          <span className="table-ruler" aria-hidden />
          <span className="relative block aspect-[16/10] overflow-hidden border border-ink/60 bg-surface shadow-[0_18px_40px_-26px_rgba(22,21,19,0.45)]">
            {items.map((it, i) => {
              const on = i === active;
              const fade = cn(
                "transition-[opacity,filter] duration-[240ms] ease-out motion-reduce:transition-none",
                on ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-[2px]",
              );
              if (it.second) {
                return (
                  <span key={it.slug} className={cn("absolute inset-0 flex flex-col justify-center gap-3 bg-night p-5", fade)}>
                    {[it.media, it.second].map((m) => (
                      <Image
                        key={m.src}
                        src={m.src}
                        alt={on ? m.alt : ""}
                        width={m.width}
                        height={m.height}
                        sizes="(min-width: 1240px) 720px, 100vw"
                        className="block h-auto w-full rounded-[3px] border border-white/10"
                      />
                    ))}
                  </span>
                );
              }
              return (
                <Image
                  key={it.slug}
                  src={it.media.src}
                  alt={on ? it.media.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1240px) 760px, 100vw"
                  className={cn("object-cover object-top", it.media.tone === "night" && "bg-night", fade)}
                />
              );
            })}
          </span>
          <span className="mt-3 flex items-center justify-between gap-4 text-[13px]">
            <span key={current.slug} className="swap-in text-secondary">
              {current.caption}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-ink transition-colors duration-[160ms] group-hover/stage:text-accent">
              Open case
              <Icon name="arrow-right" className="text-[14px] transition-transform duration-[160ms] group-hover/stage:translate-x-0.5" />
            </span>
          </span>
        </Link>
      </div>

      {/* Index */}
      <nav aria-label="Shipped systems" className="lg:col-span-4">
        <ul className="border-t border-ink">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.slug} className="border-b border-hairline-strong">
                <Link
                  href={it.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={on ? "true" : undefined}
                  className="group/row block py-4"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "h-[2px] w-4 origin-left bg-accent transition-transform duration-[280ms] ease-[var(--ease-out-soft)]",
                          on ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                      <span
                        className={cn(
                          "text-[17px] font-medium tracking-[-0.015em] transition-colors duration-[160ms]",
                          on ? "text-ink" : "text-secondary group-hover/row:text-ink",
                        )}
                      >
                        {it.name}
                      </span>
                    </span>
                    <span className="meta shrink-0">{it.meta}</span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 block pl-7 text-[14px] leading-snug transition-colors duration-[160ms]",
                      on ? "text-secondary" : "text-muted",
                    )}
                  >
                    {it.outcome}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/work"
          className="group/all mt-4 inline-flex items-center gap-1.5 text-[14px] text-ink underline decoration-hairline-strong underline-offset-[6px] transition-[text-decoration-color] duration-[160ms] hover:decoration-accent"
        >
          All work
          <Icon name="arrow-right" className="text-[14px] text-accent transition-transform duration-[160ms] group-hover/all:translate-x-0.5" />
        </Link>
      </nav>
    </div>
  );
}
