import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Software platforms, SaaS products, AI applications, developer tools, cloud infrastructure, and automation — engineered end to end.",
  path: "/services",
});

const process = [
  {
    step: "01",
    title: "Understand",
    body: "We start with the domain and the constraints, not the tech. What has to be true for this to matter in a year?",
  },
  {
    step: "02",
    title: "Shape",
    body: "Architecture, interfaces, and a thin vertical slice that proves the hardest part first.",
  },
  {
    step: "03",
    title: "Build",
    body: "Iterative delivery with performance budgets, tests, and observability in from day one.",
  },
  {
    step: "04",
    title: "Hand over",
    body: "Documented decisions and a system your team can own. We aim to make ourselves unnecessary.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we engineer, and how we approach it."
        lead="Six disciplines, one standard. We take a project end to end — from the first architecture sketch to a system your team can run without us."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <Section>
        <div className="flex flex-col divide-y divide-border">
          {services.map((service, i) => (
            <Reveal
              as="div"
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 py-12 first:pt-0"
            >
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12">
                <span className="text-sm text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="max-w-3xl">
                  <h2 className="text-[length:var(--text-2xl)] font-medium leading-[var(--text-2xl--line-height)]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-secondary">
                    {service.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.capabilities.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-elevated">
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="mt-4 text-[length:var(--text-3xl)] font-normal leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            A predictable path through unpredictable work.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <Reveal as="div" key={p.step}>
              <p className="text-sm text-accent-strong tabular-nums">{p.step}</p>
              <h3 className="mt-3 text-xl font-medium">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
