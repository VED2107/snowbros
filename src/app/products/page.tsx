import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/lib/site";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Products engineered and maintained by SNOWBROS. Starting with Atlas — deterministic static analysis for JavaScript & TypeScript.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Software we build for ourselves, in the open."
        lead="SNOWBROS is a product studio. These are the tools we ship and stand behind — starting with Atlas."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <Section>
        <RevealGroup className="grid gap-6">
          {products.map((p) => (
            <Reveal as="div" key={p.slug}>
              <Link
                href={p.href}
                className="card-engineered card-glow group/prod block overflow-hidden p-8 md:p-10"
              >
                <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
                  <span className="grid h-16 w-16 place-items-center rounded-[var(--radius-lg)] border border-hairline bg-accent-weak">
                    <Image src={p.logo} alt="" width={40} height={40} unoptimized className="h-10 w-10" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-[-0.02em]">
                        {p.fullName}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] text-accent">
                        <span className="status-dot scale-[0.6]" />
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
                      {p.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Learn more
                      <Icon
                        name="arrow-right"
                        className="text-[16px] transition-transform duration-300 group-hover/prod:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
