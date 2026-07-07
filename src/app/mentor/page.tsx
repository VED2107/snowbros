import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { site, products } from "@/lib/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import {
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
} from "@/components/seo/json-ld";

const mentor = products.find((p) => p.slug === "mentor")!;
const repo = mentor.repo;
const readme = `${repo}#readme`;
const orchestration = `${repo}/blob/main/references/orchestration.md`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentor",
    description:
      "Snowbros Mentor — an engineering intelligence system for Claude Code. A capability orchestrator that composes only the specialist expertise a task needs (software, backend, frontend, architecture, security, design, AI, DevOps, leadership) in two modes: TEACH (train toward Principal-grade judgment from first principles) and BUILD (act as an autonomous Staff engineer). Honest by design — no fake token meters. MIT, open source.",
    path: "/mentor",
  }),
  keywords: [
    "Claude Code",
    "Claude Code skill",
    "AI engineering assistant",
    "capability orchestrator",
    "software engineering curriculum",
    "code review",
    "architecture review",
    "security review",
    "design critique",
    "AI agents",
    "RAG",
    "developer education",
    "open source",
    "mentor",
  ],
};

const modes: { icon: IconName; label: string; title: string; body: string; points: string[] }[] = [
  {
    icon: "layers",
    label: "TEACH",
    title: "Train toward elite judgment.",
    body: "From first principles, not recipes. Full lessons with mental models, exercises, review gates, and a leveled roadmap from Foundations to Principal — verified by retrieval, not assertion.",
    points: [
      "Why-it-matters → first principles → practice → anti-patterns",
      "Easy · medium · hard · real-world exercises, solutions withheld",
      "Interview-style questions that challenge assumptions",
    ],
  },
  {
    icon: "bolt",
    label: "BUILD",
    title: "Act as an autonomous Staff engineer.",
    body: "Classify the task, route to only the needed capabilities, produce the solution, then run only the review gates the change implicates — and say which ones and why.",
    points: [
      "Complexity tiers bound how much gets read",
      "Code · security · architecture · design · AI review gates",
      "Incremental docs and clean checkpoints on long work",
    ],
  },
];

const capabilities: { icon: IconName; title: string; body: string }[] = [
  { icon: "devtools", title: "Software Core", body: "Code quality, naming & API design, testing, refactoring, debugging method, concurrency, performance engineering, error handling, git, dependencies." },
  { icon: "database", title: "Backend & Data", body: "HTTP, API design, data modeling, relational depth, async & queues, multi-tenancy, backend reliability patterns, pipelines." },
  { icon: "layers", title: "Frontend & Web", body: "The platform, rendering pipeline, state taxonomy, server-state, SSR/CSR, Core Web Vitals, CSS architecture, build tooling, resilience." },
  { icon: "git-branch", title: "Architecture", body: "Coupling & cohesion, SOLID, DDD, monolith vs microservices, distributed systems, caching, event-driven, CQRS, scaling, high availability." },
  { icon: "check", title: "Security", body: "Threat modeling, secure-design principles, root-cause vuln families, authn/authz, API/frontend/DB/infra security, DevSecOps, supply chain, detection." },
  { icon: "platform", title: "Design", body: "Perception & UX psychology, typography, color, layout, components, design systems, motion, accessibility, product thinking, seven-lens critique." },
  { icon: "ai", title: "AI Engineering", body: "LLM fundamentals, prompting, tool calling, embeddings & RAG, agents, memory, MCP, evaluation, safety, serving/cost/latency, AI UX." },
  { icon: "cloud", title: "DevOps & SRE", body: "CI/CD, release engineering, containers & K8s, IaC, cloud, observability, SLOs & error budgets, incidents, postmortems, platform & DX." },
  { icon: "automation", title: "Leadership & Career", body: "Communication, technical writing & RFCs, code-review craft, decision-making, influence, estimation, mentorship, the ladder, interviewing." },
  { icon: "gauge", title: "Learning System", body: "Five competence levels, portfolio project ladder, assessment gates, and the teaching mechanics that turn lessons into an education." },
];

