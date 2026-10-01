import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { SectionView } from "@/components/home/section-view";
import { SheetHead } from "@/components/sheet/sheet-head";
import { ProjectSheet } from "@/components/work/project-sheet";
import { ProjectPair } from "@/components/work/project-pair";
import { ProjectIndex } from "@/components/work/project-index";
import { toIndexItems } from "@/components/work/index-items";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { projects, projectHref, services, principles, values, getProject, github } from "@/lib/content";
import { site } from "@/lib/site";

const LAYOUTS = ["full", "plate", "split"] as const;

export default function HomePage() {
  const lead = projects.filter((p) => p.tier === "lead");
  const feature = projects.filter((p) => p.tier === "feature");
  const index = projects.filter((p) => p.tier === "index");

  const proofLinks = Object.fromEntries(
    projects.map((p) => [p.slug, { href: projectHref(p), name: p.client }]),
  );

  return (
    <>
      <Hero />

      {/* Work: lead sheets, a feature pair, then the index */}
      <section id="work" aria-labelledby="work-title" className="scroll-mt-16">
        <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] pb-16 pt-6 md:pb-24 md:pt-10">
          <SheetHead
            id="work-title"
            title="Systems in production."
            aside={
              <Button href="/work" variant="text" keyGlyph="next">
                All {projects.length} projects
              </Button>
            }
          />

          <div className="mt-14 grid gap-24 md:mt-20 md:gap-32">
            {lead.map((p, i) => (
              <ProjectSheet key={p.slug} p={p} layout={LAYOUTS[i % 3]} priority={i === 0} />
            ))}
          </div>

          <div className="mt-24 md:mt-32">
            <ProjectPair items={feature} />
          </div>

          <div className="mt-24 md:mt-32">
            <Reveal>
              <h3 className="text-[length:var(--text-xl)] tracking-[-0.025em] text-ink">
                More work
              </h3>
              <p className="mt-2 max-w-[56ch] text-[15px] text-secondary">
                Brand-led commerce, our open-source tools, this site, and one personal experiment.
              </p>
            </Reveal>
            <div className="mt-8">
              <ProjectIndex items={toIndexItems(index)} />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities: what we take responsibility for, each tied to proof */}
      <section aria-labelledby="cap-title">
        <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
          <SheetHead
            id="cap-title"
            title="One team owns the problem, schema to screen."
            aside={
              <Button href="/services" variant="text" keyGlyph="next">
                How engagements work
              </Button>
            }
          />
          <RevealGroup as="ul" className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug} className="border-t border-hairline-strong py-6 lg:pr-4">
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-ink">
                  <Link href={`/services#${s.slug}`} className="transition-colors duration-[160ms] hover:text-accent">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-secondary">{s.summary}</p>
                <p className="meta mt-4">
                  Seen in{" "}
                  {s.proof.slice(0, 3).map((slug, i) => {
                    const p = getProject(slug);
                    if (!p) return null;
                    return (
                      <span key={slug}>
                        {i > 0 && ", "}
                        <Link href={projectHref(p)} className="text-ink underline decoration-hairline-strong underline-offset-4 transition-colors hover:decoration-accent">
                          {p.client}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Engineering signal: the stack, cut open */}
      <section aria-labelledby="layers-title" className="border-y border-hairline bg-elevated">
        <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
          <SheetHead
            id="layers-title"
            title="How the stack is held together."
            lead="Seven layers, one rule each, and the shipped work that shows it."
          />
          <div className="mt-12">
            <SectionView principles={principles} hrefs={proofLinks} />
          </div>
        </div>
      </section>

      {/* Studio */}
      <section aria-labelledby="studio-title">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <h2
              id="studio-title"
              className="text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink"
            >
              Small on purpose. You talk to the people writing the code.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] text-secondary">
              SNOWBROS was founded by {site.founder.name}, a full-stack engineer.
              There is no account layer between you and the work. We publish
              our own tools in the open, at{" "}
              <a href={github.org} target="_blank" rel="noopener noreferrer" className="link-accent">
                snowbros-labs
              </a>
              .
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary" keyGlyph="next">
                About the studio
              </Button>
            </div>
          </Reveal>
          <RevealGroup as="ol" className="lg:col-span-5 lg:col-start-8">
            {values.map((v) => (
              <li key={v.title} className="border-t border-hairline-strong py-6 first:border-t-ink">
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-secondary">{v.body}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
