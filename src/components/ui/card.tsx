import Link from "next/link";
import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  href?: string;
  interactive?: boolean;
  /** Suppress the auto corner arrow (for cards with their own inline CTA). */
  noArrow?: boolean;
};

/*
  SNOWBROS card — engineered, not the generic bordered box. Warm paper fill,
  a single thin dark hairline, tiny radius, and a soft micro-shadow. On hover
  it lifts, the hairline darkens, the fill warms, and the shadow deepens.
  All of that lives in the `.card-engineered` component class (globals.css) so
  every card shares one physically-consistent treatment.
*/

const shell =
  "group/card relative isolate flex flex-col overflow-hidden p-7 md:p-8";

export function Card({
  href,
  interactive,
  noArrow,
  className,
  children,
  ...props
}: CardProps) {
  const isInteractive = Boolean(interactive || href);
  const classes = cn(
    shell,
    "card-engineered",
    !isInteractive && "hover:!translate-y-0",
    className,
  );

  const inner = (
    <>
      {href && !noArrow && <CornerArrow />}
      {children}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={classes} {...props}>
      {inner}
    </div>
  );
}

/** Diagonal arrow that lifts toward the corner on hover — signals "go". */
function CornerArrow() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-5 top-5 z-10 text-muted transition-[color,transform] duration-500 ease-[var(--ease-out-soft)] group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 17L17 7M17 7H8M17 7V16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Consistent icon chip for card headers — forest-tinted, quietly raised. */
export function CardIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] text-[20px] text-accent",
        "bg-accent-weak ring-1 ring-inset ring-[rgba(36,66,58,0.14)]",
        "shadow-[0_1px_1px_rgba(17,17,16,0.04)]",
        "transition-[color,box-shadow,background-color,transform] duration-500 ease-[var(--ease-out-soft)]",
        "group-hover/card:bg-primary group-hover/card:text-primary-foreground",
        "group-hover/card:shadow-[0_8px_20px_-8px_rgba(36,66,58,0.5)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
