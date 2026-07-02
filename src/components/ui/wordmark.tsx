import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * SNOWBROS wordmark. Original mark — a small ice-mint node glyph beside
 * a tightly-tracked wordmark. No reference to any existing property.
 */
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
      aria-label="SNOWBROS — home"
      className={cn(
        "group inline-flex items-center gap-2.5 text-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative grid h-6 w-6 place-items-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
          role="presentation"
        >
          {/* six-point node: an abstract snowflake / graph node */}
          <g
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="text-ink/70 transition-colors group-hover:text-ink"
          >
            <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
          </g>
          <circle cx="12" cy="12" r="3" className="fill-accent" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-[0.14em]">
        SNOWBROS
      </span>
    </Link>
  );
}
