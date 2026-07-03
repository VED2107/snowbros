"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/** Persistent bottom CTA on mobile — appears once past the hero fold. */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4 transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)] md:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-full border border-hairline-strong bg-[rgba(248,249,248,0.92)] p-2 pl-4 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_16px_40px_-18px_rgba(21,21,21,0.45)] backdrop-blur-2xl">
        <span className="flex flex-1 items-center gap-1.5 font-mono text-[11px] text-secondary">
          <span className="status-dot scale-75" />
          Available for new projects
        </span>
        <Button href="/contact" size="sm" variant="primary">
          Start
          <Icon name="arrow-right" className="text-[14px]" />
        </Button>
      </div>
    </div>
  );
}
