import type { ContactInput } from "./schema";

/*
  Branded Resend email for contact-form submissions — SNOWBROS engineering vibe.
  Email-safe: table layout, all styles inline, web-safe fonts, no external assets.
  Renders both an HTML body and a plaintext fallback.
*/

const C = {
  bg: "#eef2f1",
  card: "#ffffff",
  ink: "#171717",
  secondary: "#5f6468",
  muted: "#8a8f92",
  border: "#d6dbd8",
  accent: "#24423a",
  accentWeak: "#e8f0ec",
  terminal: "#0d1310",
  terminalGreen: "#8fd8c0",
  mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string) {
  const v = value && value.trim() ? esc(value) : "—";
  return `
    <tr>
      <td style="padding:12px 0;border-top:1px solid ${C.border};font-family:${C.mono};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};white-space:nowrap;vertical-align:top;width:38%;">${esc(label)}</td>
      <td style="padding:12px 0 12px 16px;border-top:1px solid ${C.border};font-family:${C.sans};font-size:14px;color:${C.ink};vertical-align:top;">${v}</td>
    </tr>`;
}

export function renderContactEmail(data: ContactInput) {
  const when = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${C.bg};">
  <div style="display:none;max-height:0;overflow:hidden;">New project brief from ${esc(data.name)} — ${esc(data.email)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- terminal header -->
        <tr><td style="background:${C.terminal};border-radius:14px 14px 0 0;padding:14px 20px;font-family:${C.mono};font-size:12px;color:${C.terminalGreen};">
          <span style="display:inline-block;height:8px;width:8px;border-radius:50%;background:${C.terminalGreen};vertical-align:middle;margin-right:8px;"></span>
          ▸ new project brief · snowbros.me
        </td></tr>

        <!-- body card -->
        <tr><td style="background:${C.card};border:1px solid ${C.border};border-top:none;border-radius:0 0 14px 14px;padding:32px;">

          <div style="font-family:${C.mono};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${C.accent};font-weight:600;">// new inquiry</div>
          <div style="font-family:${C.sans};font-size:24px;font-weight:600;letter-spacing:-0.02em;color:${C.ink};margin-top:10px;">${esc(data.name)}</div>
          <a href="mailto:${esc(data.email)}" style="font-family:${C.mono};font-size:13px;color:${C.accent};text-decoration:none;">${esc(data.email)}</a>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            ${row("Company", data.company)}
            ${row("Project type", data.projectType)}
            ${row("Budget", data.budget)}
            ${row("Timeline", data.timeline)}
          </table>

          <!-- message -->
          <div style="font-family:${C.mono};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};margin-top:28px;">Project description</div>
          <div style="font-family:${C.sans};font-size:15px;line-height:1.65;color:${C.ink};background:${C.accentWeak};border-left:3px solid ${C.accent};border-radius:6px;padding:16px 18px;margin-top:10px;white-space:pre-wrap;">${esc(data.message)}</div>

          <!-- reply cta -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr><td style="background:${C.accent};border-radius:9999px;">
              <a href="mailto:${esc(data.email)}?subject=Re:%20your%20project%20brief" style="display:inline-block;padding:12px 24px;font-family:${C.sans};font-size:14px;font-weight:500;color:#f8f9f8;text-decoration:none;">Reply to ${esc(data.name.split(" ")[0] || "sender")} →</a>
            </td></tr>
          </table>

        </td></tr>

        <!-- footer -->
        <tr><td style="padding:20px 8px;font-family:${C.mono};font-size:11px;color:${C.muted};">
          SNOWBROS · Engineering software that lasts · ${esc(when)}
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `NEW PROJECT BRIEF — snowbros.me`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Project type: ${data.projectType || "—"}`,
    `Budget: ${data.budget || "—"}`,
    `Timeline: ${data.timeline || "—"}`,
    ``,
    `Description:`,
    data.message,
    ``,
    `Submitted: ${when}`,
  ].join("\n");

  return { html, text, subject: `New project brief — ${data.name}` };
}
