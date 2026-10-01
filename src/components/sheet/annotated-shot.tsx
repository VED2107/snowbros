"use client";

import { useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Media } from "@/lib/content";

/**
 * A screenshot with its notes set beneath it: what to notice, and why it
 * was built that way. No marks on the image itself; the screenshot stays clean.
 */
export function AnnotatedShot({
  m,
  priority,
  sizes = "(min-width: 1240px) 1144px, 100vw",
  noteColumns = 3,
  plateClassName,
  children,
}: {
  m: Media;
  priority?: boolean;
  sizes?: string;
  noteColumns?: 2 | 3;
  /** Render the image on a padded plate; `children` are drawn on the plate after it. */
  plateClassName?: string;
  children?: React.ReactNode;
}) {
  const notes = m.annotations ?? [];
  const uid = useId();
  const night = m.tone === "night";

  return (
    <figure data-sheet={`AnnotatedShot: ${notes.length} notes`}>
      <div className={cn(night ? "frame-night" : "frame", plateClassName)}>
        <div className={cn("relative", plateClassName && "overflow-hidden rounded-[4px] border border-white/10")}>
          <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes={sizes} priority={priority} className="block h-auto w-full" />

        </div>
        {children}
      </div>

      {notes.length > 0 && (
        <figcaption>
          <ul className={cn("mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2", noteColumns === 3 && "lg:grid-cols-3")}>
            {notes.map((n, i) => (
              <li
                key={n.title}
                id={`${uid}-n${i}`}
                className="border-t border-hairline-strong pt-3"
              >
                <p className="text-[14px] leading-relaxed text-secondary">
                  <span className="font-medium text-ink">{n.title}. </span>
                  {n.note}
                </p>
              </li>
            ))}
          </ul>
        </figcaption>
      )}
    </figure>
  );
}
