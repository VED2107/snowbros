import { cn } from "@/lib/cn";

export type TitleBlockRow = {
  label: string;
  value: React.ReactNode;
  /** Span both columns (wide values such as a stack list). */
  wide?: boolean;
};

/**
 * Title block: the ruled box in the corner of an engineering drawing that
 * says what the sheet is. Used for real metadata only: status, version,
 * role, stack, links. Labels are mono and muted; values are set in the text
 * face so they read first.
 */
export function TitleBlock({
  rows,
  heading,
  className,
}: {
  rows: TitleBlockRow[];
  heading?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-sheet="TitleBlock"
      className={cn(
        "border border-ink/80 bg-surface text-[13px] leading-snug",
        className,
      )}
    >
      {heading && (
        <div className="border-b border-ink/80 px-3.5 py-2.5 text-[14px] font-medium tracking-[-0.01em] text-ink">
          {heading}
        </div>
      )}
      <dl className="grid grid-cols-2">
        {rows.map((r, i) => (
          <div
            key={r.label + i}
            className={cn(
              "flex min-w-0 flex-col gap-1 border-hairline-strong px-3.5 py-2.5",
              r.wide ? "col-span-2" : "odd:border-r",
              "[&:not(:last-child)]:border-b",
            )}
          >
            <dt className="meta text-[11px]">{r.label}</dt>
            <dd className="min-w-0 break-words text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
