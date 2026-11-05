import Image from "next/image";
import { aboutContent } from "@/content/about";
import { CtaBand } from "@/components/cta-band";
import { HashtagCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { Container, SectionHead } from "@/components/ui";
import { LOGOS, type LogoId } from "@/lib/logos";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "../dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = aboutContent[locale].meta;
  return pageMetadata(locale, "about", title, description);
}

export default async function AboutPage() {
  const locale = await getLocale();
  const copy = aboutContent[locale];
  return (
    <>
      <PageHero
        kicker={copy.hero.kicker}
        title={copy.hero.title}
        note={copy.hero.roles}
        aside={
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-teal-50 sm:max-w-xs">
            <Image src="/media/dipesh-sea.webp" alt={copy.hero.portraitAlt} fill priority sizes="320px" className="object-cover object-top" />
          </div>
        }
      />

      <section className="py-16 md:py-24" aria-label={copy.hero.title}>
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0 max-w-2xl space-y-5 text-lg">
            {copy.bio.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <figure className="pt-4">
              <div className="img-reveal relative aspect-[3/2] overflow-hidden rounded-[var(--radius-image)]">
                <Image src="/media/gallery/field-walk.webp" alt={copy.bio.fieldAlt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-sm">{copy.bio.fieldCaption}</figcaption>
            </figure>
          </div>
          <blockquote className="self-start rounded-[var(--radius-card)] bg-peach-50 p-8 lg:sticky lg:top-24">
            <span aria-hidden="true" className="font-serif text-6xl leading-none text-saffron-500">
              “
            </span>
            <p className="font-quote text-hero-quote text-ink-900">{copy.bio.quote}</p>
          </blockquote>
        </Container>
      </section>

      <section className="bg-peach-50 py-16 md:py-24" aria-labelledby="beliefs-h">
        <Container className="space-y-10">
          <SectionHead id="beliefs-h" kicker={copy.beliefs.kicker} title={copy.beliefs.title} />
          <ol data-stagger className="grid gap-4 md:grid-cols-2">
            {copy.beliefs.pillars.map((pillar, i) => (
              <li key={pillar.title} className="lift rounded-[var(--radius-card)] bg-white p-6 md:p-8">
                <span className="font-serif text-display-l text-saffron-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-bold">{pillar.title}</h3>
                <ul className="mt-4 space-y-2">
                  {pillar.points.map((point) => (
                    <li key={point} className="border-l-2 border-saffron-500 pl-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-saffron-700 py-16 text-white md:py-20" aria-label={copy.model.kicker}>
        <Container>
          <p className="text-kicker font-bold text-peach-100">{copy.model.kicker}</p>
          <p data-reveal className="mt-3 max-w-4xl font-serif text-display-xl text-white [overflow-wrap:break-word]">{copy.model.equation}</p>
        </Container>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="roles-h">
        <Container className="space-y-10">
          <SectionHead id="roles-h" kicker={copy.roles.kicker} title={copy.roles.title} />
          <ul data-stagger className="grid gap-4 md:grid-cols-3">
            {copy.roles.cards.map((card) => {
              const logo = LOGOS[card.id as LogoId];
              return (
                <li key={card.id}>
                  <HashtagCard
                    title={card.name}
                    body={card.role}
                    href={`/${locale}/${card.href}`}
                    more={copy.roles.more}
                    mark={<Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-11 w-auto max-w-20 object-contain" />}
                  />
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand title={copy.cta.title} body={copy.cta.body} label={copy.cta.label} href={`/${locale}/contact`} />
    </>
  );
}
