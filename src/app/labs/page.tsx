import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { RevealGroup } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Labs",
  description:
    "Unfinished work from SNOWBROS: prototypes and side projects, labelled honestly with where they stand.",
  path: "/labs",
});

const experiments = [
  {
    title: "Snow island",
    status: "Prototype, not shipped",
    body: "A low-poly engineering island in React Three Fiber, explored as a visual identity for this site. The live site leads with product screenshots instead; the prototype stays in the repository.",
    stack: "React Three Fiber, Drei, Three.js",
  },
  {
    title: "filmica",
    status: "Side project",
    body: "A cross-platform film companion app.",
    stack: "Flutter, Dart",
  },
  {
    title: "guesser",
    status: "Experiment",
    body: "A small guessing game.",
    stack: "TypeScript",
  },
];

export default function LabsPage() {
  return (
    <>
      <PageHeader
        title="Work that is not finished, labelled as such."
        lead="Prototypes and side projects, with an honest note on where each one stands."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Labs", href: "/labs" },
        ]}
      />

      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
        <RevealGroup as="ul" className="grid gap-x-8 md:grid-cols-2">
          {experiments.map((e) => (
            <li key={e.title} className="border-t border-ink py-7 md:pr-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[length:var(--text-2xl)] leading-tight tracking-[-0.03em] text-ink">{e.title}</h2>
                <span className="meta shrink-0">{e.status}</span>
              </div>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-secondary">{e.body}</p>
              <p className="meta mt-4">{e.stack}</p>
            </li>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
