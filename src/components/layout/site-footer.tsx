import { footerNav, site } from "@/lib/site";
import { SnowNode } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { TitleBlock } from "@/components/sheet/title-block";

/*
  Footer: the closing frame of the sheet. An invitation with one action,
  then the studio's title block, then the index of pages.
*/
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-ink" data-sheet="SiteFooter">
      <div className="mx-auto max-w-[1240px] px-[var(--spacing-gutter)] pt-16 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="text-[length:var(--text-4xl)] leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-ink">
              Have a system to build<span className="text-accent">?</span>
            </h2>
            <p className="mt-5 max-w-[46ch] text-[length:var(--text-lg)] leading-[var(--text-lg--line-height)] text-secondary">
              Tell us what you are working on and where it is stuck. You will
              hear back from an engineer, usually within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/contact" size="lg" keyGlyph="next">
                Start a project
              </Button>
              <a href={`mailto:${site.email}`} className="link-accent text-[15px]">
                {site.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <TitleBlock
              heading={
                <span className="flex items-center gap-2.5">
                  <SnowNode className="h-5 w-5" />
                  <span className="font-semibold tracking-[0.16em]">SNOWBROS</span>
                </span>
              }
              rows={[
                { label: "Practice", value: "Software engineering studio", wide: true },
                { label: "Founder", value: site.founder.name },
                { label: "Based in", value: `${site.location}, ${site.timezone}` },
                {
                  label: "Revision",
                  value: (
                    <span className="font-mono text-[12px]">
                      {process.env.NEXT_PUBLIC_BUILD_REV}
                    </span>
                  ),
                },
                {
                  label: "Built",
                  value: <span className="font-mono text-[12px]">{process.env.NEXT_PUBLIC_BUILD_DATE}</span>,
                },
                {
                  label: "Elsewhere",
                  wide: true,
                  value: (
                    <span className="flex flex-wrap gap-x-4 gap-y-1">
                      <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="link-accent">
                        GitHub
                      </a>
                      <a href="https://github.com/snowbros-labs" target="_blank" rel="noopener noreferrer" className="link-accent">
                        snowbros-labs
                      </a>
                      <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="link-accent">
                        LinkedIn
                      </a>
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-hairline-strong pt-10 sm:grid-cols-4 md:mt-24">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="meta mb-3">{group.title}</h2>
              <ul className="flex flex-col">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-block py-1.5 text-[14px] text-secondary transition-colors duration-[160ms] hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta">
            © {year} {site.legalName}. Designed and engineered in-house.
          </p>
          <p className="meta">Built with Next.js. No trackers. Press B for the blueprint.</p>
        </div>
      </div>
    </footer>
  );
}
