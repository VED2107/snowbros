import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { products } from "@/lib/site";
import { getProject } from "@/lib/content";
import { PageHeader } from "@/components/sections/page-header";
import { TitleBlock } from "@/components/sheet/title-block";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Open-source tools engineered and maintained by SNOWBROS: Atlas, deterministic static analysis in Rust, and Mentor, an engineering-intelligence skill for Claude Code.",
  path: "/products",
});

const install: Record<string, string> = {
  atlas: "npx snowbros analyze",
  mentor: "git clone github.com/snowbros-labs/mentor-skill",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Tools we build for ourselves, and publish."
        lead="Everything here started as something we needed on client work. Both are open source, and both are used on the projects in our portfolio."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />

      <div className="mx-auto grid max-w-[1240px] gap-24 px-[var(--spacing-gutter)] py-16 md:gap-32 md:py-24">
        {products.map((p, i) => {
          const proj = getProject(p.slug);
          const shot = proj?.media[0];
          return (
            <article key={p.slug} className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <Reveal className={i % 2 ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}>
                <div className="plot-rule mb-6 h-px w-full bg-ink" aria-hidden />
                <div className="flex items-center gap-3">
                  <Image src={p.logo} alt="" width={36} height={36} unoptimized className="h-9 w-9" />
                  <h2 className="text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)] text-ink">
                    <Link href={p.href} className="transition-colors duration-[160ms] hover:text-accent">
                      {p.fullName}
                    </Link>
                  </h2>
                </div>
                <p className="mt-5 text-[length:var(--text-xl)] leading-snug tracking-[-0.015em] text-ink">{p.tagline}</p>
                <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-secondary">{p.description}</p>
                <code className="mt-8 block rounded-[var(--radius-md)] border border-ink bg-ink px-4 py-3 font-mono text-[13px] text-background">
                  <span className="text-accent">$ </span>
                  {install[p.slug]}
                </code>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={p.href} keyGlyph="next">
                    Open {p.name}
                  </Button>
                  <Button href={p.repo} variant="secondary">
                    Source
                  </Button>
                </div>
              </Reveal>
              <Reveal className={i % 2 ? "lg:order-1 lg:col-span-5" : "lg:col-span-5 lg:col-start-8"}>
                {shot && (
                  <div className="frame-night mb-5 max-h-[420px] overflow-hidden">
                    <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 1024px) 480px, 100vw" className="block h-auto w-full" />
                  </div>
                )}
                <TitleBlock
                  heading={p.fullName}
                  rows={[
                    { label: "Status", value: p.status },
                    { label: "License", value: p.slug === "atlas" ? "MIT or Apache-2.0" : "MIT" },
                    { label: "Built with", value: p.tags.filter((t) => t !== "Open Source").join(", "), wide: true },
                  ]}
                />
              </Reveal>
            </article>
          );
        })}
      </div>
    </>
  );
}
