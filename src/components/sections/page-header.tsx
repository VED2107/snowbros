import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

type Crumb = { name: string; href: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <div className="border-b border-border">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd items={breadcrumbs} />
      )}
      <Container className="pb-16 pt-24 md:pb-20 md:pt-32">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {breadcrumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <a href={c.href} className="transition-colors hover:text-ink">
                      {c.name}
                    </a>
                  ) : (
                    <span className="text-secondary">{c.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl text-[length:var(--text-4xl)] font-normal leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)]">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-secondary">
              {lead}
            </p>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
