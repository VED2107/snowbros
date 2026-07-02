import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/layout/container";

export type LegalSection = { heading: string; paragraphs: string[] };

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
      <Container size="narrow" className="py-20">
        <p className="text-sm text-muted">Last updated {updated}</p>
        <div className="mt-12 flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-[length:var(--text-xl)] font-medium">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-secondary">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
