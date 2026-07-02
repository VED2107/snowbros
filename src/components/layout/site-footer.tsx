import { footerNav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/wordmark";
import { Icon, type IconName } from "@/components/ui/icon";

const socials: { label: string; href: string; icon: IconName }[] = [
  { label: "GitHub", href: site.social.github, icon: "github" },
  { label: "LinkedIn", href: site.social.linkedin, icon: "linkedin" },
  { label: "Portfolio", href: site.social.portfolio, icon: "external" },
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-hairline bg-elevated">
      <div className="mx-auto max-w-[1200px] px-[var(--spacing-gutter)] pb-14 pt-20">
        {/* Editorial statement line */}
        <div className="flex flex-col gap-8 border-b border-hairline pb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-[length:var(--text-3xl)] font-normal leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Building something worth engineering well?
          </h2>
          <a
            href="/contact"
            className="link-accent shrink-0 text-lg text-accent"
          >
            Start a conversation →
          </a>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
              Engineering software that lasts.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              Building software platforms, AI products, SaaS applications, and
              digital systems engineered for long-term success.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={s.icon} className="text-[17px]" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="eyebrow mb-4">{group.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-secondary transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.legalName}. All rights reserved. ·{" "}
            <span className="text-secondary">
              Designed &amp; engineered by Ved Chauhan
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <span className="status-dot scale-75" />
              {site.status}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
