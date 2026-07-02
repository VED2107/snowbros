import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-[-0.005em] transition-[transform,background-color,color,border-color,box-shadow] duration-[180ms] ease-[var(--ease-out-soft)] will-change-transform hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Deep Forest fill — the single accent, reserved for the primary action.
  // Inner top highlight + layered forest shadow for real depth.
  primary:
    "bg-primary text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_1px_2px_rgba(23,23,23,0.18),0_8px_20px_-8px_rgba(36,66,58,0.5)] hover:bg-[var(--color-accent-strong)] hover:shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_2px_4px_rgba(23,23,23,0.2),0_16px_32px_-12px_rgba(36,66,58,0.6)]",
  // Glass paper button — refined hairline, blurred surface, elegant hover
  secondary:
    "border border-hairline bg-card/70 text-ink backdrop-blur-md shadow-[0_1px_2px_rgba(23,23,23,0.05)] hover:border-hairline-strong hover:bg-card hover:shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_26px_-16px_rgba(23,23,23,0.34)]",
  ghost: "text-secondary hover:bg-accent-weak hover:text-ink",
  // Inline text button — no chrome, accent on hover
  text: "px-0 text-secondary hover:-translate-y-0 hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-[1.05rem] text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.35rem] px-[1.75rem] text-[15px]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type NativeButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

type LinkButtonProps = BaseProps &
  Omit<React.ComponentProps<typeof Link>, keyof BaseProps> & { href: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: NativeButtonProps | LinkButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant !== "text" && sizes[size],
    className,
  );

  if ("href" in rest && rest.href) {
    return (
      <Link className={classes} {...(rest as LinkButtonProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as NativeButtonProps)}>
      {children}
    </button>
  );
}
