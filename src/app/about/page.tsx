import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { SheetHead } from "@/components/sheet/sheet-head";
import { TitleBlock } from "@/components/sheet/title-block";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SnowNode } from "@/components/ui/wordmark";
import { processSteps, values } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Studio",
  description:
    "SNOWBROS is a software engineering studio founded by Ved Chauhan. Small on purpose: the people who scope your project are the people who build and maintain it.",
  path: "/about",
});

export default function StudioPage() {
  return (
    <>
      <PageHeader
        title="A small studio, built to own the whole problem."
        lead={`SNOWBROS is a software engineering studio founded by ${site.founder.name}. We design, build and maintain platforms, internal business systems and developer tools.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Studio", href: "/about" },
        ]}
      />

      {/* Founder */}
      <section aria-labelledby="founder-title">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="frame">
              <Image
                src="/developer.jpeg"
                alt={`${site.founder.name}, founder of SNOWBROS`}
                width={1024}
                height={1536}
                sizes="(min-width: 1024px) 360px, 100vw"
                className="block aspect-[4/5] h-auto w-full object-cover object-[center_15%] grayscale-[0.15]"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2
                id="founder-title"
                className="text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink"
              >
                You work with the engineer, not an account manager.
              </h2>
              <p className="mt-6 max-w-[58ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">
                {site.founder.bio}
              </p>
              <p className="mt-4 max-w-[58ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">
                {site.founder.longBio}
              </p>
            </Reveal>
            <Reveal className="mt-10">
              <TitleBlock
                heading={site.founder.name}
                rows={[
                  { label: "Role", value: site.founder.role, wide: true },
                  { label: "Based in", value: `${site.location}, ${site.timezone}` },
                  { label: "Hours", value: site.businessHours },
                  {
                    label: "Elsewhere",
                    wide: true,
                    value: (
                      <span className="flex flex-wrap gap-x-4 gap-y-1">
                        <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="link-accent">GitHub</a>
                        <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-accent">LinkedIn</a>
                        <a href={site.social.portfolio} target="_blank" rel="noopener noreferrer" className="link-accent">VED.EXE</a>
                      </span>
                    ),
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process: a line with stations */}
      <section aria-labelledby="process-title" className="border-y border-hairline bg-elevated">
        <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
          <SheetHead id="process-title" title="How an engagement runs." />
          <RevealGroup as="ol" className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-6">
            {processSteps.map((s, i) => (
              <li key={s.id} className="relative pl-8 md:pl-0 md:pt-10">
                {/* station on the line */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-ink bg-elevated md:top-0"
                />
                {/* the line itself */}
                <span
                  aria-hidden
                  className={
                    i < processSteps.length - 1
                      ? "absolute left-[6px] top-5 h-[calc(100%+1rem)] w-px bg-ink md:left-5 md:top-[6px] md:h-px md:w-[calc(100%+0.25rem)]"
                      : "hidden"
                  }
                />
                <h3 className="text-[17px] font-medium tracking-[-0.015em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-secondary">{s.body}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="values-title">
        <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
          <SheetHead id="values-title" title="What we hold the work to." />
          <RevealGroup as="ul" className="mt-12 grid gap-x-8 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="border-t border-hairline-strong py-6">
                <h3 className="text-[length:var(--text-xl)] tracking-[-0.025em] text-ink">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{v.body}</p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The name */}
      <section aria-labelledby="name-title" className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-[var(--spacing-gutter)] py-16 md:grid-cols-12 md:py-24">
          <Reveal className="md:col-span-3">
            <SnowNode className="h-24 w-24 text-ink md:h-32 md:w-32" />
          </Reveal>
          <Reveal className="md:col-span-8 md:col-start-5">
            <h2 id="name-title" className="text-[length:var(--text-2xl)] leading-[var(--text-2xl--line-height)] tracking-[-0.03em] text-ink">
              The name comes from a childhood arcade game.
            </h2>
            <p className="mt-4 max-w-[58ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">
              The inspiration ends at the feeling: winter, play, and the
              satisfaction of something done properly. The mark is a six-armed
              node, a snowflake and a graph vertex at once. Hover it in the
              header; it turns a sixth of a circle and lands exactly where it
              started.
            </p>
            <div className="mt-8">
              <Button href="/contact" keyGlyph="next">
                Start a project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
