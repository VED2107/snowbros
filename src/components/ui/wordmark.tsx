import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * SNOWBROS wordmark. A six-armed node (snowflake / graph vertex) beside the
 * name. On hover the node turns 60°: six-fold symmetry means it lands exactly
 * where it started, so the mark "clicks" without changing shape.
 */
export function SnowNode({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2.5v19M3.77 7.25l16.46 9.5M20.23 7.25 3.77 16.75" />
      </g>
      <circle cx="12" cy="12" r="3.1" fill="var(--accent)" />
    </svg>
  );
}

export function Wordmark({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="SNOWBROS, home"
      className={cn("group/mark inline-flex items-center gap-2.5 text-ink", className)}
    >
      <SnowNode className="h-[22px] w-[22px] transition-transform duration-[520ms] ease-[var(--ease-in-out-soft)] group-hover/mark:rotate-60 motion-reduce:transition-none" />
      <span className="text-[14px] font-semibold tracking-[0.16em]">SNOWBROS</span>
    </Link>
  );
}
