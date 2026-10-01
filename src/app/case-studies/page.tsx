import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { RevealGroup } from "@/components/motion/reveal";
import { projects, projectHref } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "In-depth accounts of how SNOWBROS approached hard engineering problems, the constraints, the decisions, and the outcomes.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="The reasoning behind the work."
        lead="Every project with its year, its category and the one line that says what it is."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/case-studies" },
        ]}
      />

      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
        <RevealGroup as="ol" className="border-t border-ink">
          {projects.map((project) => (
            <li key={project.slug} className="border-b border-hairline-strong">
              <Link
                href={projectHref(project)}
                className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-12 md:items-baseline"
              >
                <span className="meta md:col-span-2">
                  {project.year}, {project.category}
                </span>
                <span className="md:col-span-7">
                  <span className="block text-[length:var(--text-xl)] tracking-[-0.025em] text-ink transition-colors duration-[160ms] group-hover:text-accent">
                    {project.client}
                  </span>
                  <span className="mt-1 block max-w-[60ch] text-[15px] leading-relaxed text-secondary">{project.title}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[14px] text-ink md:col-span-3 md:justify-end">
                  {project.caseHref ? "Product page" : "Case study"}
                  <Icon name="arrow-right" className="text-[14px] text-accent transition-transform duration-[160ms] group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
