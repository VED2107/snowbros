import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { SheetHead } from "@/components/sheet/sheet-head";
import { ProjectSheet } from "@/components/work/project-sheet";
import { ProjectPair } from "@/components/work/project-pair";
import { ProjectIndex } from "@/components/work/project-index";
import { toIndexItems } from "@/components/work/index-items";
import { projects } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Systems SNOWBROS has designed and engineered: a retail POS with an offline till, a multi-currency ledger, an open-source static analyzer, an academic platform and commerce builds.",
  path: "/work",
});

const LAYOUTS = ["full", "plate", "split"] as const;

export default function WorkPage() {
  const lead = projects.filter((p) => p.tier === "lead");
  const feature = projects.filter((p) => p.tier === "feature");
  const index = projects.filter((p) => p.tier === "index");

  return (
    <>
      <PageHeader
        title="Work, shown with its reasoning."
        lead="Each project below is live or released. For the larger ones we show the decisions that shaped them, not just the screens."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
        ]}
      />

      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
        <div className="grid gap-24 md:gap-32">
          {lead.map((p, i) => (
            <ProjectSheet key={p.slug} p={p} layout={LAYOUTS[i % 3]} priority={i === 0} />
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <SheetHead title="Platforms and commerce." />
          <div className="mt-12">
            <ProjectPair items={feature} />
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <SheetHead title="Tools, brand work and experiments." />
          <div className="mt-10">
            <ProjectIndex items={toIndexItems(index)} />
          </div>
        </div>
      </div>
    </>
  );
}
