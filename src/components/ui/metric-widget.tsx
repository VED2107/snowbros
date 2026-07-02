/**
 * Monitoring-dashboard widget — a small glass metric card with a live sparkline
 * that drifts gently. Reads like a real observability tile, not a floating
 * rectangle. Pure CSS motion (drift + sparkline draw), reduced-motion safe via
 * the global animation reset.
 */
export function MetricWidget({
  label,
  value,
  unit,
  caption,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  caption: string;
  className?: string;
}) {
  // A calm p95-latency style sparkline (0..40 range, 8 samples).
  const pts = [22, 19, 26, 17, 21, 15, 18, 14];
  const w = 76;
  const h = 26;
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const path = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div
      className={
        "widget-drift flex items-center gap-4 rounded-[var(--radius-md)] border border-white/60 bg-card/80 px-4 py-3 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_20px_44px_-24px_rgba(23,23,23,0.45)] backdrop-blur-xl " +
        (className ?? "")
      }
    >
      <div>
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span className="status-dot scale-[0.55]" />
          {label}
        </p>
        <p className="mt-1 font-mono text-lg font-semibold tabular-nums leading-none text-ink">
          {value}
          {unit && (
            <span className="ml-0.5 text-xs font-medium text-muted">{unit}</span>
          )}
        </p>
        <p className="mt-1 font-mono text-[10px] text-muted">{caption}</p>
      </div>

      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${path} L${w} ${h} L0 ${h} Z`}
          fill="url(#spark-fill)"
        />
        <path
          d={path}
          className="spark-draw"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={w}
          cy={h - ((pts[pts.length - 1] - min) / (max - min || 1)) * h}
          r="2"
          fill="var(--color-accent)"
        />
      </svg>
    </div>
  );
}
