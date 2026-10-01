"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { primaryNav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { BlueprintToggle } from "@/components/sheet/blueprint";

/*
  Header: a ruled strip across the top of the sheet. No floating pill, no
  scroll listener. Active page gets an orange tick under its label.

  Mobile menu: a full-height sheet. It animates because it is spatial (the
  sheet comes down from the bar that opened it), 280ms ease-out in, 180ms out.
  Escape closes it and returns focus to the toggle.
*/
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(href + "/") ||
    (href === "/products" && (pathname.startsWith("/atlas") || pathname.startsWith("/mentor")));

  // Close on navigation (derived during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/92 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-8 px-[var(--spacing-gutter)]">
        <Wordmark />

        <nav aria-label="Primary" className="hidden h-full items-stretch md:flex">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group/nav relative flex items-center px-3 text-[14px] transition-colors duration-[160ms]",
                  active ? "text-ink" : "text-secondary hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-[280ms] ease-[var(--ease-out-soft)]",
                    active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:bg-hairline-strong",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <BlueprintToggle />
          <span className="meta hidden items-center gap-2 xl:inline-flex">
            {site.status}
          </span>
          <Button href="/contact" size="sm" keyGlyph="next">
            Start a project
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="pressable ml-auto grid h-11 w-11 place-items-center rounded-[var(--radius-md)] text-ink md:hidden"
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-[280ms] ease-[var(--ease-out-soft)]",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-[280ms] ease-[var(--ease-out-soft)]",
                open && "-translate-y-[5.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-hairline bg-background md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex min-h-full flex-col px-[var(--spacing-gutter)] pb-8 pt-4 animate-in fade-in slide-in-from-top-2 duration-300 ease-out motion-reduce:animate-none"
        >
          <ul className="flex flex-col">
            {[...primaryNav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href} className="border-b border-hairline">
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-[28px] font-medium tracking-[-0.03em] text-ink"
                >
                  {item.label}
                  {isActive(item.href) && <span aria-hidden className="h-[2px] w-5 bg-accent" />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <p className="meta">{site.status}</p>
            <a href={`mailto:${site.email}`} className="link-accent mt-2 inline-block text-[15px]">
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
