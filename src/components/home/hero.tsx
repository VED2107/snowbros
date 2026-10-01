import { Button } from "@/components/ui/button";
import { HeroShowcase, type ShowcaseItem } from "@/components/home/hero-showcase";
import { getProject, projectHref } from "@/lib/content";

/** One line per system, in a client's words, plus a caption for the stage. */
const SHOWCASE: { slug: string; outcome: string; caption: string }[] = [
  {
    slug: "vinnys-atelier",
    outcome: "Retail POS for a boutique. Web and Windows, sells offline.",
    caption: "The till: a draft invoice, a discount, a Razorpay UPI QR.",
  },
  {
    slug: "accounic",
    outcome: "Multi-currency ledger on Android, Windows and web.",
    caption: "Net position, computed in Postgres, on the Windows client.",
  },
  {
    slug: "atlas",
    outcome: "Open-source static analysis in Rust. Reports only what it can prove.",
    caption: "An Atlas report: health by category, then each finding with its evidence.",
  },
  {
    slug: "stc-academy",
    outcome: "Academic platform with student, teacher and admin portals.",
    caption: "Admin, student and public views of the same platform.",
  },
];

/*
  Hero. A statement, one paragraph, one action, and the showcase: the
  actual systems this studio shipped, on the drafting table.
*/
export function Hero() {
  const items: ShowcaseItem[] = SHOWCASE.flatMap(({ slug, outcome, caption }) => {
    const p = getProject(slug);
    if (!p || !p.media[0]) return [];
    const m = p.media[0];
    return [
      {
        slug,
        name: p.client,
        href: projectHref(p),
        outcome,
        caption,
        meta: `${p.category.split("·")[0].trim()}, ${p.year}`,
        media: { src: m.src, alt: m.alt, width: m.width, height: m.height, tone: m.tone },
        second:
          m.tone === "night" && p.media[1]
            ? { src: p.media[1].src, alt: p.media[1].alt, width: p.media[1].width, height: p.media[1].height }
            : undefined,
      },
    ];
  });

  return (
    <section aria-labelledby="hero-title" className="relative" data-sheet="Hero">
      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1
            id="hero-title"
            className="text-[length:var(--text-5xl)] font-medium leading-[var(--text-5xl--line-height)] tracking-[var(--text-5xl--letter-spacing)] text-ink lg:col-span-9"
          >
            <span className="enter block" style={{ "--enter-delay": "40ms" } as React.CSSProperties}>
              Software that holds up
            </span>
            <span className="enter block" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
              in production<span className="text-accent">.</span>
            </span>
          </h1>

          <div className="enter lg:col-span-3 lg:pb-2" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
            <p className="max-w-[34ch] text-[length:var(--text-lg)] leading-[1.5] text-secondary">
              We design, build and maintain platforms, internal systems and developer tools.
            </p>
            <div className="mt-6">
              <Button href="/contact" size="lg" keyGlyph="next">
                Start a project
              </Button>
            </div>
          </div>
        </div>

        <div className="enter mt-12 md:mt-14" style={{ "--enter-delay": "280ms" } as React.CSSProperties}>
          <HeroShowcase items={items} />
        </div>
      </div>
    </section>
  );
}
