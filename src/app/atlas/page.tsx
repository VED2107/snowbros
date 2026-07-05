import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site, products } from "@/lib/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { MetricWidget } from "@/components/ui/metric-widget";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/json-ld";

const atlas = products.find((p) => p.slug === "atlas")!;
const repo = atlas.repo;
const docs = `${repo}/blob/master`;

export const metadata: Metadata = pageMetadata({
  title: "Atlas",
  description:
    "Snowbros Atlas — deterministic static analysis for JavaScript & TypeScript. Maps your whole project and reports problems it can prove: circular imports, dead files, Next.js server/client leaks, unused deps, secrets. Native Rust, evidence for every finding.",
  path: "/atlas",
  images: [`${site.url}/atlas/og-image.png`],
});

const features: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "check",
    title: "Deterministic by construction",
    body: "No AI, no timestamps, no network. Same code and config in, same findings out — the warm-cache run is byte-identical to a cold one, enforced by tests.",
  },
  {
    icon: "bolt",
    title: "Milliseconds, not minutes",
    body: "A native Rust binary with an incremental cache: ~270 ms cold and ~34 ms after a one-file change on a 500-file repo. Fast enough to run on every save.",
  },
  {
    icon: "git-branch",
    title: "Evidence, not vibes",
    body: "Every finding carries the chain that produced it and a confidence level. Anything the resolver can't prove is labeled unresolved — never guessed.",
  },
  {
    icon: "layers",
    title: "Whole-project graph",
    body: "A semantic import graph with cycle detection and dead-file reachability — the structural problems that are invisible to per-file linters.",
  },
  {
    icon: "devtools",
    title: "Meets you everywhere",
    body: "Terminal, JSON, SARIF for GitHub code scanning, self-contained HTML, a health scorecard, a built-in LSP, and a first-party VS Code extension.",
  },
  {
    icon: "gauge",
    title: "Fixes it can prove",
    body: "sb fix applies guarded, idempotent edits for unused deps and env vars. Files that drifted since analysis are skipped, never clobbered.",
  },
];

const pipeline = [
  { step: "scan", note: "ignore-aware walk" },
  { step: "parse", note: "Tree-sitter · cached" },
  { step: "facts", note: "imports · exports · env" },
  { step: "resolve", note: "tsconfig · aliases" },
  { step: "graph", note: "SCC · reachability" },
  { step: "rules", note: "evidence-first" },
  { step: "report", note: "+ scorecard" },
];

const comparison: {
  label: string;
  atlas: string;
  eslint: string;
  knip: string;
  depcruiser: string;
}[] = [
  { label: "Whole-project semantic graph", atlas: "Yes", eslint: "Per-file", knip: "Partial", depcruiser: "Yes" },
  { label: "Circular imports (cycle listed)", atlas: "Yes", eslint: "Plugin", knip: "No", depcruiser: "Yes" },
  { label: "Dead files / unused exports", atlas: "Yes", eslint: "No", knip: "Yes", depcruiser: "Partial" },
  { label: "Next.js server/client boundary", atlas: "Yes", eslint: "Partial", knip: "No", depcruiser: "No" },
  { label: "Deterministic, evidence-first", atlas: "Yes", eslint: "Mostly", knip: "Mostly", depcruiser: "Mostly" },
  { label: "SARIF · LSP · watch · scorecard", atlas: "Yes", eslint: "LSP only", knip: "No", depcruiser: "No" },
  { label: "Runtime", atlas: "Native", eslint: "Node", knip: "Node", depcruiser: "Node" },
];

const installs = [
  { label: "npm — no install needed", code: "npx snowbros analyze" },
  { label: "Homebrew (macOS, Linux)", code: "brew install snowbros-labs/tap/snowbros-atlas" },
  { label: "Cargo", code: "cargo install snowbros-atlas --locked" },
  { label: "Shell (macOS, Linux)", code: "curl -LsSf https://github.com/snowbros-labs/atlas/releases/latest/download/snowbros-atlas-installer.sh | sh" },
];

const metrics = [
  { label: "Cold analysis", value: "270", unit: "ms", caption: "500-file project, release build" },
  { label: "Warm (cached)", value: "43", unit: "ms", caption: "byte-identical to a cold run" },
  { label: "Per changed file", value: "34", unit: "ms", caption: "incremental, watch mode" },
];

