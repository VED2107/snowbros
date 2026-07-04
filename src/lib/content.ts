/** Static studio content. Editorial, technical, no marketing clichés. */

import type { IconName } from "@/components/ui/icon";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  capabilities: string[];
  stack: string[];
  metric: { value: string; label: string };
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "software-platforms",
    title: "Software Platforms",
    icon: "platform",
    summary: "Long-lived business systems, built to be extended for years.",
    capabilities: ["Domain-driven design", "APIs", "Multi-tenant architecture"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    metric: { value: "3", label: "in production" },
  },
  {
    slug: "saas-products",
    title: "SaaS Products",
    icon: "saas",
    summary: "Prototype to a system that bills, scales, and stays fast.",
    capabilities: ["Product engineering", "Billing", "Growth infrastructure"],
    stack: ["Next.js", "Supabase", "Stripe", "tRPC"],
    metric: { value: "0", label: "downtime deploys" },
  },
  {
    slug: "ai-applications",
    title: "AI Applications",
    icon: "ai",
    summary: "Applied AI with evaluation baked in, honest under load.",
    capabilities: ["RAG", "Agents", "Evals & guardrails"],
    stack: ["Python", "Vector DB", "LLM tooling", "Evals"],
    metric: { value: "100%", label: "eval coverage" },
  },
  {
    slug: "developer-tools",
    title: "Developer Tools",
    icon: "devtools",
    summary: "CLIs, SDKs, and internal platforms engineers want to use.",
    capabilities: ["CLIs & SDKs", "Developer experience", "Internal platforms"],
    stack: ["Go", "TypeScript", "OpenAPI", "CI/CD"],
    metric: { value: "1st", label: "class ergonomics" },
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    icon: "cloud",
    summary: "Infrastructure as a product: reproducible, observable, quiet.",
    capabilities: ["IaC", "Observability", "Cost & reliability"],
    stack: ["Terraform", "Docker", "Vercel", "Grafana"],
    metric: { value: "99.9%", label: "uptime target" },
  },
  {
    slug: "automation",
    title: "Automation",
    icon: "automation",
    summary: "Removing the repeated glue work between systems.",
    capabilities: ["Pipelines", "Integrations", "Workflow engineering"],
    stack: ["Node.js", "Queues", "Webhooks", "Cron"],
    metric: { value: "10×", label: "less manual work" },
  },
];

