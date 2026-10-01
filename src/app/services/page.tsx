import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { SheetHead } from "@/components/sheet/sheet-head";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getProject, projectHref, projects, services } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Software engineering, full-stack development, SaaS platforms, AI, automation, cloud infrastructure, UI/UX engineering and technical consulting, each mapped to shipped work.",
  path: "/services",
});

export default function ServicesPage() {
  // Columns: every project that proves at least one capability.
  const cols = projects.filter((p) => services.some((s) => s.proof.includes(p.slug)));

  return (
    <>
      <PageHeader
        title="Eight capabilities. One team responsible for all of them."
        lead="We take an engineering problem end to end, from the data model to the screen to the release pipeline. Below, each capability is tied to the shipped work where you can see it."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      {/* Capabilities, as a two-column specification */}
      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
        <RevealGroup as="ul" className="grid gap-x-8 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} id={s.slug} className="scroll-mt-24 border-t border-ink py-8 md:pr-6">
              <h2 className="text-[length:var(--text-2xl)] leading-[var(--text-2xl--line-height)] tracking-[-0.03em] text-ink">
                {s.title}
              </h2>
              <p className="mt-3 max-w-[50ch] text-[16px] leading-relaxed text-secondary">{s.summary}</p>
              <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2 text-[14px]">
                <dt className="meta pt-[2px]">Typical work</dt>
                <dd className="text-ink">{s.capabilities.join(", ")}</dd>
                <dt className="meta pt-[2px]">Tools</dt>
                <dd className="text-ink">{s.stack.join(", ")}</dd>
                <dt className="meta pt-[2px]">Seen in</dt>
                <dd className="flex flex-wrap gap-x-3">
                  {s.proof.map((slug) => {
                    const p = getProject(slug);
                    return p ? (
                      <Link key={slug} href={projectHref(p)} className="link-accent">
                        {p.client}
                      </Link>
                    ) : null;
                  })}
                </dd>
              </dl>
            </li>
          ))}
        </RevealGroup>
      </div>

      {/* The proof map */}
      <section aria-labelledby="map-title" className="hidden border-y border-hairline bg-elevated md:block">
        <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
          <SheetHead
            id="map-title"
            title="Where each capability shows up."
            lead="Rows are capabilities, columns are shipped projects. A node marks where the capability carried real weight."
          />
          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse border border-ink bg-surface text-[13px]">
              <caption className="sr-only">Capabilities by project</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="meta w-[13rem] px-4 py-3 text-left font-normal">
                    Capability
                  </th>
                  {cols.map((p) => (
                    <th key={p.slug} scope="col" className="border-l border-hairline-strong px-2 py-3 text-center font-normal">
                      <Link href={projectHref(p)} className="text-ink transition-colors duration-[160ms] hover:text-accent">
                        {p.client.replace("Snowbros ", "")}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.slug} className="group/row border-b border-hairline last:border-b-0 hover:bg-[#f6f2ea]">
                    <th scope="row" className="px-4 py-3 text-left font-normal text-ink">
                      <a href={`#${s.slug}`} className="hover:text-accent">{s.title}</a>
                    </th>
                    {cols.map((p) => {
                      const on = s.proof.includes(p.slug);
                      return (
                        <td key={p.slug} className="border-l border-hairline-strong px-2 py-3 text-center">
                          {on ? (
                            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/15">
                              <span className="sr-only">Yes</span>
                            </span>
                          ) : (
                            <span aria-hidden className="inline-block h-px w-3 bg-hairline-strong" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="engage-title">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-[var(--spacing-gutter)] py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <h2
              id="engage-title"
              className="text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink"
            >
              Most work starts with a short written brief.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">
              Tell us what exists today, what has to change, and what a good
              outcome looks like. We reply with questions, a proposed shape for
              the system, and how we would sequence the first weeks.
            </p>
          </Reveal>
          <Reveal className="flex flex-wrap items-end gap-x-6 gap-y-4 lg:col-span-4 lg:col-start-9">
            <Button href="/contact" size="lg" keyGlyph="next">
              Start a project
            </Button>
            <Button href="/about#process-title" variant="text" keyGlyph="next">
              How an engagement runs
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
