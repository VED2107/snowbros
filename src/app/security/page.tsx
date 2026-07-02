import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How SNOWBROS secures this site and how to responsibly disclose a vulnerability.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <LegalPage
      slug="security"
      title="Security & Responsible Disclosure"
      updated="June 2026"
      intro="We take security seriously — on this site and in everything we build."
      sections={[
        {
          heading: "How this site is protected",
          paragraphs: [
            "The site is served over HTTPS with a strict Content Security Policy and modern security headers, including HSTS, frame protections, and a restrictive referrer policy.",
            "We minimize client-side JavaScript, validate all input server-side, and store no unnecessary data.",
          ],
        },
        {
          heading: "Reporting a vulnerability",
          paragraphs: [
            "If you believe you have found a security issue, email security@snowbros.studio with details and steps to reproduce. Please give us a reasonable window to respond before any public disclosure.",
            "We will acknowledge your report, keep you updated, and credit you if you wish once the issue is resolved.",
          ],
        },
        {
          heading: "Scope",
          paragraphs: [
            "Testing must not harm users or data. No denial-of-service, no social engineering, and no automated scanning that degrades service for others.",
          ],
        },
      ]}
    />
  );
}