const loop = [
  { step: "Understand", note: "restate the ask" },
  { step: "Classify", note: "tiny → massive" },
  { step: "Route", note: "minimum capabilities" },
  { step: "Compose", note: "load only needed refs" },
  { step: "Produce", note: "solution or lesson" },
  { step: "Review", note: "only implicated gates" },
  { step: "Document", note: "incremental patch" },
  { step: "Checkpoint", note: "if context runs low" },
];

const routes: { task: string; pull: string; skip: string }[] = [
  { task: "Build a login page", pull: "Design · Frontend · Security (authn)", skip: "K8s · DB scaling · AI" },
  { task: "Review my authentication", pull: "Security · Backend · Architecture", skip: "Design · Frontend" },
  { task: "Optimize my dashboard", pull: "Frontend (perf) · Design (UX) · Backend", skip: "Security infra · AI" },
  { task: "Add a RAG feature", pull: "AI · Backend · Security (injection)", skip: "Design · DevOps" },
  { task: "Design the order system", pull: "Architecture · Backend · Security", skip: "Frontend · Design" },
  { task: "Teach me caching", pull: "Architecture (+ Backend / DevOps links)", skip: "Design · AI" },
];

const gates: { icon: IconName; title: string; body: string }[] = [
  { icon: "devtools", title: "Code review", body: "Three-pass procedure, issues named and located, 1–10 category scores with honest calibration, then the Staff rewrite." },
  { icon: "platform", title: "Design critique", body: "Seven lenses — heuristics, cognitive load, accessibility, feasibility, business impact, craft, competitive benchmarking." },
  { icon: "git-branch", title: "Architecture review", body: "Forces → alternatives → tradeoffs → failure modes → when-not-to-use, at the altitude of a real design review." },
  { icon: "check", title: "Security review", body: "A repeatable framework: trust boundaries → input → authz → secrets → dependencies → defense in depth." },
  { icon: "cloud", title: "Operational readiness", body: "Deploy, rollback, observability, SLOs, capacity, failure, incident readiness — before a service ships." },
  { icon: "ai", title: "AI feature readiness", body: "Evals before features, grounding, injection defense, cost & latency budgets, agent guardrails." },
];

const stats = [
  { label: "Capabilities", value: "10" },
  { label: "Reference files", value: "12" },
  { label: "Modes", value: "2" },
  { label: "License", value: "MIT" },
];

const honest: { title: string; body: string }[] = [
  {
    title: "No fake token meter",
    body: "A skill can't read its own remaining context. Instead of pretending, it classifies complexity up front to bound how much it reads — proactive, not imaginary.",
  },
  {
    title: "Checkpoints, not degraded answers",
    body: "On long work it writes state and a continuation plan to disk so a fresh context resumes cleanly — rather than producing a worse answer to beat a limit.",
  },
  {
    title: "Reuse over reinvention",
    body: "Cross-session memory and codebase knowledge graphs already exist in the harness and the graphify skill. Mentor points at them instead of building parallel, rotting copies.",
  },
  {
    title: "Merged, not fragmented",
    body: "One capability equals one file. All of design is one reference, all of security is one — the registry is the router, and routing to the minimum is the token engine.",
  },
];

const faqs = [
  {
    q: "What is it, exactly?",
    a: "A skill for Claude Code — a folder of Markdown the assistant loads on request. It adds an orchestration layer that composes ten specialist engineering capabilities and runs the right review gates, in either a teaching or a building mode.",
  },
  {
    q: "Does it auto-run on every message?",
    a: "No. It triggers only when you ask — \"/mentor\", \"teach me X\", or \"use mentor to build/review Z\". It produces structured lessons and reviews, so it stays out of the way of quick one-off questions.",
  },
  {
    q: "How does it save tokens?",
    a: "Progressive disclosure. Unopened capability files cost nothing, so correct routing is the optimization. Complexity tiers cap how many files get read, and it never reloads the whole project when one module changed.",
  },
  {
    q: "Is it tied to a specific model or stack?",
    a: "The curriculum is stack-agnostic and principle-first. It's built for Claude Code but the references are plain Markdown you can read anywhere. MIT licensed.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow">{children}</p>
    </Reveal>
  );
}

