/**
 * Studio content. Every claim here is traceable to a repository, a release or
 * a live deployment. No invented metrics, clients or outcomes. If a fact
 * cannot be checked, it does not go in.
 */

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

type Service = {
  slug: string;
  title: string;
  /** One sentence: what we take responsibility for. */
  summary: string;
  capabilities: string[];
  stack: string[];
  /** Project slugs where this capability is visible in shipped work. */
  proof: string[];
};

export const services: Service[] = [
  {
    slug: "software-engineering",
    title: "Software engineering",
    summary:
      "Systems with clear boundaries, typed end to end, and tested against the real database before they reach anyone.",
    capabilities: ["Domain modelling", "Architecture decisions", "Test strategy"],
    stack: ["TypeScript", "PostgreSQL", "Rust", "Playwright"],
    proof: ["vinnys-atelier", "accounic", "atlas"],
  },
  {
    slug: "full-stack-development",
    title: "Full-stack development",
    summary:
      "Schema, server, interface and deployment, owned by the same people, so nothing gets lost at the handoff.",
    capabilities: ["Next.js applications", "Server actions & APIs", "Data modelling"],
    stack: ["Next.js", "React", "Supabase", "Drizzle"],
    proof: ["vinnys-atelier", "stc-academy", "vinnys-vogue", "lunora-studio"],
  },
  {
    slug: "saas-platforms",
    title: "SaaS platforms",
    summary:
      "Multi-role products where authorization lives in Postgres row-level security, not in a hidden button.",
    capabilities: ["Role-based portals", "Tenant isolation", "Admin tooling"],
    stack: ["PostgreSQL", "Row-level security", "Supabase Auth"],
    proof: ["stc-academy", "accounic"],
  },
  {
    slug: "ai-solutions",
    title: "AI solutions",
    summary:
      "Applied AI with a harness around it: scoped tasks, review gates, and no claims the system cannot back up.",
    capabilities: ["LLM workflows", "Agent tooling", "Evaluation"],
    stack: ["Claude", "OpenAI", "Python", "TypeScript"],
    proof: ["mentor"],
  },
  {
    slug: "automation",
    title: "Automation",
    summary:
      "The glue between systems: sync engines, payment webhooks, scheduled jobs and release pipelines that run without a person watching.",
    capabilities: ["Sync & outbox queues", "Webhooks", "Release automation"],
    stack: ["Node.js", "SQLite", "GitHub Actions"],
    proof: ["vinnys-atelier", "accounic"],
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud infrastructure",
    summary:
      "CI that gates every release, reproducible builds, and secrets that never leave the server.",
    capabilities: ["CI/CD", "Desktop & mobile release pipelines", "Security headers"],
    stack: ["Vercel", "Supabase", "Docker", "GitHub Actions"],
    proof: ["accounic", "vinnys-atelier"],
  },
  {
    slug: "ui-ux-engineering",
    title: "UI/UX engineering",
    summary:
      "Interfaces designed and built by the same hands: keyboard-first where work is repeated, accessible everywhere, fast on mid-range hardware.",
    capabilities: ["Design systems", "Interaction design", "Accessibility"],
    stack: ["React", "Tailwind CSS", "Flutter", "CSS motion"],
    proof: ["vinnys-atelier", "accounic", "lunora-studio", "ved-exe-portfolio"],
  },
  {
    slug: "technical-consulting",
    title: "Technical consulting",
    summary:
      "Architecture reviews, codebase audits and second opinions, written down so the decision outlives the meeting.",
    capabilities: ["Codebase audits", "Architecture review", "Decision records"],
    stack: ["Static analysis", "Dependency graphs", "ADRs"],
    proof: ["atlas"],
  },
];

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "night" = dark product UI, framed on a dark plate. */
  tone: "light" | "night";
  /**
   * Balloon callouts pinned to real UI in the screenshot, like the
   * annotations on an engineering drawing. x/y are percentages of the image.
   */
  annotations?: Annotation[];
};

type Annotation = { x: number; y: number; title: string; note: string };

/** A shipped release, as a line in the drawing's revision block. */
export type Revision = { rev: string; date: string; note: string };

type Decision = { title: string; why: string };

