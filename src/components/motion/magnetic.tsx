"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Magnetic hover — the child drifts a few px toward the cursor while hovered,
 * then springs back on leave. Pure transform (GPU). Disabled for coarse
 * pointers / reduced motion via a capability check at first move.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useRef<boolean | null>(null);

  const check = () => {
    if (enabled.current === null) {
      enabled.current =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !window.matchMedia("(pointer: coarse)").matches;
    }
    return enabled.current;
  };

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!check()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "inline-flex transition-transform duration-300 ease-[var(--ease-out-soft)] will-change-transform",
        className,
      )}
    >
      {children}
    </span>
  );
}
