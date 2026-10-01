import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/layout/container";

type LegalSection = { heading: string; paragraphs: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  slug,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  slug: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        lead={intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: title, href: `/${slug}` },
        ]}
      />
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <p className="meta border-b border-ink pb-2">Last updated {updated}</p>
              <ol className="mt-3 hidden lg:block">
                {sections.map((section, i) => (
                  <li key={section.heading}>
                    <a href={`#s-${i + 1}`} className="flex gap-3 py-1.5 text-[14px] text-secondary transition-colors hover:text-ink">
                      <span className="meta w-5">{i + 1}.</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div className="flex flex-col gap-12 lg:col-span-7 lg:col-start-5">
            {sections.map((section, i) => (
              <section key={section.heading} id={`s-${i + 1}`} className="scroll-mt-24 border-t border-hairline-strong pt-5">
                <h2 className="flex gap-3 text-[length:var(--text-xl)] font-medium tracking-[-0.02em] text-ink">
                  <span className="meta pt-1.5 text-accent">{i + 1}.</span>
                  {section.heading}
                </h2>
                <div className="mt-4 flex max-w-[64ch] flex-col gap-4 text-[16px] leading-relaxed text-secondary">
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
