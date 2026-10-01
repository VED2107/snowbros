import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { TitleBlock } from "@/components/sheet/title-block";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you are working on. Send a short brief and hear back from an engineer, usually within a day.",
  path: "/contact",
});

const next = [
  { title: "We read it", body: "The founder reads every brief. No sales layer, no autoresponder sequence." },
  { title: "We reply with questions", body: "Usually within a day: what we need to know, and where we see the risk." },
  { title: "We propose a shape", body: "A first view of the system, how we would sequence the work, and what it would take." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Tell us what you are working on."
        lead="A few lines are enough to start. The more specific you are about what exists and what has to change, the more useful our first reply will be."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] py-12 md:py-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <ContactForm />
        </Reveal>

        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <Reveal>
            <TitleBlock
              heading="Direct line"
              rows={[
                {
                  label: "Email",
                  wide: true,
                  value: (
                    <a href={`mailto:${site.email}`} className="link-accent">
                      {site.email}
                    </a>
                  ),
                },
                { label: "Reply", value: site.responseTime },
                { label: "Hours", value: site.businessHours },
                { label: "Based in", value: `${site.location}, ${site.timezone}` },
                {
                  label: "Status",
                  value: (
                    <span className="inline-flex items-center gap-2">
                      Taking projects
                    </span>
                  ),
                },
              ]}
            />
          </Reveal>

          <Reveal>
            <h2 className="text-[length:var(--text-xl)] tracking-[-0.025em] text-ink">What happens next</h2>
            <ol className="mt-5">
              {next.map((n, i) => (
                <li key={n.title} className="grid grid-cols-[1.75rem_1fr] gap-x-2 border-t border-hairline-strong py-4">
                  <span className="meta pt-[3px] text-accent" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium text-ink">{n.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-secondary">{n.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </>
  );
}
