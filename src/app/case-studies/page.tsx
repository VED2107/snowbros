import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth accounts of how SNOWBROS approached hard engineering problems — the constraints, the decisions, and the outcomes.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="The reasoning behind the work."
        lead="Not highlight reels — honest accounts of the constraints we worked within and the trade-offs we chose."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ]}
      />

      <Section>
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Reveal as="div" key={project.slug}>
              <Card href={`/work/${project.slug}`} noArrow className="h-full">
                <p className="text-xs text-muted">
                  {project.category} · {project.year}
                </p>
                <h2 className="mt-4 text-xl font-medium leading-tight">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {project.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent-strong">
                  Read case study
                  <Icon
                    name="arrow-right"
                    className="text-[15px] transition-transform duration-300 group-hover/card:translate-x-0.5"
                  />
                </span>
              </Card>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
