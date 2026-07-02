import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Icon, type IconName } from "@/components/ui/icon";
import { ContactForm } from "./contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. We reply to every serious inquiry within one working day.",
  alternates: { canonical: "/contact" },
};

const channels: { label: string; value: string; href: string; icon: IconName }[] =
  [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "mail" },
    { label: "Domain", value: "snowbros.me", href: site.url, icon: "external" },
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
  ];

const availability = [
  { k: "Current status", v: "Open for projects" },
  { k: "Next availability", v: "Immediately" },
  { k: "Average response", v: "< 24 hours" },
  { k: "Project timeline", v: "2–16+ weeks" },
  { k: "Founder", v: "Ved Chauhan" },
  { k: "Location", v: "India · GMT +5:30" },
  { k: "Preferred contact", v: "Email" },
];

const process = [
  "Discovery",
  "Architecture",
  "Development",
  "Deployment",
  "Long-term support",
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      {/* Editorial header with engineering backdrop */}
      <header className="relative overflow-hidden border-b border-hairline">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(23,23,23,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,23,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(90%_80%_at_20%_0%,#000,transparent_72%)]" />
          <div className="absolute left-[-6%] top-[-10%] aspect-square w-[36%] rounded-full bg-[radial-gradient(circle,rgba(36,66,58,0.1),transparent_66%)] blur-3xl" />
        </div>
        <Container className="pb-16 pt-32 md:pb-20 md:pt-40">
          <Reveal>
            <p className="eyebrow">// contact</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,1.7rem+3.6vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
              Let&rsquo;s build something worth maintaining.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-secondary">
              Tell us what you&rsquo;re building. The more specific you are, the
              more useful our first reply will be — we answer every serious
              inquiry within one working day.
            </p>
          </Reveal>
        </Container>
      </header>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Side rail */}
          <div className="flex flex-col gap-6">
            {/* Availability */}
            <Reveal delay={0.05}>
              <div className="rounded-[var(--radius-lg)] border border-hairline bg-card p-7 shadow-[0_1px_2px_rgba(23,23,23,0.05)]">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  <span className="status-dot scale-75" />
                  Availability
                </p>
                <dl className="mt-5 divide-y divide-hairline">
                  {availability.map((a) => (
                    <div
                      key={a.k}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="text-sm text-secondary">{a.k}</dt>
                      <dd className="font-mono text-sm font-medium text-ink">
                        {a.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Live channels */}
            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-lg)] border border-hairline bg-card p-7 shadow-[0_1px_2px_rgba(23,23,23,0.05)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Direct channels
                </p>
                <ul className="mt-5 flex flex-col gap-1">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group/ch -mx-2 flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 transition-colors hover:bg-accent-weak"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface text-secondary transition-colors group-hover/ch:border-accent group-hover/ch:text-accent">
                          <Icon name={c.icon} className="text-[16px]" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                            {c.label}
                          </span>
                          <span className="block text-sm text-ink">
                            {c.value}
                          </span>
                        </span>
                        <Icon
                          name="arrow-up-right"
                          className="text-[16px] text-muted transition-[color,transform] duration-300 group-hover/ch:-translate-y-0.5 group-hover/ch:translate-x-0.5 group-hover/ch:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Engineering process */}
            <Reveal delay={0.15}>
              <div className="rounded-[var(--radius-lg)] border border-hairline bg-card p-7 shadow-[0_1px_2px_rgba(23,23,23,0.05)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  How the work runs
                </p>
                <ol className="mt-5 flex flex-col">
                  {process.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-center gap-3 border-t border-hairline py-3 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-ink">{step}</span>
                      {i < process.length - 1 && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent/30" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
