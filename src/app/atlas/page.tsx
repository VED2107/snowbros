import type { Metadata } from "next";
import { AtlasProof, CopyCommand } from "@/components/products/atlas-proof";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site, products } from "@/lib/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { MetricWidget } from "@/components/ui/metric-widget";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/json-ld";

const atlas = products.find((p) => p.slug === "atlas")!;
const repo = atlas.repo;
const docs = `${repo}/blob/master`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Atlas",
    description:
      "Snowbros Atlas, deterministic engineering intelligence for JavaScript, TypeScript, React, Next.js, and now Python. One shared semantic IR and rule engine across languages: circular imports, dead files, Next.js server/client leaks, React hook misuse, unused deps, secrets, and cross-language complexity. 23 rules, native Rust, LSP + VS Code, evidence for every finding.",
    path: "/atlas",
    images: [`${site.url}/atlas/og-image.png`],
  }),
  keywords: [
    "static analysis",
    "multi-language",
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Next.js",
    "circular imports",
    "dead code",
    "unused dependencies",
    "SARIF",
    "LSP",
    "VS Code extension",
    "deterministic",
    "Rust",
    "monorepo",
    "code health",
  ],
};

const features: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "check",
    title: "Deterministic by construction",
    body: "No AI, no timestamps, no network. Same code and config in, same findings out, the warm-cache run is byte-identical to a cold one, enforced by tests.",
  },
  {
    icon: "bolt",
    title: "Milliseconds, not minutes",
    body: "A native Rust binary with an incremental cache: ~270 ms cold and ~34 ms after a one-file change on a 500-file repo. Fast enough to run on every save.",
  },
  {
    icon: "git-branch",
    title: "Evidence, not vibes",
    body: "Every finding carries the chain that produced it and a confidence level. Anything the resolver can't prove is labeled unresolved, never guessed.",
  },
  {
    icon: "layers",
    title: "Whole-project graph",
    body: "Symbol, import, and file graphs with cycle detection and dead-file reachability, plus a Next.js project model and a React semantic model. The structural problems per-file linters can't see.",
  },
  {
    icon: "devtools",
    title: "Meets you everywhere",
    body: "Terminal, JSON, SARIF for GitHub code scanning, self-contained HTML, and Markdown, with a health scorecard, a built-in LSP, and a first-party VS Code extension.",
  },
  {
    icon: "gauge",
    title: "Fixes it can prove",
    body: "The auto-fix engine applies guarded, idempotent edits for unused deps and env vars. Files that drifted since analysis are skipped, never clobbered.",
  },
];

const pipeline = [
  { step: "Scanner", note: "ignore-aware walk" },
  { step: "Tree-sitter", note: "parse · cached" },
  { step: "Atlas IR", note: "typed facts" },
  { step: "Semantic Engine", note: "resolve · model" },
  { step: "Symbol Graph", note: "symbols · imports · files" },
  { step: "Rule Engine", note: "23 rules · evidence-first" },
  { step: "Auto Fix", note: "guarded edits" },
  { step: "CLI", note: "sb · snowbros" },
  { step: "LSP", note: "editor diagnostics" },
  { step: "Outputs", note: "terminal · json · sarif · html · md" },
];

const languages = ["JavaScript", "TypeScript", "JSX", "TSX", "Python"];
const frameworks = ["Next.js", "React"];

const nextjsCapabilities = [
  "App Router",
  "Pages Router",
  "Mixed Router",
  "Route Groups",
  "Dynamic Routes",
  "Parallel Routes",
  "Intercepting Routes",
  "Metadata API",
  "Middleware",
  "Server Components",
  "Client Components",
  "Route Handlers",
  "loading.tsx",
  "layout.tsx",
  "template.tsx",
  "error.tsx",
  "global-error.tsx",
  "not-found.tsx",
  "generateMetadata",
  "generateStaticParams",
];

const reactCapabilities: { title: string; body: string }[] = [
  { title: "Component detection", body: "Function and arrow components resolved from the semantic model, not string matching." },
  { title: "Hook detection", body: "Built-in and custom hooks identified by call enclosure and naming predicate." },
  { title: "JSX analysis", body: "JSX and TSX parsed and understood as part of the component graph." },
  { title: "Async client component rule", body: "Flags `async` components in client boundaries, a real runtime hazard." },
  { title: "Hook misuse detection", body: "Catches hooks called outside a component or hook, against the rules of hooks." },
  { title: "Component naming", body: "Enforces PascalCase component and use-prefixed hook naming conventions." },
];

const outputs = [
  { name: "Terminal", note: "colored, human-readable summary" },
  { name: "JSON", note: "canonical, machine-readable report" },
  { name: "SARIF", note: "GitHub code scanning integration" },
  { name: "HTML", note: "self-contained health report" },
  { name: "Markdown", note: "drop into PRs and docs" },
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
  { label: "npm (global)", code: "npm install -g @snowbros/atlas" },
  { label: "npm, no install needed", code: "npx snowbros analyze" },
  { label: "Homebrew (macOS, Linux)", code: "brew install snowbros-labs/tap/snowbros-atlas" },
  { label: "Cargo", code: "cargo install snowbros-atlas --locked" },
];

