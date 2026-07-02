"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  System architecture diagram that draws itself as it scrolls into view.
  Pure SVG (crisp, scalable). Connector paths stroke-draw with GSAP
  ScrollTrigger; nodes fade+lift in sequence. Reduced motion renders the
  finished diagram. This is a section with its own identity — not a card grid.
*/

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
};

const NODES: Node[] = [
  { id: "client", x: 40, y: 150, w: 150, h: 76, label: "Client", sub: "Next.js · RSC" },
  { id: "edge", x: 270, y: 60, w: 150, h: 76, label: "Edge / CDN", sub: "34 PoPs" },
  { id: "api", x: 270, y: 240, w: 150, h: 76, label: "API Gateway", sub: "tRPC · REST" },
  { id: "db", x: 520, y: 40, w: 160, h: 72, label: "Postgres", sub: "RLS · pooled" },
  { id: "ai", x: 520, y: 150, w: 160, h: 72, label: "AI / RAG", sub: "evals · guardrails" },
  { id: "queue", x: 520, y: 260, w: 160, h: 72, label: "Queue", sub: "workflows" },
];

const EDGES = [
  "M190 188 C 230 188, 235 98, 270 98", // client -> edge
  "M190 188 C 230 188, 235 278, 270 278", // client -> api
  "M420 98 C 470 98, 480 76, 520 76", // edge -> db
  "M420 278 C 470 278, 480 186, 520 186", // api -> ai
  "M420 278 C 470 278, 480 296, 520 296", // api -> queue
  "M420 98 C 500 120, 470 260, 520 290", // edge -> queue (cache)
];

export function ArchitectureDiagram() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGPathElement>("[data-edge]");
    const nodes = el.querySelectorAll<SVGGElement>("[data-node]");
    const pulses = el.querySelectorAll<SVGCircleElement>("[data-pulse]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(nodes, { opacity: 0, y: 14 });
      gsap.set(pulses, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%" },
      });
      tl.to(nodes, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      })
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          "-=0.3",
        )
        .to(pulses, { opacity: 1, duration: 0.3 }, "-=0.4");

      // travelling pulses along the connectors
      pulses.forEach((c, i) => {
        const path = paths[i];
        if (!path) return;
        const len = path.getTotalLength();
        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          duration: 2.4 + (i % 3) * 0.5,
          repeat: -1,
          ease: "none",
          delay: i * 0.3,
          onUpdate: () => {
            const pt = path.getPointAtLength(len * proxy.p);
            c.setAttribute("cx", String(pt.x));
            c.setAttribute("cy", String(pt.y));
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 720 380"
      className="h-auto w-full"
      role="img"
      aria-label="SNOWBROS system architecture: client through edge and API to database, AI, and queue services."
    >
      <defs>
        <pattern id="arch-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--color-hairline)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="720" height="380" fill="url(#arch-dots)" opacity="0.5" />

      {/* connectors */}
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.75">
        {EDGES.map((d, i) => (
          <path key={i} data-edge d={d} strokeLinecap="round" />
        ))}
      </g>
      {/* travelling pulses */}
      <g>
        {EDGES.map((_, i) => (
          <circle key={i} data-pulse r="2.6" fill="var(--color-accent)" />
        ))}
      </g>

      {/* nodes */}
      {NODES.map((n) => (
        <g key={n.id} data-node>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx="10"
            fill="var(--color-card)"
            stroke="var(--color-hairline-strong)"
            strokeWidth="1"
          />
          <circle cx={n.x + 16} cy={n.y + 20} r="3" fill="var(--color-accent)" />
          <text
            x={n.x + 28}
            y={n.y + 24}
            className="font-sans"
            fontSize="13"
            fontWeight="600"
            fill="var(--color-ink)"
          >
            {n.label}
          </text>
          <text
            x={n.x + 16}
            y={n.y + 46}
            className="font-mono"
            fontSize="10.5"
            fill="var(--color-muted)"
          >
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
