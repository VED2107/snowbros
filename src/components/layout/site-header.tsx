"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/site";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Magnetic } from "@/components/motion/magnetic";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-[var(--spacing-gutter)] transition-[padding] duration-300 ease-[var(--ease-out-soft)]",
        scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex w-full items-center justify-between gap-4 rounded-full border pl-5 backdrop-blur-2xl transition-[background-color,border-color,box-shadow,max-width,padding] duration-300 ease-[var(--ease-out-soft)]",
          scrolled
            ? "max-w-[980px] px-2.5 py-1.5 border-hairline-strong bg-[rgba(248,249,248,0.82)] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_16px_40px_-18px_rgba(21,21,21,0.4)]"
            : "max-w-[1080px] px-2.5 py-1.5 border-hairline bg-[rgba(248,249,248,0.5)] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-18px_rgba(21,21,21,0.25)]",
        )}
      >
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group/nav relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                  active
                    ? "text-accent"
                    : "text-secondary hover:text-ink",
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-accent-weak" />
                )}
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-px h-px origin-center bg-accent transition-transform duration-300 ease-[var(--ease-out-soft)]",
                    active
                      ? "scale-x-0"
                      : "scale-x-0 group-hover/nav:scale-x-100",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <a
            href="/search"
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-full text-secondary transition-colors hover:bg-accent-weak hover:text-ink"
          >
            <Icon name="search" className="text-[18px]" />
          </a>
          <Magnetic strength={0.4}>
            <Button href="/contact" size="sm" variant="primary">
              Start a project
            </Button>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-accent-weak md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="text-[20px]" />
        </button>
      </div>

      {open && (
        <div className="pointer-events-auto fixed inset-x-[var(--spacing-gutter)] top-[4.5rem] rounded-[var(--radius-lg)] border border-hairline bg-[rgba(250,250,248,0.96)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_24px_50px_-24px_rgba(17,17,16,0.4)] backdrop-blur-xl md:hidden">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-base transition-colors",
                      isActive(item.href)
                        ? "bg-accent-weak text-ink"
                        : "text-secondary hover:bg-accent-weak hover:text-ink",
                    )}
                  >
                    {item.label}
                    <Icon name="arrow-up-right" className="text-[16px] opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 px-1">
            <Button
              href="/contact"
              size="md"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Start a project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
