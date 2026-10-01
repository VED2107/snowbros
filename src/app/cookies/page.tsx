import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "SNOWBROS sets no tracking cookies and runs no analytics. Here is exactly what is stored in your browser.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      slug="cookies"
      title="Cookie Policy"
      updated="October 2026"
      intro="Short version: we don't use tracking cookies."
      sections={[
        {
          heading: "Essential only",
          paragraphs: [
            "This site does not set advertising, analytics or cross-site tracking cookies. The only browser storage it uses is session storage to remember, for the current tab, whether Blueprint mode is on.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "There are none. We do not measure traffic on this site.",
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