const metrics = [
  { label: "Cold analysis", value: "270", unit: "ms", caption: "500-file project, release build" },
  { label: "Warm (cached)", value: "43", unit: "ms", caption: "byte-identical to a cold run" },
  { label: "Per changed file", value: "34", unit: "ms", caption: "incremental, watch mode" },
];

const roadmap = [
  {
    phase: "Shipped",
    items: ["Multi-language foundation (shared IR)", "Python frontend + resolver", "First cross-language rule (large-function)"],
  },
  {
    phase: "Next",
    items: ["More languages: Go, Rust, Java", "More cross-language rules from real reports", "Rule maturity gating (nursery)"],
  },
  {
    phase: "Later",
    items: ["Interprocedural analysis", "Pattern rule engine (no Rust)", "OSV vulnerability data"],
  },
];

const faqs = [
  {
    q: "Is it a linter? Do I replace ESLint or Biome?",
    a: "No. Atlas works one layer up, on whole-project structure, the import graph, framework boundaries, and manifest. Run it alongside your linter, not instead of it.",
  },
  {
    q: "Does it use AI?",
    a: "No. Atlas is deterministic by design: the same codebase and config always produce the same findings, each backed by an evidence chain. No model decides whether an issue exists.",
  },
  {
    q: "Which languages are supported?",
    a: "The JavaScript/TypeScript family (.js/.jsx/.ts/.tsx and their .mjs/.cjs variants) and Python (.py). Both lower into one shared semantic IR, so language-neutral rules, import cycles, dead files, unresolved imports, and function complexity, run on either without special-casing. Python ships at preview maturity; Go, Rust, and Java are next on the roadmap.",
  },
  {
    q: "Will it slow down or break my CI?",
    a: "It is native-fast, and `sb analyze --ci` is a single exit-code gate. Because Atlas finds more over time, pin the version and use snowbros.toml thresholds to control what fails the build.",
  },
];

