"use server";

import { contactSchema, type ContactInput, type ContactResult } from "./schema";
import { renderContactEmail } from "./email-template";

export async function submitContact(
  input: ContactInput,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.website) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // When email is configured, send via Resend. Otherwise, accept and log
  // so the form works in development without secrets.
  if (apiKey && to) {
    const { html, text, subject } = renderContactEmail(parsed.data);
    const from = process.env.CONTACT_FROM_EMAIL || "SNOWBROS <onboarding@resend.dev>";
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: parsed.data.email,
          subject,
          html,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch {
      return {
        ok: false,
        error: "We couldn't send that just now. Please email us directly.",
      };
    }
  } else {
    console.info("[contact] inquiry received (email not configured)", {
      name: parsed.data.name,
      email: parsed.data.email,
    });
  }

  return { ok: true };
}
