import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { github, repos } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Open source",
  description:
    "Public repositories from SNOWBROS: Atlas, Mentor, Accounic and the source of shipped client platforms.",
  path: "/open-source",
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

export default function OpenSourcePage() {
  return (
    <>
      <PageHeader
        title="Code you can read before you hire us."
        lead="Our tools live in the open, and so does the source of several shipped platforms. It is the most honest portfolio we can offer."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Open source", href: "/open-source" },
        ]}
      >
        <div className="enter mt-8 flex flex-wrap gap-3" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
          <Button href={github.org}>snowbros-labs</Button>
          <Button href={github.url} variant="secondary">
            @{github.handle}
          </Button>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] py-16 md:py-24">
        <RevealGroup as="ul" className="border-t border-ink">
          {repos.map((r) => (
            <li key={r.name} className="border-b border-hairline-strong">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/repo grid gap-x-8 gap-y-2 py-6 md:grid-cols-12 md:items-baseline"
              >
                <span className="font-mono text-[17px] text-ink transition-colors duration-[160ms] group-hover/repo:text-accent md:col-span-3">
                  {r.name}
                  <span aria-hidden className="ml-2 inline-flex align-middle text-muted transition-transform duration-[160ms] group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5 group-hover/repo:text-accent">
                    <Icon name="arrow-up-right" className="text-[15px]" />
                  </span>
                </span>
                <span className="text-[15px] leading-relaxed text-secondary md:col-span-6">{r.description}</span>
                <span className="meta md:col-span-3 md:text-right">
                  {r.language}, updated {fmt(r.updated)}
                </span>
              </a>
            </li>
          ))}
        </RevealGroup>
      </div>
    </>
  );
}
