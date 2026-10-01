import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/icon";

type Variant = "primary" | "secondary" | "ghost" | "text";
type Size = "sm" | "md" | "lg";

/*
  SNOWBROS buttons.

  Signature: a label and a ruled "key" cell, like a keycap beside a command.
  The key carries the direction (→ / ↗) so the label stays a plain verb.
  - primary   ink sheet, cream text. One per view.
  - secondary ruled outline on the paper.
  - ghost     no chrome until hover.
  - text      an underlined command with a key glyph.
  Feedback: color shift 160ms (fine pointers only), press scale 0.97,
  the key glyph nudges 2px in its direction on hover. No lift, no glow.
*/

const base =
  "group/btn relative inline-flex select-none items-stretch whitespace-nowrap rounded-[var(--radius-md)] font-medium tracking-[-0.01em] transition-[transform,background-color,color,border-color] duration-[160ms] ease-[var(--ease-out-soft)] active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-background hover:bg-[#2d2b27]",
  secondary:
    "border border-hairline-strong text-ink hover:border-ink hover:bg-surface",
  ghost: "text-secondary hover:bg-elevated hover:text-ink",
  text: "text-ink hover:text-accent active:scale-100",
};

const keyRule: Record<Variant, string> = {
  primary: "border-l border-white/15",
  secondary: "border-l border-hairline-strong group-hover/btn:border-ink",
  ghost: "",
  text: "",
};

const sizes: Record<Size, { box: string; label: string; key: string }> = {
  sm: { box: "h-9 text-[13px]", label: "px-3.5", key: "w-9" },
  md: { box: "h-11 text-sm", label: "px-4", key: "w-11" },
  lg: { box: "h-12 text-[15px]", label: "px-5", key: "w-12" },
};

type ButtonKey = "next" | "out" | "down" | "none";

const glyph: Record<Exclude<ButtonKey, "none">, { icon: IconName; move: string }> = {
  next: { icon: "arrow-right", move: "group-hover/btn:translate-x-[2px]" },
  out: { icon: "arrow-up-right", move: "group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]" },
  down: { icon: "arrow-down", move: "group-hover/btn:translate-y-[2px]" },
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** The key cell. Defaults to "out" for external links, "none" otherwise. */
  keyGlyph?: ButtonKey;
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
  keyGlyph,
  className,
  children,
  ...rest
}: NativeButtonProps | LinkButtonProps) {
  const href = "href" in rest ? rest.href : undefined;
  const external = typeof href === "string" && /^(https?:|mailto:)/.test(href);
  const k: ButtonKey = keyGlyph ?? (external ? "out" : "none");
  const s = sizes[size];
  const isText = variant === "text";

  const classes = cn(base, variants[variant], !isText && s.box, className);

  const inner = (
    <>
      <span
        className={cn(
          "inline-flex items-center gap-2",
          isText ? "underline decoration-hairline-strong decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-[160ms] group-hover/btn:decoration-accent" : s.label,
        )}
      >
        {children}
      </span>
      {k !== "none" && (
        <span
          aria-hidden
          className={cn(
            "inline-grid place-items-center",
            isText ? "ml-1.5 text-accent" : cn(s.key, keyRule[variant]),
          )}
        >
          <span className={cn("inline-flex transition-transform duration-[160ms] ease-[var(--ease-out-soft)] motion-reduce:transform-none", glyph[k].move)}>
            <Icon name={glyph[k].icon} className="text-[1.1em]" strokeWidth={1.75} />
          </span>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        className={classes}
        {...(external && !href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as LinkButtonProps)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as NativeButtonProps)}>
      {inner}
    </button>
  );
}
