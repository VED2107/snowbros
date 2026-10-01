import { Container } from "@/components/layout/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

type Crumb = { name: string; href: string };

/**
 * Page header: the sheet's heading. Breadcrumbs double as the label, so no
 * separate eyebrow is needed; `eyebrow` is kept for compatibility and shown
 * only when there are no breadcrumbs.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  const hasCrumbs = breadcrumbs && breadcrumbs.length > 0;
  return (
    <div className="border-b border-ink" data-sheet="PageHeader">
      {hasCrumbs && <BreadcrumbJsonLd items={breadcrumbs} />}
      <Container className="pb-12 pt-12 md:pb-16 md:pt-20">
        {hasCrumbs ? (
          <nav aria-label="Breadcrumb" className="enter">
            <ol className="meta flex flex-wrap items-center gap-2">
              {breadcrumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <a href={c.href} className="transition-colors duration-[160ms] hover:text-ink">
                      {c.name}
                    </a>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          eyebrow && <p className="meta enter">{eyebrow}</p>
        )}
        <h1
          className="enter mt-6 max-w-[20ch] text-[length:var(--text-4xl)] font-medium leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-ink"
          style={{ "--enter-delay": "60ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="enter mt-6 max-w-[58ch] text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] text-secondary"
            style={{ "--enter-delay": "120ms" } as React.CSSProperties}
          >
            {lead}
          </p>
        )}
        {children}
      </Container>
    </div>
  );
}
