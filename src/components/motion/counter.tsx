/**
 * A figure. It used to count up from zero; that rendered "0" to crawlers and
 * no-JS readers and animated a number the reader only wants to read. Now it
 * simply states the value, with tabular figures.
 */
export function Counter({ value, className }: { value: string; className?: string; duration?: number }) {
  return <span className={["tabular-nums", className].filter(Boolean).join(" ")}>{value}</span>;
}
