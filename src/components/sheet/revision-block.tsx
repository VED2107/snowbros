import { cn } from "@/lib/cn";
import type { Revision } from "@/lib/content";

/**
 * Revision block, as on a drawing: the latest release on top, each with the
 * one change that defined it. Taken from real tags and release commits.
 */
export function RevisionBlock({
  revisions,
  className,
  caption = "Revisions",
}: {
  revisions: Revision[];
  className?: string;
  caption?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)} data-sheet="RevisionBlock: from git tags">
      <table className="w-full min-w-[320px] border border-ink/80 bg-surface text-left text-[13px]">
        <caption className="meta border border-b-0 border-ink/80 bg-surface px-3.5 py-2 text-left text-ink">
          {caption}
        </caption>
        <thead>
          <tr className="border-b border-ink/80">
            <th scope="col" className="meta w-[5.5rem] px-3.5 py-2 font-normal">Rev</th>
            <th scope="col" className="meta hidden w-[6.5rem] border-l border-hairline-strong px-3.5 py-2 font-normal sm:table-cell">Date</th>
            <th scope="col" className="meta border-l border-hairline-strong px-3.5 py-2 font-normal">Change</th>
          </tr>
        </thead>
        <tbody>
          {revisions.map((r, i) => (
            <tr key={r.rev} className="border-b border-hairline last:border-b-0">
              <td className={cn("px-3.5 py-2.5 align-top font-mono tabular-nums", i === 0 ? "text-accent" : "text-ink")}>
                {r.rev}
              </td>
              <td className="meta hidden border-l border-hairline-strong px-3.5 py-2.5 align-top sm:table-cell">
                {r.date}
              </td>
              <td className="border-l border-hairline-strong px-3.5 py-2.5 align-top leading-snug text-ink">
                {r.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