const roadmap = [
  {
    phase: "Now",
    items: ["package.json main/exports resolution", "Monorepo / workspace awareness", "VS Code Marketplace publish"],
  },
  {
    phase: "Next",
    items: ["More rules, driven by real reports", "Rule maturity gating (nursery)", "Wider auto-fix coverage"],
  },
  {
    phase: "Later",
    items: ["Pattern rule engine (no Rust)", "OSV vulnerability data", "A second language family"],
  },
];

const faqs = [
  {
    q: "Is it a linter? Do I replace ESLint or Biome?",
    a: "No. Atlas works one layer up, on whole-project structure — the import graph, framework boundaries, and manifest. Run it alongside your linter, not instead of it.",
  },
  {
    q: "Does it use AI?",
    a: "No. Atlas is deterministic by design: the same codebase and config always produce the same findings, each backed by an evidence chain. No model decides whether an issue exists.",
  },
  {
    q: "Which languages are supported?",
    a: "Deep analysis covers the JavaScript/TypeScript family (.js/.jsx/.ts/.tsx and their .mjs/.cjs variants). Other languages are detected for context; more are on the roadmap.",
  },
  {
    q: "Will it slow down or break my CI?",
    a: "It is native-fast, and `sb analyze --ci` is a single exit-code gate. Because Atlas finds more over time, pin the version and use snowbros.toml thresholds to control what fails the build.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow">{children}</p>
    </Reveal>
  );
}

