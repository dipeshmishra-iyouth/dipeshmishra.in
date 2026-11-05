import Image from "next/image";
import { homeContent } from "@/content/home";
import { venturesContent, type VenturesContent } from "@/content/ventures";
import { PlatformCard } from "@/components/cards";
import { PageHero } from "@/components/page-hero";
import { Container, SectionHead } from "@/components/ui";
import { platforms } from "@/lib/facts";
import { LOGOS } from "@/lib/logos";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = venturesContent[locale].meta;
  return pageMetadata(locale, "ventures", title, description);
}

function Facts({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="min-w-0">
      <h3 className="text-kicker font-bold text-saffron-700">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-saffron-500 pl-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InstitutionSection({ institution, labels, index }: { institution: VenturesContent["institutions"][number]; labels: VenturesContent["labels"]; index: number }) {
  const logo = LOGOS[institution.id];
  const headingId = `${institution.id}-h`;
  return (
    <section id={institution.id} aria-labelledby={headingId} className={`scroll-mt-20 py-14 md:py-20 ${index % 2 === 1 ? "bg-peach-50" : ""}`}>
      <Container className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-24 w-auto max-w-40 shrink-0 object-contain" />
          <div className="min-w-0">
            <h2 id={headingId} className="font-serif text-display-l [overflow-wrap:break-word]">
              {institution.name}
            </h2>
            <p className="mt-2 font-semibold text-ink-900">
              {labels.founded} {institution.founded}
              {institution.registration && <span className="font-normal text-ink-700"> · {institution.registration}</span>}
            </p>
          </div>
        </div>
        {institution.note && <p className="max-w-3xl border-l-4 border-saffron-500 pl-5 text-lead font-semibold text-ink-700">{institution.note}</p>}
        <div data-stagger className="grid gap-8 md:grid-cols-3">
          <Facts title={labels.vision} items={[institution.vision]} />
          <Facts title={labels.mission} items={[institution.mission]} />
          <Facts title={labels.objectives} items={institution.objectives} />
        </div>
        {institution.coreFocus && (
          <div>
            <h3 className="text-kicker font-bold text-saffron-700">{labels.coreFocus}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {institution.coreFocus.map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 ring-1 ring-line">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

export default async function VenturesPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = venturesContent[locale];
  const platformCopy = homeContent[locale].platforms;
  return (
    <>
      <PageHero kicker={copy.hero.kicker} title={copy.hero.title} note={copy.hero.note} />
      {copy.institutions.map((institution, i) => (
        <InstitutionSection key={institution.id} institution={institution} labels={copy.labels} index={i} />
      ))}
      <section id="platforms" aria-labelledby="platforms-h" className="scroll-mt-20 border-t border-line py-14 md:py-20">
        <Container className="space-y-10">
          <SectionHead id="platforms-h" kicker={platformCopy.kicker} title={copy.platforms.title} note={copy.platforms.note} />
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((pl) => (
              <li key={pl.domain}>
                <PlatformCard
                  domain={pl.domain}
                  body={platformCopy.items[pl.domain]}
                  status={pl.status}
                  statusLabel={dict.status[pl.status]}
                  externalLabel={dict.a11y.external}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
