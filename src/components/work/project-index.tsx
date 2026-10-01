"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SnowNode } from "@/components/ui/wordmark";
import { Icon } from "@/components/ui/icon";

export type IndexItem = {
  slug: string;
  name: string;
  href: string;
  category: string;
  year: string;
  status: string;
  summary: string;
  external?: boolean;
  media?: { src: string; alt: string; width: number; height: number };
};

/**
 * The index: smaller and experimental work as rows. On wide screens a
 * preview pane follows the row under the pointer or keyboard focus, so you
 * can scan without leaving the list. It crossfades (opacity + 2px blur,
 * 200ms) because the swap is a state change in the same place; the pane
 * itself never moves.
 */
export function ProjectIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8" data-sheet="ProjectIndex: hover or focus previews">
      <ul className="lg:col-span-7">
        {items.map((it, i) => (
          <li key={it.slug} className="border-b border-hairline-strong first:border-t first:border-t-ink">
            <Link
              href={it.href}
              {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group/row grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]"
            >
              <span className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className={cn(
                    "hidden w-3 text-accent transition-opacity duration-[160ms] lg:inline",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Icon name="arrow-right" className="text-[15px]" />
                </span>
                <span className="text-[length:var(--text-xl)] leading-tight tracking-[-0.025em] text-ink transition-colors duration-[160ms] group-hover/row:text-accent">
                  {it.name}
                </span>
              </span>
              <span className="meta hidden sm:block">{it.category}</span>
              <span className="meta text-right">{it.year}</span>
              <span className="col-span-full text-[14px] leading-relaxed text-secondary lg:hidden">
                {it.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:col-span-5 lg:block" aria-hidden>
        <div className="sticky top-24">
          <div className="frame relative aspect-[4/3]">
            {items.map((it, i) =>
              it.media ? (
                <Image
                  key={it.slug}
                  src={it.media.src}
                  alt=""
                  fill
                  sizes="480px"
                  className={cn(
                    "object-cover object-top transition-[opacity,filter] duration-200 ease-out",
                    i === active ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
                  )}
                />
              ) : (
                <div
                  key={it.slug}
                  className={cn(
                    "absolute inset-0 grid place-items-center bg-elevated transition-[opacity,filter] duration-200 ease-out",
                    i === active ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
                  )}
                >
                  <SnowNode className="h-16 w-16 text-ink/70" />
                </div>
              ),
            )}
          </div>
          <p className="mt-4 max-w-[46ch] text-[14px] leading-relaxed text-secondary">{current.summary}</p>
          <p className="meta mt-2">{current.status}</p>
        </div>
      </div>
    </div>
  );
}
