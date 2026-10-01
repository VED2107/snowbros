import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TitleBlock } from "@/components/sheet/title-block";
import { AnnotatedShot } from "@/components/sheet/annotated-shot";
import { RevisionBlock } from "@/components/sheet/revision-block";
import { SelfAudit } from "@/components/sheet/self-audit";
import { DrawingNotes, projectRows } from "@/components/work/project-sheet";
import { caseStudies, getProject, projectHref } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.caseHref) return {};
  return pageMetadata({
    title: `${project.client}: case study`,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    images: project.media[0] ? [`${site.url}${project.media[0].src}`] : undefined,
  });
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <Reveal className="plot">
        <div className="plot-rule h-px w-full bg-ink" aria-hidden />
        <h2
          id={`${id}-h`}
          className="pt-4 text-[length:var(--text-2xl)] leading-[var(--text-2xl--line-height)] tracking-[-0.03em] text-ink"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || p.caseHref) notFound();

  const order = caseStudies;
  const next = order[(order.findIndex((x) => x.slug === slug) + 1) % order.length];
  const [hero, ...moreMedia] = p.media;

  const toc = [
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    p.decisions.length > 0 && { id: "decisions", label: "Decisions" },
    p.features.length > 0 && { id: "scope", label: "Scope" },
    p.revisions && { id: "revisions", label: "Revisions" },
    p.slug === "snowbros-website" && { id: "inspection", label: "Inspection" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.client,
            headline: p.title,
            description: p.summary,
            dateCreated: p.year,
            keywords: p.technologies.join(", "),
            image: hero ? `${site.url}${hero.src}` : undefined,
            url: `${site.url}/work/${p.slug}`,
            creator: { "@type": "Organization", name: site.name, url: site.url },
            ...(p.links?.live ? { sameAs: [p.links.live] } : {}),
          }),
        }}
      />

      <PageHeader
        title={p.title}
        lead={p.summary}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: p.client, href: `/work/${p.slug}` },
        ]}
      >
        {(p.links?.live || p.links?.github) && (
          <div
            className="enter mt-8 flex flex-wrap gap-3"
            style={{ "--enter-delay": "180ms" } as React.CSSProperties}
          >
            {p.links?.live && (
              <Button href={p.links.live} size="md">
                Visit {p.host ?? "the live site"}
              </Button>
            )}
            {p.links?.github && (
              <Button href={p.links.github} variant="secondary" size="md">
                Source on GitHub
              </Button>
            )}
          </div>
        )}
      </PageHeader>

      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] pt-12 md:pt-16">
        {hero && (
          <Reveal>
            {hero.annotations ? (
              <AnnotatedShot m={hero} priority />
            ) : (
              <div className={hero.tone === "night" ? "frame-night" : "frame"}>
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  width={hero.width}
                  height={hero.height}
                  priority
                  sizes="(min-width: 1240px) 1144px, 100vw"
                  className="block h-auto w-full"
                />
              </div>
            )}
          </Reveal>
        )}
      </div>

      <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        {/* Sheet index + title block */}
        <aside className="lg:col-span-4">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <TitleBlock
              heading={p.client}
              rows={[
                { label: "Client", value: p.kind === "client" ? p.client : p.kind === "product" ? "SNOWBROS product" : "Personal project" },
                { label: "Category", value: p.category },
                ...projectRows(p),
              ]}
            />
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="meta mb-2">On this sheet</p>
              <ul>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="group/toc flex items-center gap-3 py-1.5 text-[14px] text-secondary transition-colors duration-[160ms] hover:text-ink"
                    >
                      <span
                        aria-hidden
                        className="h-px w-3 bg-hairline-strong transition-[width,background-color] duration-[280ms] ease-[var(--ease-out-soft)] group-hover/toc:w-5 group-hover/toc:bg-accent"
                      />
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="grid gap-16 lg:col-span-8 md:gap-20">
          <Block id="problem" title="The problem">
            <p className="max-w-[62ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">{p.problem}</p>
          </Block>

          <Block id="approach" title="What we built">
            <p className="max-w-[62ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">{p.solution}</p>
            {moreMedia.length > 0 && (
              <div className="mt-10 grid gap-6">
                {moreMedia.map((m) =>
                  m.annotations ? (
                    <AnnotatedShot key={m.src} m={m} noteColumns={2} sizes="(min-width: 1024px) 760px, 100vw" />
                  ) : (
                    <div key={m.src} className={m.tone === "night" ? "frame-night p-3 sm:p-6" : "frame"}>
                      <Image
                        src={m.src}
                        alt={m.alt}
                        width={m.width}
                        height={m.height}
                        sizes="(min-width: 1024px) 760px, 100vw"
                        className="block h-auto w-full rounded-[4px]"
                      />
                    </div>
                  ),
                )}
              </div>
            )}
          </Block>

          {p.decisions.length > 0 && (
            <Block id="decisions" title="Decisions, and why">
              <DrawingNotes decisions={p.decisions} />
            </Block>
          )}

          {p.features.length > 0 && (
            <Block id="scope" title="Scope">
              <RevealGroup as="ul" className="grid gap-x-8 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 border-t border-hairline py-3.5 text-[15px] leading-snug text-ink">
                    <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                    {f}
                  </li>
                ))}
              </RevealGroup>
              <p className="meta mt-6">Built with {p.technologies.join(", ")}</p>
            </Block>
          )}

          {p.slug === "snowbros-website" && (
            <Block id="inspection" title="Inspected with our own tool">
              <SelfAudit />
            </Block>
          )}

          {p.revisions && (
            <Block id="revisions" title="Release history">
              <RevisionBlock revisions={p.revisions} caption={`${p.client}, recent releases`} />
            </Block>
          )}
        </div>
      </div>

      {/* Next sheet */}
      {next && next.slug !== p.slug && (
        <div className="border-t border-ink">
          <Link
            href={projectHref(next)}
            className="group/next mx-auto grid max-w-[1240px] items-center gap-8 px-[var(--spacing-gutter)] py-12 md:grid-cols-12 md:py-16"
          >
            <div className="md:col-span-7">
              <p className="meta">Next sheet</p>
              <p className="mt-3 text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink transition-colors duration-[160ms] group-hover/next:text-accent">
                {next.client}{" "}
                <span aria-hidden className="inline-block transition-transform duration-[280ms] ease-[var(--ease-out-soft)] group-hover/next:translate-x-2">
                  <Icon name="arrow-right" className="text-[0.8em]" />
                </span>
              </p>
              <p className="mt-2 max-w-[48ch] text-[15px] text-secondary">{next.title}</p>
            </div>
            {next.media[0] && (
              <div className="md:col-span-4 md:col-start-9">
                <div className={next.media[0].tone === "night" ? "frame-night" : "frame"}>
                  <Image
                    src={next.media[0].src}
                    alt=""
                    width={next.media[0].width}
                    height={next.media[0].height}
                    sizes="360px"
                    className="block aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-[700ms] ease-[var(--ease-out-soft)] group-hover/next:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
              </div>
            )}
          </Link>
        </div>
      )}
    </>
  );
}
