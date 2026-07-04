import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { values, stats } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "SNOWBROS is an independent software engineering studio founded by Ved Chauhan, building software for startups, businesses, and founders — engineered for long-term maintainability, scalability, and performance.",
  path: "/about",
});

const principles = [
  {
    heading: "Winter, wonder, and precision",
    body: "The studio takes its name from childhood winters and the quiet joy of building something well. That feeling — calm, curious, exacting — is how we like to work: unhurried, but never careless.",
  },
  {
    heading: "Small on purpose",
    body: "We stay deliberately small so that the people who scope your project are the people who build it. There is no handoff to a junior team, no account layer between you and the engineers.",
  },
  {
    heading: "Boring where it counts",
    body: "We reach for proven tools and clear architecture. Novelty is reserved for the product surface, not the foundation your business will depend on.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="// about the studio"
        title="Engineering products with longevity."
        lead="SNOWBROS is an independent software engineering studio founded by Ved Chauhan. We build modern software for startups, businesses, and ambitious founders — from premium websites to AI-powered platforms and developer tooling. Every product is designed with long-term maintainability, scalability, and performance in mind."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <Section>
        <RevealGroup className="grid gap-12 md:grid-cols-3">
          {principles.map((p) => (
            <Reveal as="div" key={p.heading}>
              <h2 className="text-xl font-medium">{p.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-secondary">
                {p.body}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <Section className="border-t border-border bg-elevated">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="max-w-md text-[length:var(--text-3xl)] font-normal leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
              What we hold ourselves to.
            </h2>
          </Reveal>
          <RevealGroup className="flex flex-col divide-y divide-border">
            {values.map((v) => (
              <Reveal as="div" key={v.title} className="py-8 first:pt-0">
                <h3 className="text-xl font-medium">{v.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-secondary">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <RevealGroup className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal as="div" key={s.label}>
              <p className="font-mono text-[length:var(--text-3xl)] font-semibold tracking-[var(--text-3xl--letter-spacing)]">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-secondary">{s.label}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Founder */}
      <Section className="border-t border-hairline bg-elevated">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">// founder</p>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 rounded-[var(--radius-lg)] border border-hairline bg-card p-7 shadow-[0_1px_2px_rgba(23,23,23,0.05)]">
                <div className="flex items-center gap-4">
                  <Image
                    src="/developer.jpeg"
                    alt="Ved Chauhan — founder of SNOWBROS"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover object-[center_20%] ring-1 ring-inset ring-[rgba(36,66,58,0.18)]"
                  />
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.01em]">
                      {site.founder.name}
                    </p>
                    <p className="font-mono text-xs text-muted">
                      {site.founder.role}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={site.social.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name="external" className="text-[13px]" /> Portfolio
                  </a>
                  <a
                    href={site.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name="github" className="text-[13px]" /> GitHub
                  </a>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] text-secondary transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name="linkedin" className="text-[13px]" /> LinkedIn
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-[length:var(--text-xl)] leading-relaxed text-ink">
                {site.founder.bio}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-[15px] leading-relaxed text-secondary">
                {site.founder.longBio}
              </p>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-wrap gap-2">
              {site.founder.expertise.map((e) => (
                <Reveal
                  as="span"
                  key={e}
                  className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary"
                >
                  {e}
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>
    </>
  );
}
