export const site = {
  name: "SNOWBROS",
  legalName: "SNOWBROS",
  tagline: "Software, engineered to hold up in production.",
  description:
    "SNOWBROS is a software engineering studio. We design, build and maintain platforms, internal business systems and developer tools, end to end.",
  longDescription:
    "SNOWBROS is a product-focused software engineering studio founded by Ved Chauhan. We specialize in modern web applications, AI-powered products, SaaS platforms, developer tools, and cloud-native systems. Every project is engineered with scalability, maintainability, accessibility, and performance as first principles.",
  url: "https://www.snowbros.me",
  locale: "en_US",
  email: "snowbros2107@gmail.com",
  founderEmail: "vedchauhan2107@gmail.com",
  location: "India",
  timezone: "GMT+5:30",
  businessHours: "Mon to Fri, 09:00 to 19:00 IST",
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

type NavItem = { label: string; href: string };

/** A SNOWBROS product. Atlas is the first. */
type Product = {
  slug: string;
  name: string;
  fullName: string;
  href: string;
  tagline: string;
  description: string;
  status: string;
  tags: string[];
  repo: string;
  logo: string;
};

export const products: Product[] = [
  {
    slug: "atlas",
    name: "Atlas",
    fullName: "Snowbros Atlas",
    href: "/atlas",
    tagline: "Deterministic static analysis for JavaScript, TypeScript and Python.",
    description:
      "Maps a whole JavaScript, TypeScript, React, Next.js or Python project (imports, boundaries, framework model and dependency manifest) into one semantic IR, and reports only what it can prove: circular imports, dead files, server/client leaks, hook misuse, unused dependencies, hardcoded secrets. Native Rust, with an evidence chain for every finding.",
    status: "v0.4.0, open source",
    tags: ["Open Source", "Rust", "CLI", "VS Code", "Multi-language"],
    repo: "https://github.com/snowbros-labs/atlas",
    logo: "/snowbros-logo-forest.svg",
  },
  {
    slug: "mentor",
    name: "Mentor",
    fullName: "Snowbros Mentor",
    href: "/mentor",
    tagline: "An engineering-intelligence skill for Claude Code, in TEACH or BUILD mode.",
    description:
      "A capability orchestrator for Claude Code that brings in only the expertise a task needs: software, backend, frontend, architecture, security, design, AI, DevOps or leadership. TEACH mode trains judgment from first principles; BUILD mode routes the work and runs the right review gates. No invented token meters.",
    status: "v1, open source",
    tags: ["Open Source", "Claude Code", "AI", "Skill", "MIT"],
    repo: "https://github.com/snowbros-labs/mentor-skill",
    logo: "/snowbros-logo-forest.svg",
  },
];

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Studio",
    items: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Studio", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    items: [
      { label: "Atlas", href: "/atlas" },
      { label: "Mentor", href: "/mentor" },
      { label: "Open source", href: "/open-source" },
    ],
  },
  {
    title: "Elsewhere",
    items: [
      { label: "Writing", href: "/blog" },
      { label: "Labs", href: "/labs" },
      { label: "Search", href: "/search" },
      { label: "RSS", href: "/rss.xml" },
      { label: "Colophon", href: "/credits" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Security", href: "/security" },
    ],
  },
];
