"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/*
  Mentor hero specimen: the router, operable. Pick a task and a mode; the
  ten capabilities light up only where the task needs them. Cells change by
  color and weight (160ms ease), not by moving, because the grid is a fixed
  map and position is the information.
*/

const CAPS = [
  "Software Core",
  "Backend & Data",
  "Frontend & Web",
  "Architecture",
  "Security",
  "Design",
  "AI Engineering",
  "DevOps & SRE",
  "Leadership",
  "Learning System",
] as const;

type Cap = (typeof CAPS)[number];

const ROUTES: { task: string; pull: Cap[]; note: string; skip: string }[] = [
  { task: "Build a login page", pull: ["Design", "Frontend & Web", "Security"], note: "Security: authn", skip: "K8s, DB scaling, AI" },
  { task: "Review my authentication", pull: ["Security", "Backend & Data", "Architecture"], note: "", skip: "Design, Frontend" },
  { task: "Optimize my dashboard", pull: ["Frontend & Web", "Design", "Backend & Data"], note: "Frontend: performance, Design: UX", skip: "Security infra, AI" },
  { task: "Add a RAG feature", pull: ["AI Engineering", "Backend & Data", "Security"], note: "Security: prompt injection", skip: "Design, DevOps" },
  { task: "Design the order system", pull: ["Architecture", "Backend & Data", "Security"], note: "", skip: "Frontend, Design" },
  { task: "Teach me caching", pull: ["Architecture", "Backend & Data", "DevOps & SRE"], note: "Backend and DevOps as links", skip: "Design, AI" },
];

const GATE: Partial<Record<Cap, string>> = {
  Security: "security review",
  Design: "design critique",
  Architecture: "architecture review",
  "AI Engineering": "AI feature readiness",
  "Backend & Data": "code review",
  "Frontend & Web": "code review",
  "DevOps & SRE": "operational readiness",
};

export function MentorRouter() {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<"BUILD" | "TEACH">("BUILD");
  const r = ROUTES[i];
  const gates = Array.from(new Set(r.pull.map((c) => GATE[c]).filter(Boolean)));

  return (
    <figure data-sheet="MentorRouter: 6 routes x 10 capabilities">
      <div className="border border-ink bg-surface">
        {/* Mode */}
        <div className="flex items-center justify-between gap-4 border-b border-ink px-4 py-2.5">
          <span className="font-mono text-[12px] text-ink">
            <span className="text-accent">/mentor </span>
            {mode === "TEACH" ? "teach me" : "build"}
          </span>
          <div role="radiogroup" aria-label="Mode" className="flex rounded-[var(--radius-md)] border border-hairline-strong p-0.5">
            {(["BUILD", "TEACH"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "h-7 rounded-[3px] px-3 font-mono text-[11px] transition-colors duration-[160ms]",
                  mode === m ? "bg-ink text-background" : "text-secondary hover:text-ink",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Task */}
        <div role="radiogroup" aria-label="Task" className="flex flex-wrap gap-1.5 border-b border-hairline-strong px-4 py-3">
          {ROUTES.map((t, k) => (
            <button
              key={t.task}
              type="button"
              role="radio"
              aria-checked={i === k}
              onClick={() => setI(k)}
              className={cn(
                "h-8 rounded-[var(--radius-md)] border px-2.5 text-[12.5px] transition-[background-color,color,border-color,transform] duration-[160ms] ease-[var(--ease-out-soft)] active:scale-[0.97]",
                i === k ? "border-ink text-ink" : "border-transparent text-secondary hover:border-hairline-strong hover:text-ink",
              )}
            >
              {t.task}
            </button>
          ))}
        </div>

        {/* Capability map */}
        <ul className="grid grid-cols-2 sm:grid-cols-5" aria-label="Capabilities">
          {CAPS.map((c, k) => {
            const on = r.pull.includes(c);
            return (
              <li
                key={c}
                className={cn(
                  "flex min-h-[64px] flex-col justify-between border-hairline-strong px-3 py-2.5 text-[12.5px] leading-tight transition-[background-color,color] duration-[160ms] ease-out",
                  "border-b sm:[&:nth-child(-n+5)]:border-b sm:[&:nth-child(n+6)]:border-b-0",
                  k % 5 !== 4 && "sm:border-r",
                  k % 2 === 0 && "max-sm:border-r",
                  on ? "bg-ink text-background" : "text-muted",
                )}
              >
                <span className={on ? "font-medium" : undefined}>{c}</span>
                <span className={cn("font-mono text-[10px]", on ? "text-accent" : "text-transparent")} aria-hidden={!on}>
                  {on ? "routed" : "-"}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Output */}
        <div key={`${i}-${mode}`} className="swap-in border-t border-ink px-4 py-3 text-[13px] leading-relaxed text-ink">
          {mode === "BUILD" ? (
            <p>
              Produce the change, then run only the gates it implicates:{" "}
              <span className="text-secondary">{gates.join(", ")}</span>.
            </p>
          ) : (
            <p>
              A lesson from first principles, exercises with solutions withheld, then interview-style questions.
            </p>
          )}
          <p className="mt-1 text-[12px] text-muted">
            Skipped: {r.skip}
            {r.note && <>. Focus: {r.note}</>}
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-[12px] text-muted">
        Routes from Mentor&apos;s examples. Unopened capability files cost nothing, so routing is the optimization.
      </figcaption>
    </figure>
  );
}
