import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { LivePreview } from "@/components/ui/live-preview";
import { Icon } from "@/components/ui/icon";
import { projects, getProject } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.client} — Case Study`,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const facts = [
    { label: "Status", value: project.status },
    { label: "Role", value: project.role },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    { label: "Host", value: project.host },
  ];

  const sections = [
    { heading: "Overview", body: project.overview },
    { heading: "The problem", body: project.problem },
    { heading: "The solution", body: project.solution },
  ];

  const next =
    projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  return (
    <>
      <PageHeader
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        lead={project.summary}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: project.client, href: `/work/${project.slug}` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: project.title,
            description: project.summary,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            url: `${site.url}/work/${project.slug}`,
          }),
        }}
      />

      {/* Preview + quick facts + links */}
      <Section className="!pb-0">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <Reveal>
            <LivePreview
              name={project.client}
              host={project.host}
              accent={project.accent}
              tagline={project.tagline}
              category={project.category}
              screenshot={project.screenshot}
              className="shadow-[0_30px_80px_-44px_rgba(23,23,23,0.4)]"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <dl className="flex flex-col divide-y divide-border rounded-[var(--radius-lg)] border border-border">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="text-right text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>

            {(project.links?.live || project.links?.github) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {project.links?.live && (
                  <Button href={project.links.live} size="sm" variant="primary">
                    <Icon name="external" className="text-[16px]" />
                    Live demo
                  </Button>
                )}
                {project.links?.github && (
                  <Button
                    href={project.links.github}
                    size="sm"
                    variant="secondary"
                  >
                    <Icon name="github" className="text-[16px]" />
                    GitHub
                  </Button>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* Narrative */}
      <Section>
        <div className="mx-auto grid max-w-3xl gap-12">
          {sections.map((s, i) => (
            <Reveal as="div" key={s.heading} delay={i * 0.03}>
              <h2 className="text-[length:var(--text-2xl)] font-medium">
                {s.heading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-secondary">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Technologies */}
      <Section className="border-t border-border bg-elevated">
        <Reveal>
          <p className="eyebrow">Technologies</p>
          <h2 className="mt-4 text-[length:var(--text-2xl)] font-medium">
            The stack behind it.
          </h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Highlights + features */}
      <Section className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow">Engineering highlights</p>
              <h2 className="mt-4 text-[length:var(--text-2xl)] font-medium">
                What made it work.
              </h2>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-col gap-4">
              {project.highlights.map((h) => (
                <Reveal as="div" key={h} className="flex gap-3">
                  <Icon
                    name="check"
                    className="mt-1 text-[18px] text-accent-strong"
                  />
                  <p className="text-sm leading-relaxed text-secondary">{h}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">Key features</p>
              <h2 className="mt-4 text-[length:var(--text-2xl)] font-medium">
                What it delivers.
              </h2>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-col divide-y divide-border">
              {project.features.map((f) => (
                <Reveal as="div" key={f} className="py-4 first:pt-0">
                  <p className="text-sm leading-relaxed text-secondary">{f}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* CTA + next */}
      <Section className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--radius-xl)] border border-border bg-surface p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-[length:var(--text-2xl)] font-medium">
              Building something similar?
            </h2>
            <p className="mt-3 max-w-md text-secondary">
              Tell us what you&rsquo;re working on. We reply to every serious
              inquiry within two working days.
            </p>
          </div>
          <Button href="/contact" size="lg">
            Start a project
            <Icon name="arrow-right" className="text-[18px]" />
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-ink"
          >
            <Icon name="arrow-left" className="text-[16px]" />
            All work
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-ink"
          >
            Next: {next.client}
            <Icon name="arrow-right" className="text-[16px]" />
          </Link>
        </div>
      </Section>
    </>
  );
}
