import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  containerSize?: "default" | "wide" | "narrow";
  bleed?: boolean;
};

/** Vertical rhythm section. Every section breathes — generous, consistent padding. */
export function Section({
  className,
  children,
  containerSize = "default",
  bleed = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-24 md:py-32 lg:py-40", className)}
      {...props}
    >
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
