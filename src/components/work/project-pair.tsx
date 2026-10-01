import Image from "next/image";
import Link from "next/link";
import { RevealGroup } from "@/components/motion/reveal";
import { type Project, projectHref } from "@/lib/content";

/**
 * Two feature projects side by side. Screenshot first, then a compact spec:
 * name, one-line summary, and the three technologies that mattered most.
 * Offset vertically on desktop so the pair reads as two sheets on a table,
 * not as a card row.
 */
export function ProjectPair({ items }: { items: Project[] }) {
  return (
    <RevealGroup className="grid gap-14 md:grid-cols-2 md:gap-8" data-sheet="ProjectPair: offset 96px">
      {items.map((p, i) => (
        <article key={p.slug} className={i % 2 === 1 ? "md:mt-24" : undefined}>
          <Link href={projectHref(p)} className="group/pair block">
            <div className="frame">
              <Image
                src={p.media[0].src}
                alt={p.media[0].alt}
                width={p.media[0].width}
                height={p.media[0].height}
                sizes="(min-width: 768px) 560px, 100vw"
                className="block h-auto w-full transition-transform duration-[700ms] ease-[var(--ease-out-soft)] group-hover/pair:scale-[1.015] motion-reduce:transform-none"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-ink pt-4">
              <h3 className="text-[length:var(--text-xl)] leading-[var(--text-xl--line-height)] tracking-[-0.025em] text-ink transition-colors duration-[160ms] group-hover/pair:text-accent">
                {p.client}
              </h3>
              <p className="meta shrink-0">
                {p.category} / {p.year}
              </p>
            </div>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-secondary">{p.summary}</p>
            <p className="meta mt-4">{p.technologies.slice(0, 4).join(", ")}</p>
          </Link>
        </article>
      ))}
    </RevealGroup>
  );
}

