import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Live-app preview — real browser chrome (real deployment host + lock) wrapping
 * a brand-accurate hero poster built from the project's real name, tagline, and
 * accent. Not a wireframe: it mirrors the live application and links to it.
 * A real screenshot at `/public{screenshot}` supersedes the poster when present.
 */
export function LivePreview({
  name,
  host,
  accent,
  tagline,
  category,
  screenshot,
  className,
}: {
  name: string;
  host: string;
  accent: string;
  tagline?: string;
  category?: string;
  screenshot?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-md)] border border-hairline bg-surface shadow-[0_1px_2px_rgba(23,23,23,0.06)]",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-[#f0f2f0] px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        </span>
        <span className="ml-2 flex flex-1 items-center gap-1.5 truncate rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-[11px] text-muted">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-accent"
            aria-hidden
          >
            <rect
              x="5"
              y="11"
              width="14"
              height="9"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 11V8a4 4 0 0 1 8 0v3"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          {host}
        </span>
      </div>

      {/* Poster / screenshot viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {screenshot ? (
          <Image
            src={screenshot}
            alt={`${name} — live application, ${host}`}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)]"
          />
        ) : (
          <div
            className="relative flex h-full flex-col"
            style={{
              background: `radial-gradient(120% 100% at 15% 0%, ${accent}1f 0%, transparent 55%), radial-gradient(100% 100% at 100% 100%, ${accent}14 0%, transparent 50%), #ffffff`,
            }}
          >
            {/* faux top nav — mirrors a real landing header */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <span
                className="text-[11px] font-semibold tracking-[-0.01em]"
                style={{ color: accent }}
              >
                {name}
              </span>
              <span className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1 w-5 rounded-full"
                    style={{ backgroundColor: `${accent}33` }}
                  />
                ))}
              </span>
            </div>

            {/* hero block */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <span
                className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                Live · {category ?? "Product"}
              </span>
              <p
                className="max-w-[85%] text-lg font-semibold leading-tight tracking-[-0.02em] sm:text-2xl"
                style={{ color: "#171717" }}
              >
                {tagline ?? name}
              </p>
              <span
                className="mt-4 rounded-full px-4 py-1.5 text-[11px] font-medium text-white"
                style={{ backgroundColor: accent }}
              >
                Visit site
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
