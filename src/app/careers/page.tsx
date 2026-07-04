import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join a small studio that takes craft seriously. Open roles in product engineering, infrastructure, and applied AI.",
  path: "/careers",
});

const roles = [
  {
    title: "Staff Product Engineer",
    location: "Remote · Full-time",
    body: "Own products end to end, from architecture to the details users feel. Deep TypeScript and a taste for restraint.",
  },
  {
    title: "Infrastructure Engineer",
    location: "Remote · Full-time",
    body: "Make our platforms boring. Reproducible builds, observability, and reliability as a product.",
  },
  {
    title: "Applied AI Engineer",
    location: "Remote · Contract → Full-time",
    body: "Ship AI features with evaluation baked in. Retrieval, agents, and a healthy distrust of demos.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Fewer people, deeper work."
        lead="We hire slowly and stay small. If you care more about how software is made than how loudly it launches, we should talk."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
      />

      <Section>
        <RevealGroup className="flex flex-col gap-4">
          {roles.map((role) => (
            <Reveal as="div" key={role.title}>
              <Card interactive className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-medium">{role.title}</h2>
                  <p className="mt-1 text-sm text-muted">{role.location}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">
                    {role.body}
                  </p>
                </div>
                <Button
                  href={`mailto:${site.email}?subject=Application: ${role.title}`}
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                >
                  Apply
                </Button>
              </Card>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mt-12 text-sm text-secondary">
            Don&rsquo;t see your role?{" "}
            <a
              href={`mailto:${site.email}?subject=Open application`}
              className="text-accent-strong underline-offset-4 hover:underline"
            >
              Send an open application
            </a>
            . We read every one.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
