import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility Statement",
  description:
    "SNOWBROS builds to WCAG AA. Our commitment to accessible, inclusive experiences.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      slug="accessibility"
      title="Accessibility Statement"
      updated="June 2026"
      intro="Accessibility is a baseline, not a feature. This site is built to WCAG 2.2 AA."
      sections={[
        {
          heading: "What we commit to",
          paragraphs: [
            "Semantic HTML, full keyboard operability, visible focus states, and logical tab order across every page.",
            "Color contrast that meets or exceeds WCAG AA, and a layout that reflows cleanly down to small viewports and up to 200% zoom.",
          ],
        },
        {
          heading: "Motion",
          paragraphs: [
            "All animation respects your prefers-reduced-motion setting. With reduced motion enabled, smooth scrolling and non-essential movement are disabled.",
          ],
        },
        {
          heading: "Assistive technology",
          paragraphs: [
            "Interactive components expose appropriate roles, names, and states. We test with keyboard and screen readers as part of our process.",
          ],
        },
        {
          heading: "Found a barrier?",
          paragraphs: [
            "If any part of this site is difficult to use, tell us at hello@snowbros.studio and we will fix it. Accessibility issues are treated as bugs, not requests.",
          ],
        },
      ]}
    />
  );
}