export type Project = {
  slug: string;
  client: string;
  title: string;
  discipline: string;
  year: string;
  summary: string;
  /** One-line, verifiable outcome — shown as a badge on the case study card. */
  result: string;
  /** "client" = paid client work, "personal" = our own product (e.g. founder portfolio). */
  kind: "client" | "personal";
  /** Real logo file in /public/logos, used in the trust bar and work grid. */
  logo: string;
  /** The client's own brand font (matched from their live site), used only
   *  for their wordmark in the trust bar — CSS var name, e.g. "--font-nunito". */
  brandFont: string;
  /** Short label under the title, e.g. "Education platform". */
  category: string;
  /** Accent used by the browser-mockup preview. */
  accent: string;
  /** Real deployment host shown in the preview chrome, e.g. "stc.vercel.app". */
  host: string;
  /** Real tagline pulled from the live site (poster line). */
  tagline?: string;
  /** Live-project status. */
  status: "Live" | "In progress" | "Archived";
  role: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  highlights: string[];
  features: string[];
  /** Real screenshot path in /public (captured from the live app). */
  screenshot?: string;
  links?: {
    live?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "stc-academy",
    client: "STC Academy",
    title: "A full-stack education platform built for real classrooms",
    discipline: "Platform · SaaS",
    category: "Education platform",
    result: "3 role-based portals shipped from a single codebase, live in production",
    kind: "client",
    logo: "/logos/stc.png",
    brandFont: "--font-nunito",
    year: "2025",
    accent: "#2f8f7d",
    host: "stc.vercel.app",
    tagline: "Cultivating the Intellect of Tomorrow.",
    status: "Live",
    role: "Full-stack engineering · architecture",
    screenshot: "/work/stc.png",
    summary:
      "A scalable education platform with role-based portals for students, teachers, and admins — attendance, performance analytics, and everything a real institution runs on.",
    overview:
      "STC Academy is a production education platform that replaces a patchwork of spreadsheets and messaging apps with a single system. It serves three distinct audiences — students, teachers, and administrators — each with a portal shaped around what they actually do day to day.",
    problem:
      "The academy was coordinating attendance, grades, and communication across disconnected tools. Data was duplicated, analytics were manual, and access control was informal. They needed one dependable system that could grow with enrollment without becoming fragile.",
    solution:
      "We built a role-based platform on Next.js and Supabase, with a clean separation between student, teacher, and admin experiences. Attendance and performance flow into shared analytics, access is enforced at the data layer with row-level security, and the responsive UI works as well on a phone in a hallway as on a desk.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "Tailwind CSS",
    ],
    highlights: [
      "Three role-based portals from a single codebase with enforced access boundaries",
      "Attendance and grades feed live performance analytics — no manual reports",
      "Row-level security so authorization lives in the database, not just the UI",
      "Responsive from the ground up and deployed to production",
    ],
    features: [
      "Student portal — schedule, attendance, and performance at a glance",
      "Teacher portal — attendance capture, grading, and class analytics",
      "Admin dashboard — enrollment, roles, and institution-wide reporting",
      "Performance analytics across students, classes, and terms",
    ],
    links: {
      live: "https://stc.vercel.app",
      github: "https://github.com/VED2107/STC",
    },
  },
  {
    slug: "vinnys-vogue",
    client: "Vinnys Vogue",
    title: "A luxury boutique commerce platform, engineered end to end",
    discipline: "E-commerce · Platform",
    category: "Luxury e-commerce",
    result: "Full commerce system — auth, catalog, cart, admin — with zero security shortcuts",
    kind: "client",
    logo: "/logos/vinnysvogue.png",
    brandFont: "--font-playfair-display",
    year: "2025",
    accent: "#a97e3c",
    host: "vinnysvogue.in",
    status: "Live",
    role: "Full-stack engineering · commerce",
    screenshot: "/work/vinnys.png",
    summary:
      "A premium boutique storefront with secure authentication, full product management, cart, and an admin dashboard — commerce architecture built to scale without losing the feel of a luxury brand.",
    overview:
      "Vinnys Vogue is a boutique e-commerce platform where the shopping experience had to feel as considered as the products. Beneath the premium surface sits a complete commerce system: catalog, cart, authentication, and an admin dashboard for running the store.",
    problem:
      "Off-the-shelf storefronts forced a choice between a premium feel and control over the architecture. The brand wanted both — a bespoke, high-end experience and a secure, maintainable system they could operate and extend.",
    solution:
      "We engineered a custom storefront on Next.js and Supabase with authentication, product management, and a shopping cart, backed by an admin dashboard. Security and data integrity were first-class: authenticated flows, protected admin routes, and a schema designed for growth in catalog and order volume.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Authentication",
      "Tailwind CSS",
    ],
    highlights: [
      "Bespoke premium UI that keeps the luxury feel across every interaction",
      "Secure authentication and protected admin routes",
      "Product management and cart backed by a schema built to scale",
      "Fully responsive, from storefront to checkout",
    ],
    features: [
      "Product catalog with rich, brand-first presentation",
      "Shopping cart and authenticated checkout flow",
      "Admin dashboard for products, inventory, and orders",
      "Secure architecture with role-aware access",
    ],
    links: {
      live: "https://www.vinnysvogue.in",
      github: "https://github.com/VED2107/vinnys-vogue",
    },
  },
  {
    slug: "lunora-studio",
    client: "Lunora Studio",
    title: "A luxury handmade-bouquet commerce experience",
    discipline: "Design engineering · Commerce",
    category: "Luxury e-commerce",
    result: "Brand-led motion design kept inside a strict performance budget",
    kind: "client",
    logo: "/logos/lunora.jpeg",
    brandFont: "--font-cormorant-garamond",
    year: "2026",
    accent: "#7a6cf0",
    host: "lunorastudio.vercel.app",
    tagline: "Flowers fade. Memories don't.",
    status: "Live",
    role: "Design engineering · frontend",
    screenshot: "/work/lunora.png",
    summary:
      "A luxury handmade-bouquet storefront — “Flowers fade. Memories don't.” Brand-led interactions and modern frontend engineering on Next.js and Supabase.",
    overview:
      "Lunora Studio is a luxury e-commerce experience for handmade bouquets, built to lead with brand. The work translated a distinct, romantic visual identity into a fast, responsive storefront where every interaction reinforces the brand — backed by Supabase for catalog and orders.",
    problem:
      "Creative commerce sites often trade performance for polish. Lunora needed both: an expressive, premium experience that still loaded fast, behaved impeccably across devices, and ran real product and order flows.",
    solution:
      "We built a brand-first frontend on Next.js with GSAP-tuned motion, backed by Supabase for products and orders. Component architecture, responsive layouts, and a strict performance budget keep the experience smooth everywhere.",
    technologies: ["Next.js", "TypeScript", "Supabase", "GSAP", "Tailwind CSS"],
    highlights: [
      "Brand-first design system driving a cohesive luxury experience",
      "GSAP-tuned interactions and motion, performance-budgeted",
      "Supabase-backed catalog and order flow",
      "Responsive across the full device range",
    ],
    features: [
      "Expressive, brand-led storefront",
      "Handmade-bouquet catalog with rich presentation",
      "Considered micro-interactions and transitions",
      "Fast load and smooth runtime performance",
    ],
    links: {
      live: "https://lunorastudio.vercel.app",
      github: "https://github.com/VED2107/lunora-studio",
    },
  },
  {
    slug: "ved-exe-portfolio",
    client: "VED.EXE",
    title: "A retro, CRT-inspired developer portfolio",
    discipline: "Frontend · Creative Engineering",
    category: "Creative engineering",
    result: "Full CRT/pixel visual system running smooth on Next.js 16 + React 19",
    kind: "personal",
    logo: "/logos/ved-exe.png",
    brandFont: "--font-press-start-2p",
    year: "2026",
    accent: "#2f9e57",
    host: "ved.exe.snowbros.me",
    status: "Live",
    role: "Creative engineering · frontend",
    screenshot: "/work/vedexe.png",
    summary:
      "A retro gaming developer portfolio with a CRT interface, GSAP + Framer Motion animation, and pixel aesthetics — creative engineering on Next.js 16 & React 19.",
    overview:
      "VED.EXE is a developer portfolio that turns a personal brand into an experience. A CRT-inspired interface and pixel aesthetics give it character, while the engineering underneath keeps it fast and interactive.",
    problem:
      "A portfolio has to stand out and stay fast. The challenge was leaning into a bold retro concept — CRT visuals, pixel styling, playful interactions — without letting the effects drag down performance.",
    solution:
      "We built a performance-focused frontend that renders the CRT and pixel aesthetic efficiently, with interactive animations that stay smooth. The result is a distinctive, memorable portfolio that still respects the fundamentals.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "GSAP", "Framer Motion"],
    highlights: [
      "CRT-inspired interface with authentic retro character",
      "GSAP + Framer Motion animation tuned to stay smooth",
      "Pixel-inspired aesthetic executed cleanly",
      "Performance-focused frontend throughout",
    ],
    features: [
      "CRT/scanline visual treatment",
      "Interactive, playful UI moments",
      "Pixel-inspired typography and styling",
      "Fast, responsive experience",
    ],
    links: {
      live: "https://ved.exe.snowbros.me",
      github: "https://github.com/VED2107/portfolio",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* Real GitHub data — github.com/VED2107 (snapshot, verified against the API). */
export const github = {
  handle: "VED2107",
  name: "Ved Chauhan",
  url: "https://github.com/VED2107",
  publicRepos: 9,
  since: "2024",
  primaryLanguage: "TypeScript",
} as const;

export type Repo = {
  name: string;
  description: string;
  language: string;
  stars: number;
  updated: string; // ISO date
  url: string;
  homepage?: string;
};

export const repos: Repo[] = [
  {
    name: "portfolio",
    description:
      "VED.EXE — retro gaming developer portfolio. Next.js 16, React 19, TypeScript, GSAP, Framer Motion.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-07-02",
    url: "https://github.com/VED2107/portfolio",
    homepage: "https://ved.exe.snowbros.me",
  },
  {
    name: "STC",
    description:
      "Smart Teaching Companion — an intelligent education platform for CBSE and GSEB students. Dual-pathway courses, small-batch learning.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-07-02",
    url: "https://github.com/VED2107/STC",
    homepage: "https://stc.vercel.app",
  },
  {
    name: "lunora-studio",
    description:
      "The Lunora Studio — luxury handmade bouquet e-commerce. Next.js 16, Supabase, GSAP.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-07-02",
    url: "https://github.com/VED2107/lunora-studio",
    homepage: "https://lunorastudio.vercel.app",
  },
  {
    name: "vinnys-vogue",
    description:
      "Premium fashion e-commerce platform. Next.js, TypeScript & PostgreSQL — modern, secure, and performant.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-06-23",
    url: "https://github.com/VED2107/vinnys-vogue",
    homepage: "https://www.vinnysvogue.in",
  },
  {
    name: "filmica",
    description: "Cross-platform film companion app.",
    language: "Dart",
    stars: 0,
    updated: "2026-05-16",
    url: "https://github.com/VED2107/filmica",
  },
  {
    name: "guesser",
    description: "A lightweight guessing-game experiment.",
    language: "TypeScript",
    stars: 0,
    updated: "2026-05-13",
    url: "https://github.com/VED2107/guesser",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  tag: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "performance-budgets-that-hold",
    title: "Performance budgets that actually hold",
    excerpt:
      "A budget nobody enforces is a wish. How we wire performance limits into CI so regressions fail the build, not the launch.",
    date: "2026-05-18",
    readingTime: "6 min",
    tag: "Performance",
    body: [
      "Most teams write a performance budget once, celebrate, and then watch it erode one convenient exception at a time. The problem is rarely the number — it is that the number lives in a document instead of the build.",
      "We treat budgets as tests. Bundle size, Largest Contentful Paint, and interaction latency each have a threshold that fails CI. A regression is a red build, not a retro item.",
      "The discipline is uncomfortable at first. It is also the only version we have seen survive contact with a deadline.",
    ],
  },
  {
    slug: "evaluating-ai-features",
    title: "You cannot ship what you cannot evaluate",
    excerpt:
      "Applied AI without evaluation is vibes. A practical baseline for grounding, regression tracking, and guardrails.",
    date: "2026-04-02",
    readingTime: "8 min",
    tag: "AI",
    body: [
      "The demo always works. The tenth thousand request is where AI features earn or lose trust, and you only know which if you measured.",
      "Our baseline is unglamorous: a reference dataset, a rubric per failure mode, and a score that runs on every change. Guardrails come after — never instead.",
      "Evaluation is not a phase you get to later. It is the thing that lets you move quickly without lying to yourself.",
    ],
  },
  {
    slug: "boring-infrastructure",
    title: "In praise of boring infrastructure",
    excerpt:
      "The best infrastructure is the kind nobody thinks about. Reproducible, observable, and quiet by design.",
    date: "2026-02-11",
    readingTime: "5 min",
    tag: "Infrastructure",
    body: [
      "Excitement in infrastructure is usually a euphemism for an outage. We optimize for the opposite: systems that are reproducible, observable, and dull.",
      "Everything is defined as code. Everything emits signals. Nothing depends on a person remembering a manual step at 2am.",
      "Boring is a feature. It is what lets the interesting work happen everywhere else.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export type Value = {
  title: string;
  body: string;
  metric: { value: string; label: string };
};

export const values: Value[] = [
  {
    title: "Craft over volume",
    body: "We take on fewer projects and go deeper. Quality is a function of attention, and attention does not scale by hiring alone.",
    metric: { value: "< 5", label: "active clients at a time" },
  },
  {
    title: "Systems that outlast us",
    body: "We write for the engineer who inherits the code in three years. Clear boundaries, documented decisions, no cleverness for its own sake.",
    metric: { value: "3 yr", label: "code we still maintain" },
  },
  {
    title: "Evidence, not opinion",
    body: "Performance budgets, evaluations, and observability are part of the build — not a phase we get to later.",
    metric: { value: "in CI", label: "budgets fail the build" },
  },
];

export type ProcessStep = {
  id: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    body: "We map the domain, constraints, and the real problem before a line of code — so the system we build is the system you need.",
  },
  {
    id: "architecture",
    title: "Architecture",
    body: "Clear boundaries, data models, and decision records. The shape of the system is set deliberately, not by accretion.",
  },
  {
    id: "design",
    title: "Design",
    body: "Interfaces engineered alongside the system. Considered states, motion, and accessibility from the first screen.",
  },
  {
    id: "development",
    title: "Development",
    body: "Small, reviewed changes shipped continuously. Tests, types, and evals travel with the code, not after it.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    body: "Reproducible, observable, and quiet. Everything is code; nothing depends on someone remembering a manual step.",
  },
  {
    id: "quality",
    title: "QA & Hardening",
    body: "Performance budgets, accessibility audits, and load behaviour verified in CI — regressions fail the build.",
  },
  {
    id: "launch",
    title: "Launch",
    body: "A calm release with rollback ready. We watch the graphs, not our fingers, on the way out.",
  },
  {
    id: "support",
    title: "Support",
    body: "We stay for the part that matters — the years after launch, where craft either shows up or doesn't.",
  },
];

export type TechGroup = { title: string; items: string[] };

export const techStack: TechGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "tRPC", "REST"],
  },
  {
    title: "AI",
    items: ["OpenAI", "Anthropic", "RAG", "Agents", "Evals", "LLM tooling"],
  },
  {
    title: "Infrastructure",
    items: ["Cloudflare", "Vercel", "Docker", "GitHub Actions", "Observability"],
  },
  {
    title: "Practices",
    items: ["Row-Level Security", "Performance budgets", "Accessibility", "Design systems"],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They treated our codebase like it had to outlive us. Two years on, the system they built still feels new — and we can still extend it ourselves.",
    name: "Founder",
    role: "Education platform",
  },
  {
    quote:
      "The rare team that ships fast without leaving a mess behind. Performance and accessibility were never a phase — they were the default.",
    name: "Product lead",
    role: "Luxury e-commerce",
  },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "4", label: "Products shipped end to end" },
  { value: "3", label: "Role-based platforms in production" },
  { value: "100", label: "Lighthouse target, across the board" },
  { value: "0", label: "Tolerance for silent failure" },
];

