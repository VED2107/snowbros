export const site = {
  name: "SNOWBROS",
  legalName: "SNOWBROS",
  tagline: "Engineering software that lasts.",
  description:
    "SNOWBROS is an independent software engineering studio building scalable SaaS platforms, AI applications, premium websites, automation systems, and internal business tools engineered for long-term growth.",
  longDescription:
    "SNOWBROS is a product-focused software engineering studio founded by Ved Chauhan. We specialize in modern web applications, AI-powered products, SaaS platforms, developer tools, and cloud-native systems. Every project is engineered with scalability, maintainability, accessibility, and performance as first principles.",
  url: "https://www.snowbros.me",
  locale: "en_US",
  email: "snowbros2107@gmail.com",
  founderEmail: "vedchauhan2107@gmail.com",
  location: "India",
  timezone: "GMT +5:30 (IST)",
  businessHours: "Mon–Fri · 09:00–19:00 IST",
  responseTime: "Usually within 24 hours",
  status: "Available for new projects",
  nextAvailability: "Immediately",
  social: {
    github: "https://github.com/VED2107",
    linkedin: "https://linkedin.com/in/ved-chauhan2107",
    portfolio: "https://ved.exe.snowbros.me",
  },
  founder: {
    name: "Ved Chauhan",
    role: "Founder & Software Engineer",
    bio: "Ved Chauhan is a full-stack software engineer focused on building modern digital products with an emphasis on performance, scalability, and thoughtful user experience. He founded SNOWBROS to create software that stays reliable and maintainable long after launch.",
    longBio:
      "Ved specializes in modern web technologies including Next.js, React, TypeScript, Supabase, PostgreSQL, Cloudflare, and AI integrations. His work combines engineering discipline with product thinking, helping businesses move from ideas to production-ready software.",
    expertise: [
      "Software Engineering",
      "Full Stack Development",
      "SaaS Architecture",
      "AI Applications",
      "UI Engineering",
      "Backend Systems",
      "Cloud Infrastructure",
      "Developer Experience",
      "Performance Optimization",
      "Automation",
    ],
    email: "vedchauhan2107@gmail.com",
    portfolio: "https://ved.exe.snowbros.me",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Labs", href: "/labs" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Studio",
    items: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Careers", href: "/careers" },
      { label: "Credits", href: "/credits" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Work",
    items: [
      { label: "Selected Work", href: "/work" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Labs", href: "/labs" },
      { label: "Open Source", href: "/open-source" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Engineering Blog", href: "/blog" },
      { label: "Open Source", href: "/open-source" },
      { label: "Search", href: "/search" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Security", href: "/security" },
    ],
  },
];
