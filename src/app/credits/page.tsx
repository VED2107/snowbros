import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/sections/page-header";
import { TitleBlock } from "@/components/sheet/title-block";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Colophon",
  description: "How this site is made: typefaces, framework, design system, motion rules and how it is checked.",
  path: "/credits",
});

const groups: { title: string; rows: [string, string][] }[] = [
  {
    title: "Type",
    rows: [
      ["Geist", "Text and display, by Vercel. SIL Open Font License."],
      ["Geist Mono", "Code, versions and measurements only."],
    ],
  },
  {
    title: "Framework",
    rows: [
      ["Next.js 16.2.9", "React Server Components by default; every page prerendered."],
      ["React 19.2.4", "Client code limited to navigation, forms and a few interactions."],
      ["Tailwind CSS 4", "Utilities over a small set of design tokens."],
      ["Zod, React Hook Form", "Contact form validation, on the client and again on the server."],
    ],
  },
  {
    title: "Design system",
    rows: [
      ["Sheet", "#F7F4EE cream, ink #161513, one signal orange #C2461A (4.7:1)."],
      ["Shape", "One radius: 4px for controls and panels, 6px for media."],
      ["Icons", "A small SVG set drawn for this site, 1.5px stroke."],
    ],
  },
  {
    title: "Motion",
    rows: [
      ["Durations", "160ms feedback, 280ms interface, 520ms reveal."],
      ["Easing", "Strong ease-out cubic-bezier(0.23, 1, 0.32, 1); no ease-in."],
      ["Engine", "CSS transitions and one IntersectionObserver. No animation library."],
      ["Reduced motion", "Movement is removed; colour and opacity feedback stays."],
    ],
  },
  {
    title: "Checks",
    rows: [
      ["Snowbros Atlas", "Static analysis on every change. Current score on the site's case study."],
      ["TypeScript, ESLint", "Strict types and the React hooks rules, clean before release."],
      ["Headers", "Content Security Policy, HSTS and frame denial on every route."],
    ],
  },
];

export default function ColophonPage() {
  return (
    <>
      <PageHeader
        title="Colophon."
        lead="The last sheet in the set: what this site is made of, and the rules it was made to."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Colophon", href: "/credits" },
        ]}
      />

      <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <RevealGroup className="flex flex-col gap-12 lg:col-span-8">
          {groups.map((g) => (
            <section key={g.title} aria-labelledby={`c-${g.title}`}>
              <h2 id={`c-${g.title}`} className="border-b border-ink pb-2 text-[length:var(--text-xl)] tracking-[-0.02em] text-ink">
                {g.title}
              </h2>
              <dl>
                {g.rows.map(([k, v]) => (
                  <div key={k} className="grid gap-1 border-b border-hairline py-3 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="text-[15px] font-medium text-ink">{k}</dt>
                    <dd className="text-[15px] leading-relaxed text-secondary">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </RevealGroup>

        <Reveal className="lg:col-span-3 lg:col-start-10">
          <div className="lg:sticky lg:top-24">
            <TitleBlock
              heading="Drawn by"
              rows={[
                { label: "Design and code", value: site.founder.name, wide: true },
                { label: "Revision", value: <span className="font-mono text-[12px]">{process.env.NEXT_PUBLIC_BUILD_REV}</span> },
                { label: "Built", value: <span className="font-mono text-[12px]">{process.env.NEXT_PUBLIC_BUILD_DATE}</span> },
              ]}
            />
            <p className="mt-5 text-[14px] leading-relaxed text-secondary">
              Press <kbd className="rounded-[3px] border border-hairline-strong px-1 font-mono text-[12px] text-ink">B</kbd> on any
              page to see its working drawing.{" "}
              <Link href="/work/snowbros-website" className="link-accent">
                Read the case study
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
