"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { contactSchema, type ContactInput } from "./schema";
import { submitContact } from "./actions";

/*
  The brief, as a ruled form sheet: every field is a cell with its label in
  the corner, like the boxes on a drawing's title block. Choices that have a
  short, known set of answers are buttons, not dropdowns: one tap, all
  options visible.
*/

const projectTypes = [
  "New product",
  "Internal system",
  "Existing codebase",
  "AI or automation",
  "Developer tooling",
  "Not sure yet",
];

const budgets = ["Under $5k", "$5k to $15k", "$15k to $40k", "$40k+", "Not sure yet"];

const input =
  "w-full bg-transparent px-0 pb-1 pt-1 text-[16px] text-ink outline-none placeholder:text-[#8b857a]";

export function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  const type = watch("projectType");
  const budget = watch("budget");

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    const result = await submitContact(values);
    if (result.ok) setSent(values.email);
    else setServerError(result.error);
  }

  if (sent) {
    return (
      <div role="status" className="border border-ink bg-surface swap-in">
        <div className="flex items-center justify-between border-b border-ink px-5 py-3">
          <span className="text-[14px] font-medium text-ink">Brief received</span>
          <span className="meta inline-flex items-center gap-2">
            Logged
          </span>
        </div>
        <div className="px-5 py-8">
          <p className="text-[length:var(--text-2xl)] leading-tight tracking-[-0.03em] text-ink">
            Thank you. An engineer will read it, not a bot.
          </p>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-secondary">
            Expect a reply at <span className="text-ink">{sent}</span>{" "}
            {site.responseTime.toLowerCase()}, with questions and a first view
            of how we would approach it. Anything to add in the meantime? Write
            to{" "}
            <a href={`mailto:${site.email}`} className="link-accent">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Project brief" className="border border-ink bg-surface" data-sheet="ContactForm: ruled brief, Zod-validated">
      <div className="flex items-center justify-between border-b border-ink px-5 py-3">
        <span className="text-[14px] font-medium text-ink">Project brief</span>
        <span className="meta">Takes about two minutes</span>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2">
        <Cell label="Name" htmlFor="f-name" error={errors.name?.message} className="sm:border-r">
          <input id="f-name" className={input} autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        </Cell>
        <Cell label="Email" htmlFor="f-email" error={errors.email?.message}>
          <input
            id="f-email"
            type="email"
            inputMode="email"
            className={input}
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Cell>
      </div>

      <Cell label="Company" hint="Optional" htmlFor="f-company">
        <input id="f-company" className={input} autoComplete="organization" {...register("company")} />
      </Cell>

      <Choice
        legend="What kind of work"
        options={projectTypes}
        value={type ?? ""}
        onChange={(v) => setValue("projectType", v, { shouldDirty: true })}
      />

      <Choice
        legend="Budget range"
        hint="Optional"
        options={budgets}
        value={budget ?? ""}
        onChange={(v) => setValue("budget", v, { shouldDirty: true })}
      />

      <Cell label="What are you working on?" htmlFor="f-message" error={errors.message?.message}>
        <textarea
          id="f-message"
          rows={6}
          className={cn(input, "resize-y leading-relaxed")}
          placeholder="What exists today, what needs to change, and what a good outcome looks like."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Cell>

      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta max-w-[40ch]">
          Sent straight to the studio inbox. We never share it.
        </p>
        <Button type="submit" size="lg" keyGlyph="next" disabled={isSubmitting}>
          {isSubmitting ? "Sending" : "Send brief"}
        </Button>
      </div>
      {serverError && (
        <p role="alert" className="border-t border-destructive/40 bg-[#fbeeea] px-5 py-3 text-[14px] text-destructive">
          {serverError}
        </p>
      )}
    </form>
  );
}

function Cell({
  label,
  hint,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group/cell border-b border-hairline-strong px-5 pb-3 pt-3 transition-colors duration-[160ms] focus-within:bg-[#fffdf9]",
        error && "bg-[#fbeeea]",
        className,
      )}
    >
      <label htmlFor={htmlFor} className="meta flex items-center justify-between transition-colors group-focus-within/cell:text-accent">
        <span>{label}</span>
        {hint && <span>{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[13px] text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  legend,
  hint,
  options,
  value,
  onChange,
}: {
  legend: string;
  hint?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="border-b border-hairline-strong px-5 pb-4 pt-3">
      <legend className="meta float-left flex w-full items-center justify-between">
        <span>{legend}</span>
        {hint && <span>{hint}</span>}
      </legend>
      <div className="clear-both flex flex-wrap gap-2 pt-3">
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? "" : o)}
              className={cn(
                "h-10 rounded-[var(--radius-md)] border px-3.5 text-[14px] transition-[background-color,color,border-color,transform] duration-[160ms] ease-[var(--ease-out-soft)] active:scale-[0.97]",
                on
                  ? "border-ink bg-ink text-background"
                  : "border-hairline-strong text-ink hover:border-ink",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
