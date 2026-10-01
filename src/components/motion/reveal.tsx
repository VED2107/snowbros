"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "section" | "li" | "article" | "span" | "figure" | "ul" | "ol";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds, kept for API compatibility. Capped so nothing waits on decoration. */
  delay?: number;
  id?: string;
  as?: Tag;
  /** Component name shown in Blueprint mode. */
  "data-sheet"?: string;
};

const MAX_DELAY_MS = 240;

/**
 * Reveal on first entry. Why it animates: a short settle tells the reader
 * which block just arrived, without moving anything already in view.
 *
 * Content renders visible on the server. The client only hides an element
 * that is still below the fold, then a CSS transition brings it in once
 * (opacity + 8px, 480ms, strong ease-out). Reduced motion: never hidden.
 */
function useReveal(ref: React.RefObject<HTMLDivElement | null>, group: boolean, stagger = 0) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let targets: HTMLElement[];
    if (group) {
      targets = Array.from(root.children) as HTMLElement[];
      targets.forEach((k, i) =>
        k.style.setProperty("--reveal-delay", `${Math.min(i * stagger * 1000, MAX_DELAY_MS)}ms`),
      );
    } else {
      // A RevealGroup parent drives its children.
      if (root.parentElement?.closest("[data-reveal-group]")) return;
      targets = [root];
    }

    const below = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (below.length === 0) return;
    below.forEach((el) => el.setAttribute("data-reveal", "pending"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "done");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    below.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      below.forEach((el) => el.removeAttribute("data-reveal"));
    };
  }, [ref, group, stagger]);
}

export function Reveal({ children, className, delay = 0, id, as = "div", "data-sheet": sheet }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, false);
  const El: React.ElementType = as;
  return (
    <El
      ref={ref as never}
      id={id}
      data-sheet={sheet}
      className={cn(className)}
      style={delay ? ({ "--reveal-delay": `${Math.min(delay * 1000, MAX_DELAY_MS)}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </El>
  );
}

/** Staggers direct children by 50ms (capped), once, on entry. */
export function RevealGroup({
  children,
  className,
  stagger = 0.05,
  as = "div",
  "data-sheet": sheet,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: Tag;
  "data-sheet"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, true, stagger);
  const El: React.ElementType = as;
  return (
    <El ref={ref as never} data-reveal-group="" data-sheet={sheet} className={cn(className)}>
      {children}
    </El>
  );
}
