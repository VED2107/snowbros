import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-[length:var(--text-4xl)] font-normal leading-[var(--text-4xl--line-height)] tracking-[var(--text-4xl--letter-spacing)]">
        This path leads nowhere.
      </h1>
      <p className="mt-6 max-w-md text-lg text-secondary">
        The page you were looking for has moved or never existed. Let&rsquo;s get
        you back on solid ground.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>

      <nav aria-label="Helpful links" className="mt-12">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
