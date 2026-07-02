import { cn } from "@/lib/cn";

/**
 * Single outline icon system. 24×24 grid, 1.5 stroke, currentColor.
 * One consistent visual language across the whole site.
 */
export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-left"
  | "check"
  | "mail"
  | "github"
  | "linkedin"
  | "external"
  | "platform"
  | "saas"
  | "ai"
  | "devtools"
  | "cloud"
  | "automation"
  | "search"
  | "menu"
  | "close"
  | "bolt"
  | "gauge"
  | "git-branch"
  | "clock"
  | "database"
  | "layers";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 12v5" />
    </>
  ),
  external: (
    <>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </>
  ),
  platform: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  saas: (
    <>
      <path d="M4 7h16M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
      <path d="M4 7 7 4h10l3 3M9 12h6" />
    </>
  ),
  ai: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
    </>
  ),
  devtools: <path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />,
  cloud: (
    <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6 1.5A3.5 3.5 0 0 0 7 19h10.5Z" />
  ),
  automation: (
    <>
      <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  gauge: (
    <>
      <path d="M12 14a6 6 0 1 1 6-6" />
      <path d="M12 14 15 9" />
      <path d="M4 20a9 9 0 0 1 16 0" />
    </>
  ),
  "git-branch": (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <path d="M6 8.5v7M8.5 7.5c6 1 8 .5 9.5-.5M18 10.5c0 4-4 4.5-12 5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 14l9 5 9-5M3 11l9 5 9-5" />,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
  ...props
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
} & Omit<React.SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-[1em] w-[1em] shrink-0", className)}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
