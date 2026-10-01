import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How SNOWBROS collects, uses, and protects your data. Privacy-first by design.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      slug="privacy"
      title="Privacy Policy"
      updated="October 2026"
      intro="We collect as little as possible, and we tell you exactly what and why."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you contact us, we store the details you send: your name, email, and message. That is it.",
            "This site runs no analytics and no third-party trackers. We do not build advertising profiles or sell data, ever.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [
            "Contact details are used solely to reply to your inquiry and, if we work together, to run the engagement.",
            "Messages from the contact form are delivered to our inbox by an email provider (Resend) and are not used for anything else.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can request access to, correction of, or deletion of any personal data we hold about you at any time.",
            "Email snowbros2107@gmail.com and we will action requests promptly.",
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
