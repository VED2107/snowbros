"use client";

import { createElement, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Tag = "div" | "section" | "li" | "article" | "span" | "figure";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  as?: Tag;
};

const CINEMATIC_EASE = "power3.out";
const DURATION = 0.9;
const DISTANCE = 26;

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll-triggered reveal — GSAP + ScrollTrigger, slow cinematic ease.
 * Standalone (not inside a RevealGroup): animates itself on scroll.
 * Reduced-motion: renders fully visible, no animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  id,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if a RevealGroup parent claims this element (group drives it).
    if (el.closest("[data-reveal-group]") && el.dataset.revealSelf !== "true") {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    if (prefersReduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: DISTANCE },
        {
          opacity: 1,
          y: 0,
          duration: DURATION,
          delay,
          ease: CINEMATIC_EASE,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return createElement(
    as,
    { ref, id, className: cn(className), style: { opacity: 0 } },
    children,
  );
}

/**
 * Container that staggers its direct Reveal children with GSAP.
 * Each child animates in sequence as the group scrolls into view.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(el.children) as HTMLElement[];
    if (targets.length === 0) return;

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: DISTANCE },
        {
          opacity: 1,
          y: 0,
          duration: DURATION,
          ease: CINEMATIC_EASE,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} data-reveal-group className={cn(className)}>
      {children}
    </div>
  );
}
