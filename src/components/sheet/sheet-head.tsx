import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section head on the drawing sheet: a full-width ink rule that plots in from
 * the left on first view (the structure arrives before the content), then the
 * heading. An optional `aside` sits on the rule's right end for a real fact
 * or a link, never a paragraph.
 */
export function SheetHead({
  title,
  aside,
  lead,
  id,
  className,
  as: Tag = "h2",
}: {
  title: React.ReactNode;
  aside?: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("plot", className)} data-sheet="SheetHead">
      <div className="plot-rule h-px w-full bg-ink" aria-hidden />
      <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <Tag
          id={id}
          className="max-w-[22ch] text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink"
        >
          {title}
        </Tag>
        {aside && <div className="shrink-0 sm:text-right">{aside}</div>}
      </div>
      {lead && (
        <p className="mt-5 max-w-[60ch] text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] text-secondary">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