export type Project = {
  slug: string;
  /** Display name. */
  client: string;
  /** Positioning line used as the case-study title. */
  title: string;
  /** Who it is for: client work, our own product, or a personal experiment. */
  kind: "client" | "product" | "personal";
  /**
   * Visual weight on the home page and work index.
   * lead    full-width story with screenshot and decisions
   * feature half-width panel with screenshot
   * index   one row in the index
   */
  tier: "lead" | "feature" | "index";
  category: string;
  discipline: string;
  year: string;
  status: "Live" | "Open source" | "In progress";
  /** Release or version, when one exists. */
  version?: string;
  role: string;
  /** Two sentences at most. */
  summary: string;
  /** What existed before, and why it was not enough. */
  problem: string;
  /** What we built, in one paragraph. */
  solution: string;
  decisions: Decision[];
  revisions?: Revision[];
  features: string[];
  technologies: string[];
  media: Media[];
  /** Deployment host shown as metadata. */
  host?: string;
  links?: { live?: string; github?: string };
  /** Products with their own page link there instead of /work/[slug]. */
  caseHref?: string;
};

export const projects: Project[] = [
  {
    slug: "vinnys-atelier",
    client: "Vinny's Atelier",
    title: "The retail system a working boutique runs its counter on",
    kind: "client",
    tier: "lead",
    category: "Retail · POS",
    discipline: "Product engineering",
    year: "2026",
    status: "Live",
    version: "v1.5.0",
    role: "Architecture, product design, engineering",
    host: "atelier.vinnysvogue.in",
    summary:
      "A keyboard-first till, invoicing, inventory, customers and trade reports for Vinny's Fashion Hub. One Next.js codebase, shipped to the web and as an offline-capable Windows desktop app.",
    problem:
      "The shop ran on a paper book and a phone camera. Invoices were hand-written and unnumbered, stock was whatever the shelf looked like, and a return weeks later had nothing to trace back to. Off-the-shelf POS software assumed a chain, a barcode gun and a monthly fee.",
    solution:
      "A single application shaped around the counter's real workflow. The till is the home screen: a draft invoice that pulls garments from the catalogue on a keystroke, applies discounts, settles against cash, UPI or a Razorpay dynamic QR, and prints to the thermal printer. Behind it sit inventory with a stock-movement ledger, customer records by lifetime spend, and reports net of discounts.",
    decisions: [
      {
        title: "The desktop app is a window, not a second application",
        why: "Tauri wraps the live deployment. Bundling the server would have shipped the database service key and the Razorpay secrets to a counter PC. A window keeps every secret on the server and one deployment as the source of truth.",
      },
      {
        title: "An offline till numbers its own invoices",
        why: "Sales settled without a network are numbered from the device's own shard, and sync adopts that number. The receipt in the customer's bag is never renumbered, and a retried push finds its invoice instead of creating a second one.",
      },
      {
        title: "Money is an integer",
        why: "Every amount is held in paise from input to PDF. No floating-point value ever touches a rupee figure.",
      },
      {
        title: "Discount rules live in one module",
        why: "The server, the offline till and the summary panel all call the same function, and the result is frozen onto the bill, so editing a rule later cannot rewrite an old invoice.",
      },
    ],
    features: [
      "Keyboard-first till: catalogue, quantity and discount without leaving the keys",
      "Razorpay dynamic UPI QR, cash and UPI settlement",
      "Invoices as PDF and as thermal receipts from one document model",
      "Offline sales with a local SQLite store, outbox and conflict states",
      "Inventory by variant with a stock-movement ledger",
      "Invoice delivery over WhatsApp, configurable per shop",
      "Row-level security and an operator allowlist; no public sign-up",
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Drizzle ORM",
      "Tauri 2",
      "SQLite",
      "Razorpay",
      "Playwright",
    ],
    media: [
      {
        src: "/work/atelier.png",
        alt: "Vinny's Atelier till: a draft invoice with three line items, a discount, and Razorpay selected as the payment method.",
        width: 1920,
        height: 1200,
        tone: "light",
        annotations: [
          { x: 67.4, y: 3, title: "Command palette", note: "Every action on the till has a key. Search, customers, new invoice and print are all one shortcut away." },
          { x: 20, y: 14.3, title: "Draft numbering", note: "An offline till numbers its own invoices from a per-device shard, and sync keeps that number." },
          { x: 76.3, y: 3, title: "Thermal printer", note: "Receipts print straight from the till; the same document model renders the PDF." },
          { x: 87.5, y: 26.8, title: "One discount module", note: "The server, the offline till and this panel call the same function. The result is frozen onto the bill." },
          { x: 92.5, y: 35, title: "Integer paise", note: "Every amount is an integer number of paise from input to PDF. No float touches a rupee." },
          { x: 78.5, y: 45.6, title: "Dynamic UPI QR", note: "Razorpay generates a QR for the exact amount. The invoice is written once the payment is confirmed." },
        ],
      },
    ],
    revisions: [
      { rev: "1.5.0", date: "2026-08", note: "Offline invoice identity, quantity discount bands, invoice delivery over WhatsApp" },
      { rev: "1.4.2", date: "2026-08", note: "Closed XSS, sync-trust and header gaps before release" },
      { rev: "1.4.1", date: "2026-08", note: "Desktop hands the Razorpay payment page to the browser" },
      { rev: "1.3.0", date: "2026-08", note: "Fractional discounts, keyboard fixes, dynamic UPI QR on desktop" },
    ],
    links: { live: "https://atelier.vinnysvogue.in" },
  },
  {
    slug: "accounic",
    client: "Accounic",
    title: "A multi-currency ledger where the database computes every balance",
    kind: "product",
    tier: "lead",
    category: "Finance · Ledger",
    discipline: "Product engineering",
    year: "2026",
    status: "Live",
    version: "v1.16.1",
    role: "Product, architecture, design, engineering",
    summary:
      "A fast ledger of who owes whom, across currencies. Three clients (web, Android, Windows) on one Postgres engine, with releases built by CI.",
    problem:
      "Traders who run accounts with people and firms across India and the UAE were reconciling in notebooks and spreadsheets. Exchange rates moved, totals were re-added by hand, and nobody trusted the figure on the page.",
    solution:
      "Accounic answers four questions: who do I have an account with, what do they owe me, what do I owe them, and what has been settled. Balances are SQL views, every write goes through a validated function, and each entry keeps the currency and rate it was recorded at. Clients format money; they never add it up.",
    decisions: [
      {
        title: "The database computes every balance",
        why: "Receivables, payables and net positions are views in Postgres. The Next.js and Flutter clients only display them, so three clients can never disagree about a total.",
      },
      {
        title: "Money in minor units, per currency",
        why: "Amounts are integers. How many minor units make a major one belongs to the currency: the yen has none, the Kuwaiti dinar has three.",
      },
      {
        title: "History is never re-priced",
        why: "A foreign entry keeps its original amount, currency, rate and source. A later rate move cannot change a recorded transaction.",
      },
      {
        title: "Settlements never edit the past",
        why: "Paying down a balance records money that moved and allocates it first-in first-out. The original transaction stays intact, so the history reads the way it happened.",
      },
    ],
    features: [
      "Credits, debits, settlements and transfers between people",
      "Opening balances counted separately from cash in hand",
      "Live exchange rates with a fallback provider, cached per owner",
      "PDF statements, CSV and JSON exports from one filter contract",
      "Demo build with sample books, isolated by the same row-level security",
      "In-app update check against published GitHub releases",
    ],
    technologies: [
      "PostgreSQL",
      "Supabase",
      "Row-level security",
      "Next.js",
      "TypeScript",
      "Flutter",
      "Riverpod",
      "GitHub Actions",
    ],
    media: [
      {
        src: "/work/accounic-dashboard.png",
        alt: "Accounic dashboard on Windows: net position, receivable and payable totals, and today's debits, credits and settlements.",
        width: 1344,
        height: 432,
        tone: "night",
        annotations: [
          { x: 15, y: 47, title: "Keyboard navigation", note: "Ctrl+1 to Ctrl+5 moves between screens on Windows, with no transition to wait on." },
          { x: 26.3, y: 43, title: "Computed in Postgres", note: "Net position comes from a SQL view. No client adds up a column." },
          { x: 59, y: 94, title: "Currency of record", note: "Each figure stays in the currency it was entered in; conversions are marked as approximate." },
        ],
      },
      {
        src: "/work/accounic-instrument.png",
        alt: "An Accounic account drawn as an instrument: cash in hand certified over an engraving, with the opening balance as a stamped counterfoil.",
        width: 1046,
        height: 378,
        tone: "night",
      },
    ],
    revisions: [
      { rev: "1.16.1", date: "2026-09-25", note: "Updates never open the demo installer; ledger rows align in fixed columns" },
      { rev: "1.16.0", date: "2026-09-25", note: "Counterfoil & Seal: a new face for Android and Windows" },
      { rev: "1.15.0", date: "2026-09-08", note: "Accounic Demo ships as its own installer" },
      { rev: "1.13.0", date: "2026-09-08", note: "The online demo" },
      { rev: "1.12.0", date: "2026-09-05", note: "Activity export" },
    ],
    links: { github: "https://github.com/VED2107/accounic" },
  },
  {
    slug: "atlas",
    client: "Snowbros Atlas",
    title: "Static analysis that reports only what it can prove",
    kind: "product",
    tier: "lead",
    category: "Developer tools",
    discipline: "Open-source tooling",
    year: "2026",
    status: "Open source",
    version: "v0.4.0",
    role: "Design and engineering",
    summary:
      "A Rust engine that maps a JavaScript, TypeScript or Python project into one semantic graph and reports circular imports, dead files, server/client leaks and hardcoded secrets, each with its evidence chain.",
    problem:
      "Linters see one file at a time. The expensive problems in a modern codebase live between files: an import chain that drags server code into a client bundle, a cycle that breaks tree-shaking, a dependency nobody uses.",
    solution:
      "Tree-sitter parsers lower every language into one shared IR. Rules run on the whole-project graph and are deterministic: same codebase in, same findings out. Anything the resolver cannot prove is reported as unresolved, never guessed.",
    decisions: [
      {
        title: "Deterministic, with no model in the loop",
        why: "No AI decides whether an issue exists. Every finding carries the chain of facts that produced it, so a reviewer can check it in seconds.",
      },
      {
        title: "One IR for every language",
        why: "Rules are either language-neutral or explicitly scoped. Adding Python meant writing a frontend, not rewriting detectors.",
      },
    ],
    features: [
      "sb analyze, with terminal, JSON, Markdown, SARIF and HTML output",
      "sb fix applies deterministic fixes, with --dry-run",
      "sb graph and sb model expose the import graph and symbol model",
      "LSP server and VS Code extension",
      "CI gate: exit code 2 when high-severity findings exist",
    ],
    technologies: ["Rust", "Tree-sitter", "LSP", "VS Code", "SARIF", "npm", "crates.io"],
    media: [
      {
        src: "/atlas/report-top.png",
        alt: "Atlas HTML report: health scores by category and findings for a dead file, a server-only module reachable from a client component, and a circular import.",
        width: 2000,
        height: 2030,
        tone: "night",
      },
    ],
    links: { github: "https://github.com/snowbros-labs/atlas" },
    caseHref: "/atlas",
  },
  {
    slug: "stc-academy",
    client: "STC Academy",
    title: "An academic platform with three portals and one source of truth",
    kind: "client",
    tier: "feature",
    category: "EdTech · Platform",
    discipline: "Full-stack engineering",
    year: "2025",
    status: "Live",
    role: "Architecture and full-stack engineering",
    host: "stc.vercel.app",
    summary:
      "Student, teacher and admin portals for a CBSE and GSEB tuition centre: enrolment, attendance, fees and performance on one Postgres schema.",
    problem:
      "Attendance, fees and grades were spread across spreadsheets and messaging apps. Data was duplicated, reports were assembled by hand, and access control depended on who had the file.",
    solution:
      "A role-based platform on Next.js and Supabase. Each role sees a portal shaped around its day; attendance and fee status feed shared analytics; access is enforced in the database with row-level security; and the public site carries admissions and curriculum.",
    decisions: [
      {
        title: "Authorization in the database",
        why: "Row-level security means a student cannot read another student's record even if a screen forgets to check.",
      },
      {
        title: "One codebase, three portals",
        why: "Shared schema and components keep the roles consistent, while routes and navigation are shaped per role.",
      },
    ],
    features: [
      "Admin command centre: students, faculty, classes, subjects, materials",
      "Attendance capture, including QR codes",
      "Fee status tracking: paid, partial, unpaid",
      "Bulk student import from CSV and Excel",
      "Public admissions and curriculum site",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Row-level security", "Tailwind CSS"],
    media: [
      {
        src: "/work/stc.png",
        alt: "STC Academy on laptop, phone and tablet: the admin command centre, student management, and the public admissions page.",
        width: 1536,
        height: 1024,
        tone: "light",
      },
    ],
    links: { live: "https://stc.vercel.app", github: "https://github.com/VED2107/STC" },
  },
  {
    slug: "vinnys-vogue",
    client: "Vinnys Vogue",
    title: "Bridal and festive couture commerce, with the operations behind it",
    kind: "client",
    tier: "feature",
    category: "Commerce",
    discipline: "Full-stack engineering",
    year: "2025",
    status: "Live",
    role: "Full-stack engineering",
    host: "vinnysvogue.in",
    summary:
      "A storefront for Indian bridal and festive wear, with authentication, cart and checkout, and an admin for catalogue, orders, abandoned carts and reviews.",
    problem:
      "Template storefronts forced a choice between a brand that looks like couture and a system the owners control. They wanted both, and the ability to extend it.",
    solution:
      "A custom Next.js storefront on Supabase. Customers browse collections, keep a wishlist and check out with an account. The owners run homepage content, products, orders and abandoned carts from a protected admin, with order export by date range.",
    decisions: [
      {
        title: "Admin as part of the product",
        why: "Operations screens were designed with the same care as the storefront, because the owners use them every day.",
      },
      {
        title: "Protected routes, server-side",
        why: "Admin access is checked on the server for every request, not hidden behind client-side navigation.",
      },
    ],
    features: [
      "Collections, product pages and wishlist",
      "Account, cart and authenticated checkout",
      "Orders with status, payment state and date-range export",
      "Abandoned carts, reviews and homepage content management",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    media: [
      {
        src: "/work/vinnys.png",
        alt: "Vinnys Vogue storefront home with featured collections, beside the admin orders table with status and payment columns.",
        width: 1536,
        height: 1024,
        tone: "light",
      },
    ],
    links: { live: "https://www.vinnysvogue.in", github: "https://github.com/VED2107/vinnys-vogue" },
  },
  {
    slug: "lunora-studio",
    client: "Lunora Studio",
    title: "A handmade-bouquet store that leads with brand and stays fast",
    kind: "client",
    tier: "index",
    category: "Commerce · Brand",
    discipline: "Design engineering",
    year: "2026",
    status: "Live",
    role: "Design engineering, frontend",
    host: "lunorastudio.vercel.app",
    summary:
      "An expressive storefront for handmade bouquets, with GSAP-driven motion kept inside a performance budget and a Supabase-backed catalogue.",
    problem:
      "Expressive commerce sites often trade speed for polish. Lunora needed a romantic, motion-led brand that still loaded quickly on a phone.",
    solution:
      "A brand-first Next.js frontend with motion tuned per interaction, backed by Supabase for products and orders.",
    decisions: [
      {
        title: "Motion with a budget",
        why: "Every animation was weighed against its cost on mid-range phones; the expensive ones were cut.",
      },
    ],
    features: ["Brand-led storefront", "Bouquet catalogue", "Considered transitions"],
    technologies: ["Next.js", "TypeScript", "Supabase", "GSAP", "Tailwind CSS"],
    media: [
      {
        src: "/work/lunora.png",
        alt: "Lunora Studio storefront with handmade bouquets.",
        width: 1536,
        height: 1024,
        tone: "light",
      },
    ],
    links: { live: "https://lunorastudio.vercel.app", github: "https://github.com/VED2107/lunora-studio" },
  },
  {
    slug: "mentor",
    client: "Snowbros Mentor",
    title: "An engineering-intelligence skill for Claude Code",
    kind: "product",
    tier: "index",
    category: "AI tooling",
    discipline: "Open-source tooling",
    year: "2026",
    status: "Open source",
    role: "Design and engineering",
    summary:
      "Composes only the specialist expertise a task needs, in TEACH or BUILD mode, and runs the right review gates.",
    problem: "General-purpose assistants bring every concern to every task, or none.",
    solution: "A capability orchestrator that routes a task to the disciplines it actually needs.",
    decisions: [],
    features: [],
    technologies: ["Claude Code", "Markdown", "MIT"],
    media: [],
    links: { github: "https://github.com/snowbros-labs/mentor-skill" },
    caseHref: "/mentor",
  },
  {
    slug: "ved-exe-portfolio",
    client: "VED.EXE",
    title: "A CRT-styled developer portfolio, as an interaction study",
    kind: "personal",
    tier: "index",
    category: "Experimental web",
    discipline: "Creative engineering",
    year: "2026",
    status: "Live",
    role: "Founder's personal project",
    host: "ved.exe.snowbros.me",
    summary:
      "A personal experiment in interaction and motion: a CRT interface with pixel typography, built to stay smooth on Next.js 16 and React 19.",
    problem: "A bold visual concept, CRT scanlines and pixel styling, tends to cost frame rate.",
    solution:
      "Effects rendered with CSS where possible and animated with GSAP and Motion only where interaction needs it.",
    decisions: [
      {
        title: "Effects in CSS first",
        why: "Scanlines and glow are compositor-friendly CSS, so script time goes to interaction instead.",
      },
    ],
    features: ["CRT and scanline treatment", "Pixel typography", "Interactive moments"],
    technologies: ["Next.js 16", "React 19", "TypeScript", "GSAP", "Motion"],
    media: [
      {
        src: "/work/vedexe.png",
        alt: "VED.EXE portfolio with a CRT-style interface.",
        width: 1402,
        height: 1122,
        tone: "night",
      },
    ],
    links: { live: "https://ved.exe.snowbros.me", github: "https://github.com/VED2107/portfolio" },
  },
  {
    slug: "snowbros-website",
    client: "snowbros.me",
    title: "This website, treated as a product",
    kind: "product",
    tier: "index",
    category: "Design engineering",
    discipline: "Design system · Frontend",
    year: "2026",
    status: "Live",
    role: "Design and engineering",
    host: "snowbros.me",
    summary:
      "Server-rendered Next.js with a token-based design system, CSS-driven motion and strict security headers. We run our own analyzer on it: 94/100, no high-severity findings.",
    problem:
      "A studio site is the one project every visitor inspects closely. It has to show the same discipline as the work it describes.",
    solution:
      "React Server Components by default, with client code limited to navigation, the contact form and a handful of interactions. Motion runs in CSS on transform and opacity, and stops under reduced motion.",
    decisions: [
      {
        title: "No scroll hijacking",
        why: "Native scrolling stays native. Reveals use one IntersectionObserver and a CSS transition, and content is visible without JavaScript.",
      },
      {
        title: "One signal color",
        why: "Ink carries the primary action; orange marks state and focus only, so it keeps meaning something.",
      },
      {
        title: "Headers before features",
        why: "A strict Content Security Policy, HSTS and frame denial ship on every route.",
      },
    ],
    features: [
      "Design tokens for type, color, radius and motion",
      "JSON-LD for organization, website, breadcrumbs and case studies",
      "Contact form with server-side validation and a honeypot",
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Zod"],
    media: [],
    links: { live: "https://www.snowbros.me" },
  },
];

/**
 * Snowbros Atlas, run on this website's own repository (`sb analyze --no-cache`).
 * Recorded from the real JSON output; re-run and update when the site changes.
 */
export const siteAudit = {
  date: "2026-10-01",
  engine: "Atlas 0.4.0",
  filesScanned: 114,
  frameworks: "Next.js 16.2.9, React 19.2.4",
  coldMs: 120,
  before: 90,
  overall: 94,
  high: 0,
  low: 33,
  categories: [
    { name: "Security", score: 100 },
    { name: "Imports", score: 100 },
    { name: "Environment", score: 100 },
    { name: "Performance", score: 100 },
    { name: "Architecture", score: 99 },
    { name: "Dependencies", score: 96 },
    { name: "Complexity", score: 64 },
  ],
  remaining: [
    "30 page components longer than Atlas's function-size threshold. Pages are long JSX by nature; we accept this one.",
    "2 dependencies only referenced from CSS (tw-animate-css, shadcn). A TypeScript scan cannot see them; they are used.",
    "1 file not imported anywhere: the shelved 3D island prototype, kept on purpose and listed in Labs.",
  ],
  fixed: "Between the first run (90) and this one: removed 4 unused dependencies, 15 unused exports and 2 dead files it reported.",
} as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Where a project's case study lives. Products with their own page link there. */
export function projectHref(p: Project): string {
  return p.caseHref ?? `/work/${p.slug}`;
}

/** Projects whose case study is rendered by /work/[slug]. */
export const caseStudies = projects.filter((p) => !p.caseHref);

/* ------------------------------------------------------------------ */
/* Engineering signal: one principle per layer, each with evidence    */
/* ------------------------------------------------------------------ */

export type Principle = {
  layer: string;
  rule: string;
  body: string;
  evidence: { text: string; slug: string };
};

export const principles: Principle[] = [
  {
    layer: "Architecture",
    rule: "The database decides.",
    body: "Balances, money and permissions live where they cannot drift: in Postgres, behind row-level security and validated functions.",
    evidence: {
      text: "Accounic's web, Android and Windows clients read balances from SQL views. None of them adds up a column.",
      slug: "accounic",
    },
  },
  {
    layer: "Frontend",
    rule: "Built for the hundredth use.",
    body: "Interfaces that are used all day get keyboard paths, real empty and error states, and no animation on actions repeated every minute.",
    evidence: {
      text: "Atelier's till takes catalogue, quantity and discount without leaving the keyboard.",
      slug: "vinnys-atelier",
    },
  },
  {
    layer: "Backend",
    rule: "Money is an integer.",
    body: "Amounts are stored in minor units with the currency's own precision. No floating-point value enters the money path.",
    evidence: {
      text: "Accounic handles the yen (no minor unit) and the Kuwaiti dinar (three) with the same code.",
      slug: "accounic",
    },
  },
  {
    layer: "Infrastructure",
    rule: "A green build means something.",
    body: "Migrations and test suites run against a throwaway database on every push. Releases are built by CI and published by a person.",
    evidence: {
      text: "Accounic runs four workflows per push: web, Flutter, SQL and demo builds.",
      slug: "accounic",
    },
  },
  {
    layer: "Automation",
    rule: "Offline is a sync problem, not a cache.",
    body: "Work done without a network is queued, numbered and reconciled, with conflicts surfaced to a person instead of silently overwritten.",
    evidence: {
      text: "Atelier's offline till issues invoice numbers from a per-device shard that sync keeps.",
      slug: "vinnys-atelier",
    },
  },
  {
    layer: "AI",
    rule: "Scoped, gated, honest.",
    body: "AI gets a narrow task, the context that task needs, and a review step. No invented confidence scores.",
    evidence: {
      text: "Mentor routes a Claude Code task to only the disciplines it needs, then runs the review gates.",
      slug: "mentor",
    },
  },
  {
    layer: "Developer tools",
    rule: "Same input, same findings.",
    body: "Tools engineers trust are deterministic and show their working. Anything unproven is labelled as such.",
    evidence: {
      text: "Atlas analyzed axios's 431 files in about 230 ms cold, and attaches an evidence chain to every finding.",
      slug: "atlas",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

type ProcessStep = { id: string; title: string; body: string };

export const processSteps: ProcessStep[] = [
  {
    id: "map",
    title: "Map the problem",
    body: "The domain, the constraints, the people who will use it, and what has already been tried. Written down before code.",
  },
  {
    id: "decide",
    title: "Decide the shape",
    body: "Data model, boundaries and the few decisions that are expensive to reverse, recorded with the reason they were made.",
  },
  {
    id: "build",
    title: "Build in small, reviewed steps",
    body: "Shipped to a real environment from the first week. Types, tests and migrations travel with each change.",
  },
  {
    id: "harden",
    title: "Harden and release",
    body: "Security headers, access rules, accessibility and performance checked before launch, with a way back if something goes wrong.",
  },
  {
    id: "maintain",
    title: "Stay for what follows",
    body: "The months after launch are where software is proven. We keep maintaining what we ship.",
  },
];

/* ------------------------------------------------------------------ */
/* GitHub (snapshot, verified against the API)                         */
/* ------------------------------------------------------------------ */

export const github = {
  handle: "VED2107",
  name: "Ved Chauhan",
  url: "https://github.com/VED2107",
  org: "https://github.com/snowbros-labs",
  publicRepos: 9,
  since: "2024",
  primaryLanguage: "TypeScript",
} as const;

type Repo = {
  name: string;
  description: string;
  language: string;
  stars: number;
  updated: string;
  url: string;
  homepage?: string;
};

export const repos: Repo[] = [
  {
    name: "atlas",
    description:
      "Snowbros Atlas: deterministic multi-language static analysis. One shared semantic IR across JavaScript, TypeScript and Python; native Rust, LSP and VS Code.",
    language: "Rust",
    stars: 1,
    updated: "2026-07-14",
    url: "https://github.com/snowbros-labs/atlas",
    homepage: "https://snowbros.me/atlas",
  },
  {
    name: "accounic",
    description:
      "A multi-currency ledger: Next.js web, Flutter Android and Windows, one PostgreSQL engine with row-level security.",
    language: "Dart",
    stars: 0,
    updated: "2026-09-25",
    url: "https://github.com/VED2107/accounic",
  },
  {
    name: "mentor-skill",
    description:
      "Snowbros Mentor: an engineering-intelligence orchestrator for Claude Code, in TEACH or BUILD mode.",
    language: "Markdown",
    stars: 0,
    updated: "2026-07-07",
    url: "https://github.com/snowbros-labs/mentor-skill",
    homepage: "https://snowbros.me/mentor",
  },
  {
    name: "STC",
    description: "Smart Teaching Companion: an education platform for CBSE and GSEB students.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-07-02",
    url: "https://github.com/VED2107/STC",
    homepage: "https://stc.vercel.app",
  },
  {
    name: "vinnys-vogue",
    description: "Fashion commerce platform. Next.js, TypeScript and PostgreSQL.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-06-23",
    url: "https://github.com/VED2107/vinnys-vogue",
    homepage: "https://www.vinnysvogue.in",
  },
  {
    name: "lunora-studio",
    description: "Handmade bouquet commerce. Next.js 16, Supabase, GSAP.",
    language: "TypeScript",
    stars: 1,
    updated: "2026-07-02",
    url: "https://github.com/VED2107/lunora-studio",
    homepage: "https://lunorastudio.vercel.app",
  },
];

/* ------------------------------------------------------------------ */
/* Writing                                                             */
/* ------------------------------------------------------------------ */

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
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
      "Most teams write a performance budget once, celebrate, and then watch it erode one convenient exception at a time. The problem is rarely the number. It is that the number lives in a document instead of the build.",
      "We treat budgets as tests. Bundle size, Largest Contentful Paint and interaction latency each have a threshold that fails CI. A regression is a red build, not a retro item.",
      "The discipline is uncomfortable at first. It is also the only version we have seen survive contact with a deadline.",
    ],
  },
  {
    slug: "evaluating-ai-features",
    title: "You cannot ship what you cannot evaluate",
    excerpt:
      "Applied AI without evaluation is guesswork. A practical baseline for grounding, regression tracking and guardrails.",
    date: "2026-04-02",
    readingTime: "8 min",
    tag: "AI",
    body: [
      "The demo always works. The ten-thousandth request is where AI features earn or lose trust, and you only know which if you measured.",
      "Our baseline is unglamorous: a reference dataset, a rubric per failure mode, and a score that runs on every change. Guardrails come after, never instead.",
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
      "Excitement in infrastructure is usually a euphemism for an outage. We optimize for the opposite: systems that are reproducible, observable and dull.",
      "Everything is defined as code. Everything emits signals. Nothing depends on a person remembering a manual step at 2am.",
      "Boring is a feature. It is what lets the interesting work happen everywhere else.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/* Studio principles, used on the studio page. Facts only, no metrics. */
type Value = { title: string; body: string };

export const values: Value[] = [
  {
    title: "Few projects, owned end to end",
    body: "We take on a small number of engagements and stay on them, from the first schema to the months after launch.",
  },
  {
    title: "Written for the next engineer",
    body: "Clear boundaries, recorded decisions and tests that describe behaviour. The code should explain itself to whoever inherits it.",
  },
  {
    title: "Evidence over opinion",
    body: "Access rules in the database, money as integers, budgets in CI. Correctness is something we can point to, not something we promise.",
  },
];
