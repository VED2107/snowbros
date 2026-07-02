import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  size?: "default" | "wide" | "narrow";
};

const sizes = {
  narrow: "max-w-[760px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1400px]",
} as const;

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  // Polymorphic host element; props are validated at the call site.
  const Component = Tag as React.ComponentType<Record<string, unknown>>;
  return (
    <Component
      className={cn(
        "mx-auto w-full px-[var(--spacing-gutter)]",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
