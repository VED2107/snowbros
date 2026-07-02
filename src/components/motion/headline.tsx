"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/cn";

/**
 * Masked line-by-line headline reveal. Each line sits in an overflow-hidden
 * track and rises into place with a slow cinematic ease, staggered. Reduced
 * motion renders fully visible. Lines accept an optional per-segment accent.
 */
type Segment = {
  text: string;
  accent?: boolean;
  serif?: boolean;
  italic?: boolean;
};

export function HeadlineReveal({
  lines,
  className,
  as = "h1",
}: {
  lines: (string | Segment[])[];
  className?: string;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tracks = el.querySelectorAll<HTMLElement>("[data-line]");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      tracks.length === 0
    ) {
      gsap.set(tracks, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(tracks, { yPercent: 115 });
      gsap.to(tracks, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.05,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const Tag = as;

  return (
    <Tag ref={ref} className={cn(className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span data-line className="block will-change-transform">
            {typeof line === "string"
              ? line
              : line.map((seg, j) => (
                  <span
                    key={j}
                    className={cn(
                      seg.accent && "text-accent",
                      seg.serif && "display-serif",
                      seg.italic && "italic",
                    )}
                  >
                    {seg.text}
                  </span>
                ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