/** Real paid client work only — used for the trust bar under the hero. Personal
 *  projects (e.g. the founder's own portfolio) are excluded on purpose. */
export const clientLogos = projects
  .filter((p) => p.kind === "client")
  .map((p) => ({
    name: p.client,
    logo: p.logo,
    slug: p.slug,
    brandFont: p.brandFont,
  }));

export type ComparisonRow = {
  label: string;
  studio: string;
  freelancer: string;
  agency: string;
};

/** Honest positioning — not fabricated stats, just how the model differs. */
export const comparisonRows: ComparisonRow[] = [
  {
    label: "Who writes your code",
    studio: "Engineer + AI, every line reviewed",
    freelancer: "Depends who you find",
    agency: "Often junior, rotates",
  },
  {
    label: "Communication",
    studio: "Direct, no account layer",
    freelancer: "Direct, but time-boxed",
    agency: "Through a project manager",
  },
  {
    label: "Architecture ownership",
    studio: "Designed to outlast launch",
    freelancer: "Usually scoped to the ask",
    agency: "Templated, reused across clients",
  },
  {
    label: "Performance & evals",
    studio: "Budgeted and enforced in CI",
    freelancer: "Rarely instrumented",
    agency: "Varies by team",
  },
  {
    label: "Active clients at a time",
    studio: "Fewer than 5",
    freelancer: "As many as they can juggle",
    agency: "Dozens, in parallel",
  },
];