/* Section marker: the plotter rule with a mono label, same as every sheet. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="plot">
      <div className="plot-rule h-px w-full bg-ink" aria-hidden />
      <span className="sr-only">{children}</span>
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

      {/* Hero: the proof, operable */}
      <section aria-labelledby="atlas-title" className="border-b border-ink">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="meta enter">
              <a href="/products" className="hover:text-ink">Products</a>
              <span aria-hidden> / </span>
              <span className="text-ink">{atlas.fullName}</span>
            </nav>
            <h1
              id="atlas-title"
              className="enter mt-6 text-[clamp(2.5rem,1.5rem+3.4vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em] text-ink"
              style={{ "--enter-delay": "60ms" } as React.CSSProperties}
            >
              Same code in.
              <br />
              Same findings out<span className="link-accent">.</span>
            </h1>
            <p
              className="enter mt-7 max-w-[46ch] text-[length:var(--text-lg)] leading-[1.6] text-secondary"
              style={{ "--enter-delay": "140ms" } as React.CSSProperties}
            >
              Static analysis that maps your whole JavaScript, TypeScript or
              Python project and reports only what it can prove, with the chain
              of evidence attached. Native Rust. No model decides.
            </p>
            <div className="enter mt-8 flex flex-col items-start gap-4" style={{ "--enter-delay": "220ms" } as React.CSSProperties}>
              <CopyCommand command="npx snowbros analyze" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href={repo}>Source on GitHub</Button>
                <Button href={`${docs}/docs/INSTALL.md`} variant="text">
                  Install guide
                </Button>
              </div>
            </div>
            <dl className="enter mt-10 grid grid-cols-2 border-t border-ink sm:grid-cols-4" style={{ "--enter-delay": "300ms" } as React.CSSProperties}>
              {[
                ["CLI", "v0.4.0"],
                ["VS Code", "v0.3.0"],
                ["Rules", "23"],
                ["Languages", "JS, TS, Python"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-hairline-strong py-3 pr-3 sm:border-b-0">
                  <dt className="meta">{k}</dt>
                  <dd className="mt-1 font-mono text-[14px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="enter lg:col-span-6" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
            <AtlasProof />
          </div>
        </div>
      </section>

      {/* Features */}
      <Section>
        <Eyebrow>why atlas</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Per-file linters can&rsquo;t see project structure. Atlas can.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Reveal as="div" key={f.title}>
              <div className="h-full border-t border-ink pt-5">
                <h3 className="text-[17px] font-medium tracking-[-0.015em]">
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
      <Section className="border-t border-hairline">
        <Eyebrow>how it works</Eyebrow>
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
            Warm output is byte-identical to a cold run, the cache can skip work,
            never change results.{" "}
            <a href={`${docs}/ARCHITECTURE.md`} className="link-accent">
              Read the architecture
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Languages & Frameworks */}
      <Section className="border-t border-hairline">
        <Eyebrow>multi-language</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            One engine. Multiple languages.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-secondary">
            Every language lowers into one shared semantic IR, so a rule is
            written once and runs everywhere it applies, never a{" "}
            <code className="font-mono text-[13px] text-ink">
              if language ==
            </code>{" "}
            branch buried in a detector. Import cycles, dead files, unresolved
            imports, and the cross-language{" "}
            <code className="font-mono text-[13px] text-ink">
              complexity/large-function
            </code>{" "}
            rule already run on Python and the JavaScript/TypeScript family
            alike. Python ships at preview maturity.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal as="div" className="card-engineered p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Languages
            </p>
            <RevealGroup className="mt-5 flex flex-wrap gap-2.5">
              {languages.map((l) => (
                <Reveal
                  as="span"
                  key={l}
                  className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 font-mono text-[13px] text-ink"
                >
                  <Icon name="check" className="text-[13px] text-accent" />
                  {l}
                </Reveal>
              ))}
            </RevealGroup>
          </Reveal>
          <Reveal as="div" className="card-engineered p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Frameworks
            </p>
            <RevealGroup className="mt-5 flex flex-wrap gap-2.5">
              {frameworks.map((f) => (
                <Reveal
                  as="span"
                  key={f}
                  className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 font-mono text-[13px] text-ink"
                >
                  <Icon name="check" className="text-[13px] text-accent" />
                  {f}
                </Reveal>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </Section>

      {/* Next.js intelligence */}
      <Section className="border-t border-hairline">
        <Eyebrow>next.js intelligence</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            It understands the Next.js project model.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-secondary">
            App Router, Pages Router, and mixed setups, with the routing
            conventions, special files, and server/client boundaries resolved
            into a real model, not guessed by filename.
          </p>
        </Reveal>
        <RevealGroup className="mt-12 flex flex-wrap gap-2.5">
          {nextjsCapabilities.map((c) => (
            <Reveal
              as="span"
              key={c}
              className="rounded-md border border-hairline bg-surface px-3 py-2 font-mono text-[12px] text-secondary"
            >
              {c}
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* React */}
      <Section className="border-t border-hairline">
        <Eyebrow>react semantic model</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            A semantic model for React (M1).
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reactCapabilities.map((c) => (
            <Reveal as="div" key={c.title}>
              <div className="h-full border-t border-ink pt-5">
                <h3 className="text-[17px] font-medium tracking-[-0.015em]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Comparison */}
      <Section className="border-t border-hairline">
        <Eyebrow>how it compares</Eyebrow>
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
      <Section className="border-t border-hairline">
        <Eyebrow>install</Eyebrow>
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
            <Eyebrow>in your editor</Eyebrow>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-md text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
                First-class VS Code support.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-secondary">
                Published on the VS Code Marketplace (v0.3.0). The extension
                wraps the built-in language server, so findings stream into
                native diagnostics in real time as you save, severities mapped
                to Errors, Warnings, Hints, with click-to-navigate. Analyze,
                explain a rule, open an HTML report, or check the health score
                without leaving the editor.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="https://marketplace.visualstudio.com/items?itemName=snowbros.snowbros-atlas"
                  variant="primary"
                >
                  Get the extension
                </Button>
                <Button href={`${docs}/vscode/README.md`} variant="secondary">
                  Extension docs
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
                alt="Snowbros Atlas HTML report, a health scorecard and findings with evidence"
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

      {/* Outputs */}
      <Section className="border-t border-hairline">
        <Eyebrow>outputs</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            One analysis, every format you need.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {outputs.map((o) => (
            <Reveal as="div" key={o.name} className="card-engineered p-5">
              <p className="font-mono text-sm font-medium text-ink">{o.name}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-secondary">
                {o.note}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Performance */}
      <Section className="border-t border-hairline">
        <Eyebrow>performance</Eyebrow>
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
            <a href={`${docs}/docs/EXAMPLES.md`} className="link-accent">
              See the dogfood reports
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Roadmap */}
      <Section className="border-t border-hairline">
        <Eyebrow>roadmap</Eyebrow>
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
            <a href={`${docs}/ROADMAP.md`} className="link-accent">
              Full roadmap
            </a>
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-hairline">
        <Eyebrow>faq</Eyebrow>
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
            <a href={`${docs}/docs/FAQ.md`} className="link-accent">
              More in the FAQ
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Closing: one action, plainly */}
      <section className="border-t border-ink">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-[var(--spacing-gutter)] py-16 md:grid-cols-12 md:items-end md:py-24">
          <h2 className="text-[length:var(--text-4xl)] leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-ink md:col-span-7">
            Map your project in one command.
          </h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-[15px] leading-relaxed text-secondary">Run it on your repository now. If a finding is wrong, open an issue: that is how the rules get better.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={repo}>Source on GitHub</Button>
              <Button href={`${docs}/docs/EXAMPLES.md`} variant="text">
                Real-world runs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
