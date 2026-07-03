import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { HeadlineReveal } from "@/components/motion/headline";
import { Counter } from "@/components/motion/counter";
import { TerminalCard } from "@/components/ui/terminal-card";
import { MetricWidget } from "@/components/ui/metric-widget";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      {/* Cinematic engineering backdrop — blueprint grid + connection lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(75%_55%_at_78%_-2%,rgba(36,66,58,0.09),transparent_60%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(23,23,23,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,23,0.028)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(88%_78%_at_72%_2%,#000,transparent_72%)]" />
        {/* ambient glow behind terminal */}
        <div className="absolute right-[6%] top-[14%] hidden aspect-square w-[38%] rounded-full bg-[radial-gradient(circle,rgba(36,66,58,0.12),transparent_66%)] blur-3xl lg:block" />
        <svg
          className="absolute right-0 top-16 hidden h-[520px] w-[58%] opacity-60 lg:block"
          viewBox="0 0 600 520"
          fill="none"
        >
          <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.16">
            <path d="M40 120 C 200 120, 220 260, 380 260" />
            <path d="M40 300 C 200 300, 220 260, 380 260" />
            <path d="M380 260 C 480 260, 500 140, 560 140" />
            <path d="M380 260 C 480 260, 500 380, 560 380" />
          </g>
          <g fill="var(--color-accent)" opacity="0.26">
            <circle cx="40" cy="120" r="3" />
            <circle cx="40" cy="300" r="3" />
            <circle cx="380" cy="260" r="4" />
            <circle cx="560" cy="140" r="3" />
            <circle cx="560" cy="380" r="3" />
          </g>
        </svg>
      </div>

      <Container className="relative z-10 pb-28 pt-8 md:pb-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          {/* Editorial column */}
          <div>
            <Reveal delay={0.04}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="eyebrow">Software engineering studio</p>
                <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-accent-weak/60 px-3 py-1 font-mono text-[11px] text-accent">
                  <span className="status-dot scale-75" />
                  {site.status}
                </span>
              </div>
            </Reveal>

            <HeadlineReveal
              as="h1"
              className="mt-6 text-[clamp(2.75rem,1.7rem+4.6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
              lines={[
                "Engineering",
                "digital products",
                [
                  { text: "that " },
                  {
                    text: "last.",
                    serif: true,
                    italic: true,
                    accent: true,
                  },
                ],
              ]}
            />

            <Reveal delay={0.12}>
              <p className="mt-9 max-w-[38rem] text-[1.0625rem] leading-[1.75] text-secondary">
                SNOWBROS is a small studio building software platforms, SaaS
                products, AI applications, and developer tools — with the kind
                of care that only shows up years later.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Button href="/contact" size="lg">
                  Start a project
                  <Icon
                    name="arrow-right"
                    className="text-[18px] transition-transform duration-[180ms] ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1"
                  />
                </Button>
                <Button href="/work" size="lg" variant="secondary">
                  See selected work
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-hairline pt-8">
                {[
                  { v: "4", l: "Products shipped" },
                  { v: "100", l: "Lighthouse target" },
                  { v: "0", l: "Silent failures" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="font-mono text-2xl font-medium tabular-nums text-ink">
                      <Counter value={s.v} />
                    </dt>
                    <dd className="mt-1.5 font-mono text-xs text-muted">
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Live deployment visual — with floating monitoring widget */}
          <Reveal delay={0.14} className="relative lg:pl-6">
            <TerminalCard />
            <div className="absolute -bottom-6 -left-3 hidden sm:block lg:-left-9">
              <MetricWidget
                label="Edge network"
                value="18"
                unit="ms"
                caption="p95 · 34 PoPs"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
