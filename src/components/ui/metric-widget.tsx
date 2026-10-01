/**
 * A measured figure, as a ruled cell: label, value, and where the number
 * came from. No sparkline: a trend line needs real samples, and a single
 * benchmark does not have them.
 */
export function MetricWidget({
  label,
  value,
  unit,
  caption,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  caption: string;
  className?: string;
}) {
  return (
    <div className={"border-t border-ink pt-4 " + (className ?? "")}>
      <p className="meta">{label}</p>
      <p className="mt-2 text-[length:var(--text-4xl)] font-medium leading-none tracking-[-0.04em] tabular-nums text-ink">
        {value}
        {unit && <span className="ml-1 text-[0.4em] tracking-normal text-muted">{unit}</span>}
      </p>
      <p className="mt-3 text-[14px] leading-relaxed text-secondary">{caption}</p>
    </div>
  );
}
