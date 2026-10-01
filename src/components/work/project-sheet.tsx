import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { TitleBlock, type TitleBlockRow } from "@/components/sheet/title-block";
import { type Project, projectHref } from "@/lib/content";

/* Engineering decisions as a quiet list: title, then the reason. */
export function DrawingNotes({
  decisions,
  limit,
  className,
}: {
  decisions: Project["decisions"];
  limit?: number;
  className?: string;
}) {
  const list = limit ? decisions.slice(0, limit) : decisions;
  return (
    <ul className={cn("grid gap-x-8 gap-y-6 sm:grid-cols-2", className)}>
      {list.map((d) => (
        <li key={d.title} className="border-t border-hairline-strong pt-4">
          <h4 className="text-[15px] font-medium leading-snug text-ink">{d.title}</h4>
          <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">{d.why}</p>
        </li>
      ))}
    </ul>
  );
}

export function projectRows(p: Project): TitleBlockRow[] {
  return [
    { label: "Status", value: p.version ? `${p.status}, ${p.version}` : p.status },
    { label: "Year", value: p.year },
    { label: "Role", value: p.role, wide: true },
    { label: "Stack", value: p.technologies.slice(0, 6).join(", "), wide: true },
  ];
}

/** Screenshot(s) in a frame of fixed proportion, so every sheet sits at the same scale. */
function Media({ p, priority }: { p: Project; priority?: boolean }) {
  const [a, b] = p.media;
  if (!a) return null;
  const night = a.tone === "night";

  if (night && b) {
    return (
      <div className="frame-night flex aspect-[16/11] flex-col justify-center gap-3 p-4 sm:p-6">
        {[a, b].map((m) => (
          <Image
            key={m.src}
            src={m.src}
            alt={m.alt}
            width={m.width}
            height={m.height}
            sizes="(min-width: 1240px) 620px, 100vw"
            priority={priority}
            className="block h-auto w-full rounded-[3px] border border-white/10"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[16/11] overflow-hidden", night ? "frame-night" : "frame")}>
      <Image
        src={a.src}
        alt={a.alt}
        fill
        sizes="(min-width: 1240px) 660px, 100vw"
        priority={priority}
        className="object-cover object-top transition-transform duration-[700ms] ease-[var(--ease-out-soft)] group-hover/sheet:scale-[1.015] motion-reduce:transform-none"
      />
    </div>
  );
}

/**
 * A lead project: screenshot on one side (7 of 12 columns), the story on the
 * other. Sides alternate so consecutive sheets do not repeat. "plate" and
 * "split" put the media on the right.
 */
export function ProjectSheet({
  p,
  layout,
  priority,
}: {
  p: Project;
  layout: "full" | "plate" | "split";
  priority?: boolean;
}) {
  const href = projectHref(p);
  const mediaRight = layout !== "full";

  return (
    <article
      className="group/sheet grid items-start gap-8 lg:grid-cols-12 lg:gap-12"
      data-sheet={`ProjectSheet: media ${mediaRight ? "right" : "left"}`}
    >
      <Reveal className={cn("lg:col-span-7", mediaRight && "lg:order-2")}>
        <Link href={href} tabIndex={-1} className="block">
          <Media p={p} priority={priority} />
        </Link>
      </Reveal>

      <div className={cn("lg:col-span-5", mediaRight && "lg:order-1")}>
        <p className="meta">
          {p.category}, {p.year}
        </p>
        <h3 className="mt-2 text-[length:var(--text-2xl)] leading-[var(--text-2xl--line-height)] tracking-[-0.03em] text-ink">
          <Link href={href} className="transition-colors duration-[160ms] hover:text-accent">
            {p.client}
          </Link>
        </h3>
        <p className="mt-1 text-[length:var(--text-lg)] leading-snug tracking-[-0.01em] text-secondary">{p.title}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink">{p.summary}</p>

        <DrawingNotes decisions={p.decisions} limit={2} className="mt-7 sm:grid-cols-1" />

        <TitleBlock className="mt-7" rows={projectRows(p).filter((r) => r.label !== "Role")} />

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button href={href} variant="secondary" keyGlyph="next">
            {p.caseHref ? `Open ${p.client.replace("Snowbros ", "")}` : "Read the case study"}
          </Button>
          {p.links?.live ? (
            <Button href={p.links.live} variant="text">
              Visit live
            </Button>
          ) : (
            p.links?.github && (
              <Button href={p.links.github} variant="text">
                Source
              </Button>
            )
          )}
        </div>
      </div>
    </article>
  );
}
