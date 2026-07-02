"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { contactSchema, type ContactInput } from "./schema";
import { submitContact } from "./actions";

const fieldBase =
  "peer w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted hover:border-hairline-strong focus:border-accent focus:bg-card focus:shadow-[0_0_0_4px_var(--color-accent-weak)]";

const projectTypes = [
  "Software platform",
  "SaaS product",
  "AI application",
  "Developer tool",
  "Cloud infrastructure",
  "Something else",
];

const timelines = ["ASAP", "1–3 months", "3–6 months", "Exploring"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    const result = await submitContact(values);
    if (result.ok) setSent(true);
    else setServerError(result.error);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-card shadow-[0_1px_2px_rgba(23,23,23,0.06),0_16px_32px_-20px_rgba(23,23,23,0.22)]"
      >
        {/* deployment-style confirmation */}
        <div className="border-b border-hairline bg-elevated px-7 py-4 font-mono text-[12px] text-muted">
          <span className="text-accent">✓</span> request received · queued for
          review
        </div>
        <div className="space-y-2 px-7 py-7 font-mono text-[13px]">
          {[
            "▸ validating brief …",
            "✓ brief accepted",
            "✓ routed to engineering",
            "◆ reply scheduled · < 24h",
          ].map((l, i) => (
            <p
              key={l}
              className={cn(
                "animate-in fade-in slide-in-from-bottom-1",
                l.startsWith("✓") || l.startsWith("◆")
                  ? "text-accent"
                  : "text-secondary",
              )}
              style={{ animationDelay: `${i * 140}ms`, animationFillMode: "both" }}
            >
              {l}
            </p>
          ))}
        </div>
        <div className="border-t border-hairline px-7 py-6">
          <h2 className="text-lg font-semibold tracking-[-0.01em]">
            Project review requested.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            Thanks — your brief is in. We reply to every serious inquiry within
            one working day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-hairline bg-card p-7 shadow-[0_1px_2px_rgba(23,23,23,0.06),0_16px_32px_-20px_rgba(23,23,23,0.22)] md:p-8"
    >
      <div className="flex items-center gap-2 border-b border-hairline pb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span className="status-dot scale-75" />
        Project brief
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            className={cn(fieldBase, errors.name && "border-destructive")}
            autoComplete="name"
            placeholder="Ada Lovelace"
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            className={cn(fieldBase, errors.email && "border-destructive")}
            autoComplete="email"
            placeholder="you@company.com"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" hint="Optional">
          <input
            className={fieldBase}
            autoComplete="organization"
            placeholder="Acme Inc."
            {...register("company")}
          />
        </Field>
        <Field label="Project type" hint="Optional">
          <div className="relative">
            <select
              className={cn(fieldBase, "appearance-none pr-10")}
              defaultValue=""
              {...register("projectType")}
            >
              <option value="" disabled>
                Select…
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Icon
              name="arrow-right"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[15px] text-muted"
            />
          </div>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Budget" hint="Optional">
          <input
            className={fieldBase}
            placeholder="e.g. $50k–100k"
            {...register("budget")}
          />
        </Field>
        <Field label="Timeline" hint="Optional">
          <div className="relative">
            <select
              className={cn(fieldBase, "appearance-none pr-10")}
              defaultValue=""
              {...register("timeline")}
            >
              <option value="" disabled>
                Select…
              </option>
              {timelines.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Icon
              name="arrow-right"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[15px] text-muted"
            />
          </div>
        </Field>
      </div>

      <Field label="What are you building?" error={errors.message?.message}>
        <textarea
          rows={6}
          className={cn(
            fieldBase,
            "resize-y",
            errors.message && "border-destructive",
          )}
          placeholder="A sentence or two about the project, the timeline, and what success looks like."
          {...register("message")}
        />
      </Field>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 border-t border-hairline pt-6">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Request project review"}
          {!isSubmitting && (
            <Icon
              name="arrow-right"
              className="text-[18px] transition-transform duration-[180ms] group-hover/btn:translate-x-1"
            />
          )}
        </Button>
        <p className="font-mono text-xs text-muted">
          Encrypted · we never share your details
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-secondary">
        {label}
        {hint && (
          <span className="font-sans text-[11px] normal-case tracking-normal text-muted">
            {hint}
          </span>
        )}
      </span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}
