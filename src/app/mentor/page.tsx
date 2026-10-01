import type { Metadata } from "next";
import { MentorRouter } from "@/components/products/mentor-router";
import { pageMetadata } from "@/lib/seo";
import { site, products } from "@/lib/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
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
      "Snowbros Mentor, an engineering intelligence system for Claude Code. A capability orchestrator that composes only the specialist expertise a task needs (software, backend, frontend, architecture, security, design, AI, DevOps, leadership) in two modes: TEACH (train toward Principal-grade judgment from first principles) and BUILD (act as an autonomous Staff engineer). Honest by design, no fake token meters. MIT, open source.",
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
    body: "From first principles, not recipes. Full lessons with mental models, exercises, review gates, and a leveled roadmap from Foundations to Principal, verified by retrieval, not assertion.",
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
    body: "Classify the task, route to only the needed capabilities, produce the solution, then run only the review gates the change implicates, and say which ones and why.",
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


const gates: { icon: IconName; title: string; body: string }[] = [
  { icon: "devtools", title: "Code review", body: "Three-pass procedure, issues named and located, 1-10 category scores with honest calibration, then the Staff rewrite." },
  { icon: "platform", title: "Design critique", body: "Seven lenses, heuristics, cognitive load, accessibility, feasibility, business impact, craft, competitive benchmarking." },
  { icon: "git-branch", title: "Architecture review", body: "Forces → alternatives → tradeoffs → failure modes → when-not-to-use, at the altitude of a real design review." },
  { icon: "check", title: "Security review", body: "A repeatable framework: trust boundaries → input → authz → secrets → dependencies → defense in depth." },
  { icon: "cloud", title: "Operational readiness", body: "Deploy, rollback, observability, SLOs, capacity, failure, incident readiness, before a service ships." },
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
    body: "A skill can't read its own remaining context. Instead of pretending, it classifies complexity up front to bound how much it reads, proactive, not imaginary.",
  },
  {
    title: "Checkpoints, not degraded answers",
    body: "On long work it writes state and a continuation plan to disk so a fresh context resumes cleanly, rather than producing a worse answer to beat a limit.",
  },
  {
    title: "Reuse over reinvention",
    body: "Cross-session memory and codebase knowledge graphs already exist in the harness and the graphify skill. Mentor points at them instead of building parallel, rotting copies.",
  },
  {
    title: "Merged, not fragmented",
    body: "One capability equals one file. All of design is one reference, all of security is one, the registry is the router, and routing to the minimum is the token engine.",
  },
];

const faqs = [
  {
    q: "What is it, exactly?",
    a: "A skill for Claude Code, a folder of Markdown the assistant loads on request. It adds an orchestration layer that composes ten specialist engineering capabilities and runs the right review gates, in either a teaching or a building mode.",
  },
  {
    q: "Does it auto-run on every message?",
    a: "No. It triggers only when you ask, \"/mentor\", \"teach me X\", or \"use mentor to build/review Z\". It produces structured lessons and reviews, so it stays out of the way of quick one-off questions.",
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
    <Reveal className="plot">
      <div className="plot-rule h-px w-full bg-ink" aria-hidden />
      <span className="sr-only">{children}</span>
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

      {/* Hero: the router, operable */}
      <section aria-labelledby="mentor-title" className="border-b border-ink">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-[var(--spacing-gutter)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="meta enter">
              <a href="/products" className="hover:text-ink">Products</a>
              <span aria-hidden> / </span>
              <span className="text-ink">{mentor.fullName}</span>
            </nav>
            <h1
              id="mentor-title"
              className="enter mt-6 text-[clamp(2.5rem,1.5rem+3.4vw,4.25rem)] font-medium leading-[1] tracking-[-0.04em] text-ink"
              style={{ "--enter-delay": "60ms" } as React.CSSProperties}
            >
              One task.
              <br />
              Only the experts it needs<span className="link-accent">.</span>
            </h1>
            <p
              className="enter mt-7 max-w-[44ch] text-[length:var(--text-lg)] leading-[1.6] text-secondary"
              style={{ "--enter-delay": "140ms" } as React.CSSProperties}
            >
              A skill for Claude Code that reads a task, routes it to the few
              engineering disciplines it involves, then teaches it or builds it
              and runs only the reviews that apply.
            </p>
            <div className="enter mt-8 flex flex-col items-start gap-4" style={{ "--enter-delay": "220ms" } as React.CSSProperties}>
              <code className="rounded-[var(--radius-md)] border border-ink bg-ink px-4 py-3 font-mono text-[13px] text-background">
                <span className="link-accent">$ </span>/mentor teach me caching
              </code>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button href={repo}>Source on GitHub</Button>
                <Button href={orchestration} variant="text">
                  Read the engine
                </Button>
              </div>
            </div>
            <dl className="enter mt-10 grid grid-cols-4 border-t border-ink" style={{ "--enter-delay": "300ms" } as React.CSSProperties}>
              {stats.map((s) => (
                <div key={s.label} className="py-3 pr-3">
                  <dt className="meta">{s.label}</dt>
                  <dd className="mt-1 font-mono text-[14px] text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="enter lg:col-span-6" style={{ "--enter-delay": "180ms" } as React.CSSProperties}>
            <MentorRouter />
          </div>
        </div>
      </section>

      {/* Two modes */}
      <Section>
        <Eyebrow>two modes</Eyebrow>
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
      <Section className="border-t border-hairline">
        <Eyebrow>ten capabilities</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Merged, not fragmented. One capability, one file.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
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

      {/* How orchestration works */}
      <Section className="border-t border-hairline">
        <Eyebrow>how it works</Eyebrow>
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
            Progressive disclosure is the token engine, unopened references cost
            nothing, so correct routing is the optimization.{" "}
            <a href={orchestration} className="link-accent">
              Read the orchestration engine
            </a>
          </p>
        </Reveal>
      </Section>

      {/* Review gates */}
      <Section className="border-t border-hairline">
        <Eyebrow>review gates</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Only the reviews the change implicates.
          </h2>
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gates.map((g) => (
            <Reveal as="div" key={g.title}>
              <div className="h-full border-t border-ink pt-5">
                <h3 className="text-[17px] font-medium tracking-[-0.015em]">
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
      <Section className="border-t border-hairline">
        <Eyebrow>honest by design</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            It does what a skill really can, and refuses to fake the rest.
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
        <Eyebrow>install</Eyebrow>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl text-[length:var(--text-3xl)] leading-[var(--text-3xl--line-height)] tracking-[var(--text-3xl--letter-spacing)]">
            Clone it into your skills folder. Then just ask.
          </h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal as="div" className="card-engineered p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Global, all projects
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
            <a href={readme} className="link-accent">
              Read the README
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
      </Section>

      {/* Closing: one action, plainly */}
      <section className="border-t border-ink">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-[var(--spacing-gutter)] py-16 md:grid-cols-12 md:items-end md:py-24">
          <h2 className="text-[length:var(--text-4xl)] leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-ink md:col-span-7">
            A Staff engineer and a curriculum, in one skill.
          </h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-[15px] leading-relaxed text-secondary">Clone it into your skills folder, then ask. It stays out of the way until you call it.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={repo}>Source on GitHub</Button>
              <Button href={readme} variant="text">
                Read the README
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