export default function MentorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Mentor", href: "/mentor" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name={mentor.fullName}
        description={mentor.description}
        url={`${site.url}/mentor`}
        repo={repo}
      />

      {/* Hero */}
      <Section className="pb-0 pt-32 md:pt-40">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <Image src={mentor.logo} alt="" width={40} height={40} unoptimized className="h-10 w-10" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  <span className="status-dot scale-[0.6]" /> A SNOWBROS product · {mentor.status}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 text-[length:var(--text-4xl)] font-normal leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)]">
                One task.
                <br />
                Only the right experts.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-secondary">
                {mentor.fullName} is an engineering intelligence system for
                Claude Code. Like a senior engineering manager, it reads a task
                and pulls in only the specialists it{" "}
                <span className="text-ink">needs</span> — then either{" "}
                <span className="text-ink">teaches</span> it or{" "}
                <span className="text-ink">builds</span> it, running the reviews
                that actually apply.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href={repo} variant="primary">
                  <Icon name="github" className="text-[18px]" />
                  View on GitHub
                </Button>
                <Button href={orchestration} variant="secondary">
                  Read the engine
                  <Icon name="arrow-right" className="text-[16px]" />
                </Button>
                <code className="rounded-full border border-hairline bg-surface px-4 py-2 font-mono text-[13px] text-secondary">
                  /mentor teach me caching
                </code>
              </div>
            </Reveal>
            <RevealGroup className="mt-8 flex flex-wrap gap-2">
              {mentor.tags.map((t) => (
                <Reveal
                  as="span"
                  key={t}
                  className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 font-mono text-[11px] text-secondary"
                >
                  {t}
                </Reveal>
              ))}
            </RevealGroup>
            <Reveal delay={0.2}>
              <p className="mt-6 font-mono text-[11px] text-muted">
                10 capabilities · 12 references · 2 modes · MIT
              </p>
            </Reveal>
          </div>

          {/* Routing visual — built, not an asset */}
          <Reveal delay={0.1}>
            <div className="card-engineered overflow-hidden p-6 md:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                Router · example
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 font-mono text-[13px] text-ink">
                <Icon name="arrow-right" className="text-[14px] text-accent" />
                &ldquo;Build a login page&rdquo;
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                Pulled
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {["Product Design", "Frontend Engineering", "Accessibility", "Security · authentication"].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 rounded-md border border-hairline bg-accent-weak/60 px-3 py-2 font-mono text-[12px] text-ink"
                  >
                    <Icon name="check" className="text-[13px] text-accent" />
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                Skipped
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Cloud Security", "Kubernetes", "Database Scaling", "AI Engineering"].map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-hairline bg-surface px-3 py-1.5 font-mono text-[12px] text-muted line-through decoration-hairline"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Two modes */}
      <Section>
        <Eyebrow>// two modes</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            The same experts can teach it, or build it.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2">
          {modes.map((m) => (
            <Reveal as="div" key={m.label}>
              <div className="card-engineered h-full p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-hairline bg-accent-weak text-accent">
                    <Icon name={m.icon} className="text-[20px]" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {m.label}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {m.body}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary">
                      <Icon name="check" className="mt-1 text-[14px] text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Capabilities */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// ten capabilities</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Merged, not fragmented. One capability, one file.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Reveal as="div" key={c.title}>
              <div className="card-engineered h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-hairline bg-accent-weak text-accent">
                  <Icon name={c.icon} className="text-[20px]" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">
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

      {/* How orchestration works */}
      <Section className="border-t border-hairline">
        <Eyebrow>// how it works</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Decide what to read before reading it.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 flex flex-wrap items-stretch gap-3">
          {loop.map((p, i) => (
            <Reveal as="div" key={p.step} className="flex items-center gap-3">
              <div className="card-engineered min-w-[9.5rem] px-4 py-3">
                <p className="font-mono text-sm font-medium text-ink">{p.step}</p>
                <p className="mt-1 font-mono text-[11px] text-muted">{p.note}</p>
              </div>
              {i < loop.length - 1 && (
                <Icon name="arrow-right" className="text-[18px] text-accent/50" />
              )}
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-secondary">
            Progressive disclosure is the token engine — unopened references cost
            nothing, so correct routing is the optimization.{" "}
            <a href={orchestration} className="text-accent">
              Read the orchestration engine →
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Routing examples */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// routing</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            It never invokes every capability.
          </h2>
        </Reveal>
        <Reveal className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-surface text-left text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Task</th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">Pulled</th>
                <th className="p-5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Skipped</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((row) => (
                <tr key={row.task} className="border-b border-hairline last:border-b-0">
                  <td className="p-5 font-medium text-ink">{row.task}</td>
                  <td className="bg-accent-weak/50 p-5 font-medium text-accent">{row.pull}</td>
                  <td className="p-5 text-muted">{row.skip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* Review gates */}
      <Section className="border-t border-hairline">
        <Eyebrow>// review gates</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Only the reviews the change implicates.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gates.map((g) => (
            <Reveal as="div" key={g.title}>
              <div className="card-engineered h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] border border-hairline bg-accent-weak text-accent">
                  <Icon name={g.icon} className="text-[20px]" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-[-0.01em]">
                  {g.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {g.body}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Honest by design */}
      <Section className="border-t border-hairline bg-elevated">
        <Eyebrow>// honest by design</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            It does what a skill really can — and refuses to fake the rest.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {honest.map((h) => (
            <Reveal as="div" key={h.title} className="card-engineered p-7">
              <h3 className="text-lg font-semibold tracking-[-0.01em]">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{h.body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Install */}
      <Section className="border-t border-hairline">
        <Eyebrow>// install</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Clone it into your skills folder. Then just ask.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal as="div" className="card-engineered p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Global — all projects
            </p>
            <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-hairline bg-background p-4 font-mono text-[13px] leading-relaxed text-ink">
              <code>git clone https://github.com/snowbros-labs/mentor-skill.git ~/.claude/skills/mentor</code>
            </pre>
          </Reveal>
          <Reveal as="div" className="card-engineered p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Then, in Claude Code
            </p>
            <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] border border-hairline bg-background p-4 font-mono text-[13px] leading-relaxed text-ink">
              <code>/mentor review my authentication</code>
            </pre>
          </Reveal>
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-secondary">
            It triggers only when you ask for it, so quick one-off questions stay
            quick.{" "}
            <a href={readme} className="text-accent">
              Read the README →
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Stats */}
      <Section className="border-t border-hairline">
        <Eyebrow>// at a glance</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Open source, and small on purpose.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((r) => (
            <Reveal as="div" key={r.label} className="card-engineered p-6">
              <p className="text-[length:var(--text-3xl)] font-normal leading-none tracking-[-0.02em] text-ink">
                {/^\d+$/.test(r.value) ? <Counter value={r.value} /> : r.value}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {r.label}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
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
              // open source · MIT
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-[length:var(--text-4xl)] leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-[#f8f9f8]">
              A Staff engineer and a whole curriculum, in one skill.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-[#c3d0ca]">
              Clone it, read it, and put it to work — then tell us where it&rsquo;s
              wrong.
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
                href={readme}
                className="inline-flex h-14 items-center px-6 text-base text-[#c3d0ca] transition-colors hover:text-white"
              >
                Read the docs
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
