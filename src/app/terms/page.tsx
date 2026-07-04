import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the SNOWBROS website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      slug="terms"
      title="Terms of Service"
      updated="June 2026"
      intro="Plain terms for using this site. Engagement contracts are handled separately."
      sections={[
        {
          heading: "Use of this site",
          paragraphs: [
            "This website is provided for informational purposes. You may browse, share, and reference it freely.",
            "You agree not to misuse the site — no attempts to disrupt, probe, or reverse-engineer it beyond ordinary use.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The SNOWBROS name, wordmark, written content, and original artwork on this site are ours. Open-source projects are governed by their individual licenses.",
          ],
        },
        {
          heading: "No warranty",
          paragraphs: [
            "The site is provided as is. We work hard to keep it accurate and available but make no guarantees of either.",
          ],
        },
        {
          heading: "Engagements",
          paragraphs: [
            "Any paid work is governed by a separate signed agreement, which takes precedence over these terms for that work.",
          ],
        },
      ]}
    />
  );
}
