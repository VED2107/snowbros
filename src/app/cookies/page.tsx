import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "SNOWBROS uses privacy-first, cookieless analytics. Here's exactly what runs in your browser.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      slug="cookies"
      title="Cookie Policy"
      updated="June 2026"
      intro="Short version: we don't use tracking cookies."
      sections={[
        {
          heading: "Essential only",
          paragraphs: [
            "This site does not set advertising or cross-site tracking cookies. Any storage used is strictly to make the site function — for example, remembering your reduced-motion preference.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "We use privacy-first analytics that measure aggregate traffic without identifying individuals and without persistent cross-site identifiers.",
          ],
        },
        {
          heading: "Your control",
          paragraphs: [
            "Because we avoid non-essential cookies, there is nothing to opt out of. You can still clear site data from your browser at any time.",
          ],
        },
      ]}
    />
  );
}
