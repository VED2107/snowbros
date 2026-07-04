import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { LivePreview } from "@/components/ui/live-preview";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work from SNOWBROS — education platforms, luxury e-commerce, and creative engineering, shipped end to end and live in production.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="// selected work"
        title="Products we've engineered end to end."
        lead="Real, shipped systems — each live in production. Shown in depth rather than in bulk."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
        ]}
      />

      <Section>
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal as="div" key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="card-engineered card-glow group/case grid overflow-hidden lg:grid-cols-2"
                >
                  {/* preview */}
                  <div
                    className={
                      "overflow-hidden bg-elevated p-6 md:p-9 " +
                      (reversed ? "lg:order-2" : "lg:order-1")
                    }
                  >
                    <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/case:scale-[1.02]">
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

                  {/* content */}
                  <div
                    className={
                      "flex flex-col justify-between gap-8 p-8 md:p-11 " +
                      (reversed ? "lg:order-1" : "lg:order-2")
                    }
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        <span className="inline-flex items-center gap-2 text-accent">
                          <span className="status-dot scale-75" /> {project.status}
                        </span>
                        <span>· {project.category}</span>
                        <span>· {project.year}</span>
                      </div>
                      <h2 className="mt-5 text-[length:var(--text-2xl)] font-semibold leading-tight tracking-[-0.02em]">
                        {project.client}
                      </h2>
                      <p className="mt-2 font-mono text-xs text-muted">
                        {project.role}
                      </p>
                      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-secondary">
                        {project.summary}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] text-secondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-hairline pt-6">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                          Case study
                          <Icon
                            name="arrow-right"
                            className="text-[15px] transition-transform duration-300 group-hover/case:translate-x-1"
                          />
                        </span>
                        {project.links?.live && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                            <Icon name="external" className="text-[13px]" />
                            {project.host}
                          </span>
                        )}
                        {project.links?.github && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                            <Icon name="github" className="text-[13px]" />
                            Source
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
