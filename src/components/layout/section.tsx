import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  containerSize?: "default" | "wide" | "narrow";
  bleed?: boolean;
};

/** Vertical rhythm section. Every section breathes, generous, consistent padding. */
export function Section({
  className,
  children,
  containerSize = "default",
  bleed = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
