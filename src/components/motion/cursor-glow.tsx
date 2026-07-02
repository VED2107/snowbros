"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener that drives the cursor-follow glow on every
 * `.card-glow` element (see globals.css). Cheap: no per-card React state, just
 * CSS custom props updated on the hovered card. Disabled for reduced motion
 * and coarse (touch) pointers.
 */
export function CursorGlow() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const card = (e.target as HTMLElement)?.closest?.(".card-glow") as
          | HTMLElement
          | null;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
