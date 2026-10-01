import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "SNOWBROS is small on purpose. There are no open roles right now.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="No open roles right now."
        lead="SNOWBROS is small on purpose. If you would like to collaborate on a future project, we would still like to see your work."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
      />

      <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <h2 className="text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink">
            Send us something you built.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[length:var(--text-lg)] leading-[1.7] text-secondary">
            A repository, a shipped product, or a write-up of a hard problem
            and how you reasoned about it.
          </p>
          <div className="mt-8">
            <Button href={`mailto:${site.email}?subject=Collaboration`} keyGlyph="next">
              Send your work
            </Button>
          </div>
        </Reveal>
      </div>
    </>
  );
}