export default function AtlasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Atlas", href: "/atlas" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name={atlas.fullName}
        description={atlas.description}
        url={`${site.url}/atlas`}
        repo={repo}
        image={`${site.url}/atlas/og-image.png`}
      />

      {/* Hero */}
      <Section className="pb-0 pt-32 md:pt-40">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <Image src={atlas.logo} alt="" width={40} height={40} unoptimized className="h-10 w-10" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  <span className="status-dot scale-[0.6]" /> A SNOWBROS product · {atlas.status}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 text-[length:var(--text-4xl)] font-normal leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)]">
                Same code in.
                <br />
                Same findings out.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-secondary">
                {atlas.fullName} maps your whole JavaScript/TypeScript project and
                reports problems it can <span className="text-ink">prove</span> —
                circular imports, dead files, Next.js server/client leaks, unused
                dependencies, secrets. Native Rust, with the evidence attached.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={repo} variant="primary">
                  <Icon name="github" className="text-[18px]" />
                  View on GitHub
                </Button>
                <Button href={`${docs}/docs/INSTALL.md`} variant="secondary">
                  Read the docs
                  <Icon name="arrow-right" className="text-[16px]" />
                </Button>
                <code className="rounded-full border border-hairline bg-surface px-4 py-2 font-mono text-[13px] text-secondary">
                  npx snowbros analyze
                </code>
              </div>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-wrap gap-2">
              {atlas.tags.map((t) => (
                <Reveal
                  as="span"
                  key={t}
                  className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary"
                >
                  {t}
                </Reveal>
              ))}
            </RevealGroup>
          </div>

          {/* Terminal demo — real captured output */}
          <Reveal delay={0.1}>
            <div className="card-engineered overflow-hidden p-3 md:p-4">
              <Image
                src="/atlas/terminal.svg"
                alt="sb analyze finds a server-only leak, a circular import, and a hardcoded secret — health 93 of 100"
                width={900}
                height={560}
                priority
                unoptimized
                className="h-auto w-full rounded-[var(--radius-md)]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <Eyebrow>// why atlas</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Per-file linters can&rsquo;t see project structure. Atlas can.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Reveal as="div" key={f.title}>
              <div className="card-engineered h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-hairline bg-accent-weak text-accent">
                  <Icon name={f.icon} className="text-[20px]" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Architecture / pipeline */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// how it works</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            One deterministic pipeline, cache-accelerated.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 flex flex-wrap items-stretch gap-3">
          {pipeline.map((p, i) => (
            <Reveal as="div" key={p.step} className="flex items-center gap-3">
              <div className="card-engineered min-w-[9.5rem] px-4 py-3">
                <p className="font-mono text-sm font-medium text-ink">{p.step}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{p.note}</p>
              </div>
              {i < pipeline.length - 1 && (
                <Icon name="arrow-right" className="text-[18px] text-accent/50" />
              )}
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-secondary">
            Warm output is byte-identical to a cold run — the cache can skip work,
            never change results.{" "}
            <a href={`${docs}/ARCHITECTURE.md`} className="text-accent">
              Read the architecture →
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Comparison */}
      <Section className="border-t border-hairline">
        <Eyebrow>// how it compares</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Run it alongside your linter, not instead of it.
          </h2>
        </Reveal>
        <Reveal className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface text-left text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  Capability
                </th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                  Atlas
                </th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">ESLint</th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Knip</th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">dep-cruiser</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-hairline last:border-b-0">
                  <td className="p-5 font-medium text-ink">{row.label}</td>
                  <td className="bg-accent-weak/50 p-5 font-medium text-accent">{row.atlas}</td>
                  <td className="p-5 text-secondary">{row.eslint}</td>
                  <td className="p-5 text-secondary">{row.knip}</td>
                  <td className="p-5 text-secondary">{row.depcruiser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* Installation */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// install</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            One line to try it. No account, no config.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2">
          {installs.map((it) => (
            <Reveal as="div" key={it.label} className="card-engineered p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {it.label}
              </p>
              <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-hairline bg-background p-4 font-mono text-[13px] leading-relaxed text-ink">
                <code>{it.code}</code>
              </pre>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* VS Code */}
      <Section className="border-t border-hairline">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>// in your editor</Eyebrow>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-md text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
                First-class VS Code support.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-secondary">
                The extension wraps the built-in language server, so findings
                stream into native diagnostics as you save — severities mapped to
                Errors, Warnings, Hints, with click-to-navigate. Analyze, explain
                a rule, open an HTML report, or check the health score without
                leaving the editor.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`${docs}/vscode/README.md`} variant="secondary">
                  Extension docs
                  <Icon name="arrow-right" className="text-[16px]" />
                </Button>
                <Button href={`${docs}/docs/INSTALL.md`} variant="text">
                  Other editors (LSP)
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="card-engineered overflow-hidden p-3 md:p-4">
              <Image
                src="/atlas/report.png"
                alt="Snowbros Atlas HTML report — a health scorecard and findings with evidence"
                width={1000}
                height={900}
                unoptimized
                loading="lazy"
                className="h-auto w-full rounded-[var(--radius-md)]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Performance */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// performance</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Fast enough to run on every save.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-3">
          {metrics.map((m) => (
            <Reveal as="div" key={m.label}>
              <MetricWidget label={m.label} value={m.value} unit={m.unit} caption={m.caption} />
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-secondary">
            Measured on real repositories (zod, axios, fastify).{" "}
            <a href={`${docs}/docs/EXAMPLES.md`} className="text-accent">
              See the dogfood reports →
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Roadmap */}
      <Section className="border-t border-hairline">
        <Eyebrow>// roadmap</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Where Atlas is going.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {roadmap.map((col) => (
            <Reveal as="div" key={col.phase} className="card-engineered p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {col.phase}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary">
                    <Icon name="check" className="mt-1 text-[14px] text-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-secondary">
            <a href={`${docs}/ROADMAP.md`} className="text-accent">
              Full roadmap →
            </a>
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// faq</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Questions, answered.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 flex flex-col">
          {faqs.map((f) => (
            <Reveal
              as="div"
              key={f.q}
              className="border-t border-hairline py-8 first:border-t-0 first:pt-0"
            >
              <h3 className="text-lg font-semibold tracking-[-0.01em]">{f.q}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">
                {f.a}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-secondary">
            <a href={`${docs}/docs/FAQ.md`} className="text-accent">
              More in the FAQ →
            </a>
          </p>
        </Reveal>
      </Section>

      {/* GitHub CTA — forest panel */}
      <Section className="border-t border-hairline">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-xl)] bg-primary px-8 py-20 text-center text-primary-foreground md:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(120%_100%_at_50%_0%,#000,transparent_70%)]"
            />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#8fd8c0]">
              // open source · MIT or Apache-2.0
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[length:var(--text-4xl)] leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-[#f8f9f8]">
              Map your project in one command.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-[#c3d0ca]">
              Try it on your repo right now — then star it, break it, and tell us
              where it&rsquo;s wrong.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href={repo}
                size="lg"
                className="bg-[#f8f9f8] text-primary hover:bg-white hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
              >
                <Icon name="github" className="text-[18px]" />
                Star on GitHub
              </Button>
              <a
                href={`${docs}/docs/EXAMPLES.md`}
                className="inline-flex h-14 items-center px-6 text-base text-[#c3d0ca] transition-colors hover:text-white"
              >
                See real-world runs
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
