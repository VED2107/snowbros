"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up number that animates once, only when scrolled into view.
 * Non-numeric values render as-is. Reduced motion shows the final value.
 */
export function Counter({
  value,
  className,
  duration = 1200,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const target = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const isNumeric = !Number.isNaN(target);
  const [display, setDisplay] = useState(isNumeric ? "0" : value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(target));
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const tick = (t: number) => {
          if (!start) start = t;
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(String(Math.round(target * eased)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isNumeric, target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {isNumeric ? suffix : ""}
    </span>
  );
}
