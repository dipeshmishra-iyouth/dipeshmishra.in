import Image from "next/image";
import { servicesContent } from "@/content/services";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "../dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = servicesContent[locale].meta;
  return pageMetadata(locale, "services", title, description);
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const copy = servicesContent[locale];
  return (
    <>
      <PageHero
        kicker={copy.hero.kicker}
        title={copy.hero.title}
        note={copy.hero.note}
        aside={
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-teal-50 sm:max-w-xs">
            <Image src="/media/gallery/speaking-gesture-4x5.webp" alt={copy.hero.photoAlt} fill priority sizes="320px" className="object-cover object-top" />
          </div>
        }
      />
      <section className="py-16 md:py-24" aria-label={copy.hero.kicker}>
        <Container>
          <div data-stagger className="grid gap-6 lg:grid-cols-2">
            {copy.cards.map((card) => (
              <article key={card.id} aria-labelledby={`${card.id}-h`} className="lift flex min-w-0 flex-col gap-6 rounded-[var(--radius-card)] border border-line bg-white p-6 md:p-8">
                <div>
                  <h2 id={`${card.id}-h`} className="font-serif text-display-m [overflow-wrap:break-word]">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-lead font-semibold text-ink-700">{card.lead}</p>
                </div>
                <ul className="space-y-2">
                  {card.items.map((item) => (
                    <li key={item} className="border-l-2 border-saffron-500 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <h3 className="font-bold text-ink-900">{card.extraTitle}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {card.extra.map((item) => (
                      <li key={item} className="rounded-full bg-peach-50 px-4 py-2 text-sm font-semibold text-ink-900">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-2">
                  <ButtonLink href={`/${locale}/contact?topic=${card.id}`}>{card.cta}</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
