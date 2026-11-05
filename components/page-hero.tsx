import type { ReactNode } from "react";
import { PageMotion } from "./page-motion";
import { Container, SectionHead } from "./ui";

type PageHeroProps = { kicker: string; title: ReactNode; note?: ReactNode; aside?: ReactNode; children?: ReactNode };

/** Opening block of every inner page: kicker, serif h1, optional note, actions (children) and side image. Also mounts the page's entrance motion. */
export function PageHero({ kicker, title, note, aside, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-peach-50 py-14 md:py-20">
      <PageMotion />
      <Container className={aside ? "grid items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : ""}>
        <div className="min-w-0 space-y-6">
          <div data-enter>
            <SectionHead as="h1" kicker={kicker} title={title} />
          </div>
          {note && (
            <div data-enter className="max-w-2xl space-y-2 border-l-4 border-saffron-500 pl-5 text-lead font-semibold text-ink-700">
              {note}
            </div>
          )}
          {children && <div data-enter>{children}</div>}
        </div>
        {aside && <div data-enter>{aside}</div>}
      </Container>
    </section>
  );
}
