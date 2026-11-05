import Image from "next/image";
import type { ReactNode } from "react";
import { journeyContent } from "@/content/journey";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container } from "@/components/ui";
import { LOGOS } from "@/lib/logos";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "../dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = journeyContent[locale].meta;
  return pageMetadata(locale, "journey", title, description);
}

/** One era on the rail: a huge serif year, a heading, a body and an optional picture. */
function Entry({ id, year, title, future, children, media }: { id: string; year: string; title: string; future?: string; children: ReactNode; media?: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="relative scroll-mt-32 pb-16 pl-8 md:pl-12">
      <span
        aria-hidden="true"
        className={`absolute -left-[9px] top-3 size-4 rounded-full ${future ? "border-2 border-dashed border-saffron-700 bg-white" : "bg-saffron-700"}`}
      />
      <p data-reveal className="font-serif text-display-xl text-saffron-500">{year}</p>
      <div className="mt-2 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 space-y-4">
          <h2 id={`${id}-h`} className="font-serif text-display-m [overflow-wrap:break-word]">
            {title}
            {future && <span className="ml-3 inline-block rounded-full bg-peach-100 px-3 py-1 align-middle font-sans text-sm font-semibold text-saffron-800">{future}</span>}
          </h2>
          {children}
        </div>
        {media && <div data-reveal>{media}</div>}
      </div>
    </section>
  );
}

export default async function JourneyPage() {
  const locale = await getLocale();
  const copy = journeyContent[locale];
  return (
    <>
      <PageHero kicker={copy.hero.kicker} title={copy.hero.title} note={copy.hero.note} />

      <nav aria-label={copy.eraNav} className="era-nav sticky z-30 border-b border-line bg-white/95 backdrop-blur">
        <Container>
          <ul className="flex gap-2 py-2">
            {copy.eras.map((era) => (
              <li key={era.id}>
                <a href={`#${era.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-semibold text-ink-900 hover:border-saffron-700 hover:text-saffron-700">
                  {era.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="py-16 md:py-24">
        <div className="journey-rail relative border-l-2 border-saffron-500/40">
          <Entry id="vision" year={copy.vision.year} title={copy.vision.title} future={copy.next}>
            <ol className="space-y-3 border-l-2 border-dashed border-saffron-700 pl-5">
              {copy.vision.phases.map((phase, i) => (
                <li key={phase} className="font-semibold text-ink-900">
                  <span className="mr-3 font-serif text-saffron-700">{String(i + 1).padStart(2, "0")}</span>
                  {phase}
                </li>
              ))}
            </ol>
          </Entry>

          <Entry
            id="y2026"
            year={copy.y2026.year}
            title={copy.y2026.title}
            media={
              <div className="img-reveal relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[var(--radius-image)]">
                <Image src="/media/gallery/ribbon-4x5.webp" alt={copy.y2026.photoAlt} fill sizes="320px" className="object-cover" />
              </div>
            }
          >
            <p className="text-lg">{copy.y2026.body}</p>
          </Entry>

          <Entry
            id="y2012"
            year={copy.y2012.year}
            title={copy.y2012.title}
            media={
              <div className="flex items-center gap-4">
                {(["cyf", "casa"] as const).map((id) => (
                  <Image key={id} src={LOGOS[id].src} alt={LOGOS[id].alt} width={LOGOS[id].width} height={LOGOS[id].height} className="h-28 w-auto object-contain" />
                ))}
              </div>
            }
          >
            <p className="text-lg">{copy.y2012.body}</p>
          </Entry>
        </div>

        <div className="mt-4 flex flex-col items-start gap-4 rounded-[var(--radius-card)] bg-peach-50 p-8 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-display-m text-ink-900">{copy.cta.title}</p>
          <ButtonLink href={`/${locale}/contact`}>{copy.cta.label}</ButtonLink>
        </div>
      </Container>
    </>
  );
}
