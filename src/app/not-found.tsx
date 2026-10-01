import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="meta">Error 404</p>
          <h1 className="mt-6 text-[length:var(--text-4xl)] font-medium leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)] text-ink">
            This sheet is not in the set<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-[48ch] text-[length:var(--text-lg)] leading-relaxed text-secondary">
            The page may have moved, or the link was mistyped. Here is the
            index of what does exist.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" keyGlyph="next">Back home</Button>
            <Button href="/search" variant="secondary">Search</Button>
          </div>
        </div>
        <nav aria-label="Site index" className="lg:col-span-4 lg:col-start-9">
          <p className="meta border-b border-ink pb-2">Sheet index</p>
          <ul>
            {[...primaryNav, { label: "Contact", href: "/contact" }, { label: "Writing", href: "/blog" }].map((item) => (
              <li key={item.href} className="border-b border-hairline-strong">
                <Link href={item.href} className="group flex items-center justify-between py-3 text-[17px] text-ink transition-colors hover:text-accent">
                  {item.label}
                  <Icon name="arrow-right" className="text-[16px] text-muted transition-transform duration-[160ms] group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
