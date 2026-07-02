import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SNOWBROS collects, uses, and protects your data. Privacy-first by design.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      slug="privacy"
      title="Privacy Policy"
      updated="June 2026"
      intro="We collect as little as possible, and we tell you exactly what and why."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you contact us, we store the details you send: your name, email, and message. That is it.",
            "We use privacy-first, cookieless analytics to understand aggregate traffic. We do not build advertising profiles or sell data — ever.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "Contact details are used solely to reply to your inquiry and, if we work together, to run the engagement.",
            "Analytics are used to improve the site. All measurement is aggregate and anonymous.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can request access to, correction of, or deletion of any personal data we hold about you at any time.",
            "Email hello@snowbros.studio and we will action requests promptly.",
          ],
        },
        {
          heading: "Retention",
          paragraphs: [
            "We keep inquiry data only as long as needed to respond or fulfil an engagement, then delete it.",
          ],
        },
      ]}
    />
  );
}
