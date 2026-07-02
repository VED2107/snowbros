import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Experiments, prototypes, and research from SNOWBROS — where we explore ideas before they become products.",
  alternates: { canonical: "/labs" },
};

const experiments = [
  {
    title: "Grounded retrieval sandbox",
    status: "Ongoing",
    body: "A test bed for measuring citation accuracy across retrieval strategies under adversarial questions.",
  },
  {
    title: "Edge-rendered 3D",
    status: "Prototype",
    body: "Streaming low-poly scenes with progressive enhancement so the story survives even without WebGL.",
  },
  {
    title: "Zero-config observability",
    status: "Research",
    body: "What would it take for a new service to emit useful traces, metrics, and logs on its first deploy?",
  },
  {
    title: "Deterministic build caches",
    status: "Ongoing",
    body: "Chasing reproducible builds where the same input always yields a byte-identical artifact.",
  },
];

export default function LabsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="Where we think out loud."
        lead="Rough by design. These are experiments we run to learn — some become products, most become better instincts."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Labs", href: "/labs" },
        ]}
      />

      <Section>
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {experiments.map((e) => (
            <Reveal as="div" key={e.title}>
              <Card className="h-full">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-muted">{e.status}</span>
                </div>
                <h2 className="mt-5 text-xl font-medium">{e.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {e.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
