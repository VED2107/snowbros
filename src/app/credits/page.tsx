import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/layout/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Icon, type IconName } from "@/components/ui/icon";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Credits",
  description:
    "Built with care, engineered with intention. The people, studio, and technology behind SNOWBROS.",
  path: "/credits",
});

const founderLinks: { label: string; value: string; href: string; icon: IconName }[] =
  [
    {
      label: "Portfolio",
      value: "ved.exe.snowbros.me",
      href: site.social.portfolio,
      icon: "external",
    },
    {
      label: "GitHub",
      value: "github.com/VED2107",
      href: site.social.github,
      icon: "github",
    },
    {
      label: "LinkedIn",
      value: "in/ved-chauhan2107",
      href: site.social.linkedin,
      icon: "linkedin",
    },
    {
      label: "Email",
      value: site.founder.email,
      href: `mailto:${site.founder.email}`,
      icon: "mail",
    },
  ];

const technology = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Cloudflare",
  "Vercel",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "Lucide Icons",
  "OpenAI",
  "Anthropic",
];

const hosting = ["Cloudflare", "Vercel"];

export default function CreditsPage() {
  return (
    <>
      <PageHeader
        eyebrow="// credits"
        title="Built with care, engineered with intention."
        lead="The people, studio, and technology behind SNOWBROS."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Credits", href: "/credits" },
        ]}
      />

      {/* Founder + Studio */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[var(--radius-lg)] border border-hairline bg-card p-8 shadow-[0_1px_2px_rgba(23,23,23,0.05)]">
              <p className="eyebrow">Founder</p>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src="/developer.jpeg"
                  alt="Ved Chauhan — founder of SNOWBROS"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover object-[center_20%] ring-1 ring-inset ring-[rgba(36,66,58,0.18)]"
                />
                <div>
                  <p className="text-lg font-semibold tracking-[-0.01em]">
                    {site.founder.name}
                  </p>
                  <p className="font-mono text-xs text-muted">
                    {site.founder.role}
                  </p>
                </div>
              </div>
              <ul className="mt-7 flex flex-col divide-y divide-hairline">
                {founderLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group/ch flex items-center gap-3 py-3 first:pt-0"
                    >
                      <Icon
                        name={l.icon}
                        className="text-[16px] text-muted transition-colors group-hover/ch:text-accent"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {l.label}
                      </span>
                      <span className="ml-auto text-sm text-ink transition-colors group-hover/ch:text-accent">
                        {l.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-hairline bg-card p-8 shadow-[0_1px_2px_rgba(23,23,23,0.05)]">
              <div>
                <p className="eyebrow">Studio</p>
                <p className="mt-6 text-[length:var(--text-2xl)] font-semibold tracking-[-0.02em]">
                  {site.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {site.description}
                </p>
              </div>
              <a
                href={site.url}
                className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent"
              >
                <Icon name="external" className="text-[15px]" />
                snowbros.me
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Technology + Hosting */}
      <Section className="border-t border-hairline bg-elevated">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Reveal>
              <p className="eyebrow">// technology</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[length:var(--text-2xl)] font-semibold tracking-[-0.02em]">
                The stack behind the studio.
              </h2>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-wrap gap-2">
              {technology.map((t) => (
                <Reveal
                  as="span"
                  key={t}
                  className="rounded-md border border-hairline bg-surface px-3 py-1.5 font-mono text-[12px] text-secondary transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {t}
                </Reveal>
              ))}
            </RevealGroup>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">// hosting</p>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-col gap-3">
              {hosting.map((h) => (
                <Reveal
                  as="div"
                  key={h}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-3"
                >
                  <span className="status-dot scale-75" />
                  <span className="font-mono text-sm text-ink">{h}</span>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Special thanks + License + Closing */}
      <Section className="border-t border-hairline">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Special thanks</p>
            <p className="mt-5 text-[15px] leading-relaxed text-secondary">
              Open-source maintainers whose tools and libraries make modern
              software development possible.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow">License</p>
            <p className="mt-5 font-mono text-sm text-secondary">
              © 2026 {site.name}. All rights reserved.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-14 rounded-[var(--radius-xl)] border border-hairline bg-card p-8 text-center shadow-[0_1px_2px_rgba(23,23,23,0.05)] md:p-14">
            <p className="mx-auto max-w-2xl text-[length:var(--text-xl)] leading-relaxed text-ink">
              Every pixel, interaction, and line of code has been thoughtfully
              crafted to reflect the way we believe software should be built —
              simple, durable, and engineered to last.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
