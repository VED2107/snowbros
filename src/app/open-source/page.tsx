import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open Source",
  description:
    "Tools and libraries SNOWBROS maintains in the open — small, sharp, and dependable.",
  alternates: { canonical: "/open-source" },
};

const repos = [
  {
    name: "flake",
    lang: "TypeScript",
    body: "A tiny, dependency-free snow particle system tuned for reduced-motion and 60fps on low-end devices.",
  },
  {
    name: "budgeteer",
    lang: "Node",
    body: "Enforce performance budgets in CI. Fail the build when bundles, LCP, or interaction latency regress.",
  },
  {
    name: "grounded",
    lang: "Python",
    body: "A minimal harness for scoring retrieval-augmented answers against a reference dataset.",
  },
];

export default function OpenSourcePage() {
  return (
    <>
      <PageHeader
        eyebrow="Open source"
        title="Small tools, given back."
        lead="We open-source the pieces that are useful beyond a single project. Well-documented, sharply scoped, and maintained."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Open Source", href: "/open-source" },
        ]}
      />

      <Section>
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {repos.map((r) => (
            <Reveal as="div" key={r.name}>
              <Card href={site.social.github} noArrow className="h-full">
                <div className="flex items-center justify-between">
                  <h2 className="font-mono text-lg">{r.name}</h2>
                  <span className="text-xs text-muted">{r.lang}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  {r.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent-strong">
                  View on GitHub
                  <Icon
                    name="arrow-up-right"
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
