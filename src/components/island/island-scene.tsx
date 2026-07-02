"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const IslandCanvas = dynamic(
  () => import("./island-canvas").then((m) => m.IslandCanvas),
  { ssr: false },
);

/**
 * Signature 3D snow engineering island.
 *
 * Progressive by design:
 *  - Always renders a calm CSS backdrop (works with zero JS / no WebGL).
 *  - Mounts the WebGL scene only on capable, wide, non-reduced-motion
 *    devices, and only while it is on screen — protecting mobile
 *    performance and the Lighthouse budget.
 */
export function IslandScene() {
  const [enabled, setEnabled] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Cheap WebGL capability probe.
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      webgl = false;
    }

    // Browser-only capability probe — cannot run during SSR render, so this
    // one-time sync into state after mount is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimate(!reduce);
    setEnabled(wide && webgl);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 select-none"
    >
      {/* Base backdrop — cinematic monochrome light, always present */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_-15%,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.03)_28%,transparent_58%)]" />
      <div className="absolute right-[-12%] top-[2%] hidden aspect-square w-[52%] rounded-full bg-[radial-gradient(circle_at_45%_40%,rgba(255,255,255,0.14),rgba(255,255,255,0.04)_45%,transparent_70%)] blur-3xl md:block" />
      {/* Cool counter-glow, lower-left, keeps the frame from going flat */}
      <div className="absolute bottom-[-20%] left-[-10%] aspect-square w-[46%] rounded-full bg-[radial-gradient(circle,rgba(180,190,205,0.06),transparent_68%)] blur-3xl" />
      {/* Grounding fade into the page background at the seam */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      {enabled && (
        <div className="absolute right-0 top-0 hidden h-[120%] w-[60%] md:block">
          <IslandCanvas animate={animate} />
        </div>
      )}
    </div>
  );
}
