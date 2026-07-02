import { cn } from "@/lib/cn";

/**
 * Lightweight browser-chrome mockup used as a project preview.
 * Pure CSS — no image payload, crisp at any size. A per-project `accent`
 * tints the app skeleton so each preview feels like its own product while
 * staying inside the warm-paper system. A tasteful stand-in for real captures.
 */
export function BrowserMock({
  label,
  accent = "#24423a",
  className,
}: {
  label: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-md)] border border-hairline bg-surface",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-[#f7f6f1] px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-full bg-surface px-3 py-1 text-[11px] text-muted">
          {label}
        </span>
      </div>

      {/* viewport */}
      <div
        className="relative aspect-[16/10] w-full"
        style={{
          background: `radial-gradient(120% 120% at 12% 0%, ${accent}0f 0%, transparent 46%), #ffffff`,
        }}
      >
        <div className="absolute inset-0 p-5">
          <div className="flex h-full gap-4">
            <div className="hidden w-1/4 flex-col gap-2 sm:flex">
              <span
                className="h-6 w-6 rounded-md"
                style={{ backgroundColor: accent }}
              />
              <span className="mt-2 h-2 w-3/4 rounded-full bg-black/[0.08]" />
              <span className="h-2 w-2/3 rounded-full bg-black/[0.08]" />
              <span className="h-2 w-3/4 rounded-full bg-black/[0.08]" />
              <span className="h-2 w-1/2 rounded-full bg-black/[0.08]" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <span
                className="h-3 w-1/3 rounded-full"
                style={{ backgroundColor: `${accent}55` }}
              />
              <div className="grid flex-1 grid-cols-2 gap-3">
                <span className="rounded-lg border border-hairline bg-[#fafaf8]" />
                <span className="rounded-lg border border-hairline bg-[#fafaf8]" />
                <span className="col-span-2 rounded-lg border border-hairline bg-[#fafaf8]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
