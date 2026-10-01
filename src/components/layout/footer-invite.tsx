"use client";

import { usePathname } from "next/navigation";

/** The footer's "Have a system to build?" block, hidden where it would repeat the page itself. */
export function FooterInvite({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return <>{children}</>;
}
