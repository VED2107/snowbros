import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { LivePreview } from "@/components/ui/live-preview";
import { ServiceCard } from "@/components/ui/service-card";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import {
  services,
  projects,
  values,
  processSteps,
  techStack,
  testimonials,
  repos,
  github,
  clientLogos,
  comparisonRows,
} from "@/lib/content";
import { site } from "@/lib/site";

/* Shared section heading — mono eyebrow + sans title + optional link */
function SectionHead({
  eyebrow,
  title,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            {title}
          </h2>
        </Reveal>
      </div>
      {href && cta && (
        <Reveal delay={0.1}>
          <Button href={href} variant="secondary" size="sm">
            {cta}
            <Icon name="arrow-right" className="text-[16px]" />
          </Button>
        </Reveal>
      )}
    </div>
  );
}

export default function HomePage() {
  const [feature, ...rest] = projects;
  const bentoSpans = ["md:col-span-4", "md:col-span-2", "md:col-span-6"];

  return (
    <>
      <Hero />

      {/* Capability strip — quiet, technical */}
      <div className="border-y border-hairline bg-elevated">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-[var(--spacing-gutter)] py-5 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          {[
            "Software Platforms",
            "SaaS Products",
            "AI Applications",
            "Developer Tools",
            "Cloud Infrastructure",
          ].map((c, i) => (
            <span key={c} className="flex items-center gap-8">
              {i > 0 && <span className="text-accent/40">/</span>}
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Trust bar — real, shipped clients only. Personal projects excluded. */}
      <div className="border-b border-hairline bg-background">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-[var(--spacing-gutter)] py-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Shipped for
          </span>
          {clientLogos.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group/brand flex flex-col items-center gap-2 opacity-70 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={c.logo}
                alt={c.name}
                width={120}
                height={32}
                className="h-7 w-auto object-contain"
              />
              <span
                style={{ fontFamily: `var(${c.brandFont})` }}
                className="text-[13px] text-secondary transition-colors group-hover/brand:text-ink"
              >
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Services — engineering modules */}
      <Section>
        <SectionHead
          eyebrow="// what we do"
          title="A studio, not a factory."
          href="/services"
          cta="All services"
        />

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="div" key={service.slug}>
              <ServiceCard
                index={i + 1}
                href={`/services#${service.slug}`}
                icon={service.icon}
                title={service.title}
                summary={service.summary}
                capabilities={service.capabilities}
                stack={service.stack}
                metric={service.metric}
              />
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Architecture — SVG draws on scroll */}
      <Section className="border-t border-hairline bg-elevated">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Reveal>
              <p className="eyebrow">// how it fits together</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-md text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
                We ship systems, not screens.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-secondary">
                Every project is an architecture with clear boundaries — edge,
                API, data, and AI wired for reliability and observability from
                day one. Here&rsquo;s the shape most of our platforms take.
              </p>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-wrap gap-2">
              {["Row-Level Security", "Observability", "Evals", "IaC"].map(
                (t) => (
                  <Reveal
                    as="span"
                    key={t}
                    className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary"
                  >
                    {t}
                  </Reveal>
                ),
              )}
            </RevealGroup>
          </div>
          <Reveal delay={0.1}>
            <div className="card-engineered p-5 md:p-7">
              <ArchitectureDiagram />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Selected work — cinematic feature + bento grid */}
      <Section className="border-t border-hairline">
        <SectionHead
          eyebrow="// selected work"
          title="Systems we're proud of."
          href="/work"
          cta="All work"
        />

        {/* Feature project — full-width cinematic split */}
        <Reveal className="mt-16">
          <Link
            href={`/work/${feature.slug}`}
            className="card-engineered card-glow group/feat grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="order-2 flex flex-col justify-between gap-8 p-8 md:p-11 lg:order-1">
              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span className="flex items-center gap-2 text-accent">
                    <span className="status-dot scale-75" /> Live
                  </span>
                  <span>·</span>
                  <span>
                    {feature.category} · {feature.year}
                  </span>
                </div>
                <h3 className="mt-5 text-[length:var(--text-2xl)] font-semibold leading-tight tracking-[-0.02em]">
                  {feature.client}
                </h3>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-secondary">
                  {feature.summary}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-hairline bg-accent-weak/60 px-3 py-1.5 font-mono text-[12px] text-accent">
                  <Icon name="check" className="text-[13px]" />
                  {feature.result}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {feature.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-5 border-t border-hairline pt-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read case study
                    <Icon
                      name="arrow-right"
                      className="text-[16px] transition-transform duration-300 group-hover/feat:translate-x-1"
                    />
                  </span>
                  {feature.links?.live && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                      <Icon name="external" className="text-[13px]" />
                      {feature.host}
                    </span>
                  )}
                  {feature.links?.github && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                      <Icon name="github" className="text-[13px]" />
                      Source
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="order-1 overflow-hidden bg-elevated p-6 md:p-8 lg:order-2">
              <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/feat:scale-[1.02]">
                <LivePreview
                  name={feature.client}
                  host={feature.host}
                  accent={feature.accent}
                  tagline={feature.tagline}
                  category={feature.category}
                  screenshot={feature.screenshot}
                />
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Bento grid — varied spans */}
        <RevealGroup className="mt-5 grid gap-5 md:grid-cols-6">
          {rest.map((project, i) => (
            <Reveal
              as="div"
              key={project.slug}
              className={bentoSpans[i] ?? "md:col-span-3"}
            >
              <Link
                href={`/work/${project.slug}`}
                className="card-engineered card-glow group/card block h-full overflow-hidden p-5"
              >
                <div className="overflow-hidden rounded-[var(--radius-md)]">
                  <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/card:scale-[1.02]">
                    <LivePreview
                      name={project.client}
                      host={project.host}
                      accent={project.accent}
                      tagline={project.tagline}
                      category={project.category}
                      screenshot={project.screenshot}
                    />
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 px-1 pb-1 pt-6">
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                      <span className="inline-flex items-center gap-1.5 text-accent">
                        <span className="status-dot scale-[0.6]" /> {project.status}
                      </span>
                      · {project.year}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.01em]">
                      {project.client}
                    </h3>
                  </div>
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline text-secondary transition-[color,border-color,transform] duration-500 ease-[var(--ease-out-soft)] group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:border-accent group-hover/card:text-accent">
                    <Icon name="arrow-up-right" className="text-[18px]" />
                  </span>
                </div>
                <p className="mt-1 px-1 text-sm leading-relaxed text-secondary">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 px-1">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-hairline bg-background px-2 py-0.5 font-mono text-[10px] text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Process — sticky storytelling */}
      <Section className="border-t border-hairline bg-elevated">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow">// how we build</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-sm text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
                An engineering workflow, start to years-later.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-secondary">
                Eight stages, each with an owner and an exit criterion. Nothing
                is a phase we get to later.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="flex flex-col">
            {processSteps.map((step, i) => (
              <Reveal
                as="div"
                key={step.id}
                className="group/step flex gap-6 border-t border-hairline py-7 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <span className="h-px flex-1 origin-left scale-x-0 bg-accent/30 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/step:scale-x-100" />
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Tech stack — engineering wall */}
      <Section className="border-t border-hairline">
        <SectionHead
          eyebrow="// engineering wall"
          title="The tools we reach for, grouped by concern."
        />

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <Reveal as="div" key={group.title} className="bg-hairline">
              <div className="h-full bg-surface p-7">
                <h3 className="eyebrow mb-5">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-hairline bg-background px-2.5 py-1.5 font-mono text-[12px] text-secondary transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <Reveal as="div" className="bg-hairline">
            <div className="flex h-full flex-col justify-center bg-accent-weak p-7">
              <p className="font-mono text-sm text-accent">→ and more</p>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                We choose boring, proven tools on purpose. Novelty is earned,
                never assumed.
              </p>
            </div>
          </Reveal>
        </RevealGroup>
      </Section>

      {/* Open source — real GitHub data */}
      <Section className="border-t border-hairline">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">// open source</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
                Public work on GitHub.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface px-4 py-2 font-mono text-[13px] text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name="github" className="text-[16px]" />@{github.handle}
              <span className="text-muted">· {github.publicRepos} repos</span>
            </a>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <Reveal as="div" key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-engineered card-glow group/card flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-sm font-medium text-ink">
                    <Icon name="git-branch" className="text-[15px] text-muted" />
                    {repo.name}
                  </span>
                  <Icon
                    name="arrow-up-right"
                    className="text-[16px] text-muted transition-[color,transform] duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent"
                  />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-secondary">
                  {repo.description}
                </p>
                <div className="mt-5 flex items-center gap-4 border-t border-hairline pt-4 font-mono text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    {repo.language}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-accent">★</span>
                    {repo.stars}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5">
                    <Icon name="clock" className="text-[12px]" />
                    {new Date(repo.updated).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Testimonials — editorial, de-serifed */}
      <Section className="border-t border-hairline bg-elevated">
        <RevealGroup className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-hairline md:grid-cols-2">
          {testimonials.map((t) => (
            <Reveal as="figure" key={t.name} className="bg-hairline">
              <div className="flex h-full flex-col justify-between gap-8 bg-surface p-9 md:p-11">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  ★★★★★
                </p>
                <blockquote className="text-[length:var(--text-xl)] font-medium leading-snug tracking-[-0.01em] text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3 text-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-weak font-mono text-xs text-accent ring-1 ring-inset ring-[rgba(36,66,58,0.14)]">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="font-medium text-ink">{t.name}</span>
                    <span className="font-mono text-xs text-muted">
                      {" "}
                      · {t.role}
                    </span>
                  </span>
                </figcaption>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Philosophy */}
      <Section className="border-t border-hairline">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow">// how we work</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-md text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
                Quiet on the outside. Rigorous underneath.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/about"
                className="group/founder mt-10 flex max-w-md items-center gap-4 rounded-[var(--radius-lg)] border border-hairline bg-surface p-5 transition-colors hover:border-hairline-strong"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-weak font-mono text-sm text-accent ring-1 ring-inset ring-[rgba(36,66,58,0.14)]">
                  {site.founder.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {site.founder.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-muted">
                    {site.founder.role} · {site.location}
                  </span>
                </span>
                <Icon
                  name="arrow-up-right"
                  className="ml-auto text-[16px] text-muted transition-[color,transform] duration-300 group-hover/founder:-translate-y-0.5 group-hover/founder:translate-x-0.5 group-hover/founder:text-accent"
                />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="flex flex-col">
            {values.map((v, i) => (
              <Reveal
                as="div"
                key={v.title}
                className="grid gap-4 border-t border-hairline py-8 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em]">
                    {v.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-secondary">
                    {v.body}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-mono text-lg font-medium tabular-nums text-ink">
                    {v.metric.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {v.metric.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Comparison — honest positioning, not fabricated stats */}
      <Section className="border-t border-hairline bg-elevated">
        <SectionHead
          eyebrow="// why a studio"
          title="What actually changes when you hire us."
        />

        <Reveal className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface text-left text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  &nbsp;
                </th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                  SNOWBROS
                </th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Freelancer
                </th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-hairline last:border-b-0">
                  <td className="p-5 font-medium text-ink">{row.label}</td>
                  <td className="bg-accent-weak/50 p-5 font-medium text-accent">
                    {row.studio}
                  </td>
                  <td className="p-5 text-secondary">{row.freelancer}</td>
                  <td className="p-5 text-secondary">{row.agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* CTA — forest panel */}
      <Section className="border-t border-hairline">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-xl)] bg-primary px-8 py-20 text-center text-primary-foreground md:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent_70%)]"
            />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8fd8c0]">
              // start a conversation
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[length:var(--text-4xl)] leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-[#f8f9f8]">
              Have something worth engineering well?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-[#c3d0ca]">
              Tell us what you&rsquo;re building. We reply to every serious
              inquiry within two working days.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href="/contact"
                size="lg"
                className="bg-[#f8f9f8] text-primary hover:bg-white hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
              >
                Start a project
                <Icon name="arrow-right" className="text-[18px]" />
              </Button>
              <Link
                href="/about"
                className="inline-flex h-14 items-center px-6 text-base text-[#c3d0ca] transition-colors hover:text-white"
              >
                Learn about the studio
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
