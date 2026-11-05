import Image from "next/image";
import { storeContent } from "@/content/store";
import { HoverTilt } from "@/components/hover-tilt";
import {
  BookIcon,
  ChevronRightIcon,
  FileTextIcon,
  MonitorIcon,
  PhoneIcon,
  ShoppingBagIcon,
  SmartphoneIcon,
  UsersIcon,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHead } from "@/components/ui";
import { facts } from "@/lib/facts";
import { pageMetadata } from "@/lib/metadata";
import { getLocale } from "../dictionaries";

const MODEL_ICONS = { book: BookIcon, phone: SmartphoneIcon, bag: ShoppingBagIcon, monitor: MonitorIcon, file: FileTextIcon, users: UsersIcon };
const STORE_URL = "https://www.iyouthstore.in/";
const BROCHURE_PDF = "/media/brochure/iyouth-store-brochure.pdf";
const SECTION = "py-16 md:py-24";
const CARD = "lift rounded-[var(--radius-card)] p-6";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = storeContent[locale].meta;
  return pageMetadata(locale, "iyouth-store", title, description);
}

/** Numbered steps on a saffron rule, used for the inventory and journey sequences. */
function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol data-stagger className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((step, i) => (
        <li key={step.title} className="min-w-0 border-t-4 border-saffron-500 pt-4">
          <span className="font-serif text-display-m text-saffron-500">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-1 font-bold text-ink-900">{step.title}</h3>
          <p className="mt-1">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export default async function IyouthStorePage() {
  const locale = await getLocale();
  const copy = storeContent[locale];
  return (
    <>
      <PageHero
        kicker={copy.hero.kicker}
        title={<span lang="hi">{copy.hero.title}</span>}
        note={
          <>
            <p>{copy.hero.sub}</p>
            <p className="text-base font-normal">{copy.hero.badge}</p>
          </>
        }
        aside={
          <div className="mx-auto w-full max-w-xs">
            <HoverTilt aspect="1020 / 1320">
              <Image src="/media/brochure/page-1.webp" alt={copy.hero.photoAlt} fill priority sizes="320px" className="object-cover" />
            </HoverTilt>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={STORE_URL} external>
            {copy.hero.apply}
          </ButtonLink>
          <ButtonLink href={BROCHURE_PDF} variant="outline" download prefetch={false}>
            {copy.hero.download}
          </ButtonLink>
        </div>
      </PageHero>

      <section className={SECTION} aria-labelledby="pilot-h">
        <Container className="space-y-10">
          <SectionHead id="pilot-h" kicker={copy.pilot.kicker} title={copy.pilot.title} note={copy.pilot.body} />
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)]">
            <div className={`${CARD} bg-saffron-700 text-white`}>
              <p data-reveal className="font-serif text-display-xl">{facts.liveStores}+</p>
              <p className="mt-2 font-semibold">{copy.pilot.liveLabel}</p>
            </div>
            {[
              [copy.pilot.doneTitle, copy.pilot.done],
              [copy.pilot.openTitle, copy.pilot.open],
            ].map(([title, items]) => (
              <div key={title as string} className={`${CARD} bg-peach-50`}>
                <h3 className="text-lg font-bold">{title as string}</h3>
                <ul className="mt-3 space-y-2">
                  {(items as string[]).map((item) => (
                    <li key={item} className="border-l-2 border-saffron-500 pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${SECTION} bg-peach-50`} aria-labelledby="model-h">
        <Container className="space-y-10">
          <SectionHead id="model-h" kicker={copy.model.kicker} title={copy.model.title} note={copy.model.lead} />
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.model.items.map((item) => {
              const Icon = MODEL_ICONS[item.icon as keyof typeof MODEL_ICONS];
              return (
                <li key={item.title} className={`${CARD} icon-pop flex gap-4 bg-white`}>
                  <span className="icon-pop-target inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-saffron-700 text-white">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-1">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className={SECTION} aria-labelledby="formats-h">
        <Container className="space-y-8">
          <SectionHead id="formats-h" kicker={copy.formats.kicker} title={copy.formats.title} note={copy.formats.lead} />
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
            <table className="w-full min-w-[34rem] border-collapse bg-white text-left">
              <caption className="sr-only">{copy.formats.title}</caption>
              <thead className="bg-teal-900 text-white">
                <tr>
                  {copy.formats.head.map((h, i) => (
                    <th key={i} scope="col" className="p-4 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.formats.rows.map(([label, basic, standard], i) => (
                  <tr key={label} className={`border-b border-line ${i === 0 ? "bg-peach-50 font-bold text-ink-900" : ""}`}>
                    <th scope="row" className="p-4 font-semibold text-ink-900">
                      {label}
                    </th>
                    <td className="p-4">{basic}</td>
                    <td className="p-4">{standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {copy.formats.summary.map((s) => (
              <div key={s.name} className="rounded-[var(--radius-card)] border-2 border-saffron-500 bg-peach-50 p-6">
                <h3 className="font-bold text-saffron-800">{s.name}</h3>
                <p className="mt-1 text-lg font-semibold text-ink-900">{s.sum}</p>
              </div>
            ))}
          </div>
          <p className="max-w-3xl text-lg">{copy.formats.difference}</p>
          <p className="max-w-3xl rounded-[var(--radius-card)] bg-teal-50 p-5 text-sm text-ink-700">{copy.formats.disclaimer}</p>
        </Container>
      </section>

      <section className={`${SECTION} bg-peach-50`} aria-labelledby="who-h">
        <Container className="space-y-10">
          <SectionHead id="who-h" kicker={copy.who.kicker} title={copy.who.title} note={copy.who.lead} />
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.who.people.map((p) => (
              <li key={p.title} className={`${CARD} bg-white`}>
                <h3 className="font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1">{p.body}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="text-kicker font-bold text-saffron-700">{copy.who.needsTitle}</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.who.needs.map((n) => (
                <div key={n.title} className="rounded-[var(--radius-card)] border-t-4 border-saffron-500 bg-white p-5">
                  <dt className="font-bold text-ink-900">{n.title}</dt>
                  <dd className="mt-1">{n.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className={SECTION} aria-labelledby="inventory-h">
        <Container className="space-y-10">
          <SectionHead id="inventory-h" kicker={copy.inventory.kicker} title={copy.inventory.title} note={copy.inventory.lead} />
          <Steps items={copy.inventory.steps} />
          <div className="max-w-3xl rounded-[var(--radius-card)] bg-peach-50 p-6">
            <h3 className="font-bold text-ink-900">{copy.inventory.kitTitle}</h3>
            <p className="mt-2">{copy.inventory.kit}</p>
          </div>
        </Container>
      </section>

      <section className={`${SECTION} bg-peach-50`} aria-labelledby="steps-h">
        <Container className="space-y-10">
          <SectionHead id="steps-h" kicker={copy.steps.kicker} title={copy.steps.title} />
          <Steps items={copy.steps.items} />
        </Container>
      </section>

      <section className="bg-teal-900 py-16 md:py-20" aria-labelledby="support-h">
        <Container className="space-y-10">
          <SectionHead id="support-h" tone="dark" kicker={copy.support.kicker} title={copy.support.title} note={copy.support.lead} />
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.support.items.map((s) => (
              <li key={s.title} className={`${CARD} bg-white`}>
                <h3 className="font-bold text-ink-900">{s.title}</h3>
                <p className="mt-1">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={SECTION} aria-labelledby="faq-h">
        <Container className="space-y-10">
          <SectionHead id="faq-h" kicker={copy.faq.kicker} title={copy.faq.title} />
          <div data-stagger className="faq max-w-3xl divide-y divide-line border-y border-line">
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group py-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronRightIcon className="shrink-0 transition-transform duration-[var(--duration-fast)] group-open:rotate-90" />
                </summary>
                <p className="pb-3 pt-1">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className={`${SECTION} bg-peach-50`} aria-labelledby="proof-h">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <p data-reveal className="font-serif text-display-xl text-saffron-500">{facts.liveStores}+</p>
            <h2 id="proof-h" className="font-serif text-display-l [overflow-wrap:break-word]">
              {copy.proof.title}
            </h2>
            <p className="mt-4 max-w-xl text-lead">{copy.proof.body}</p>
          </div>
          <figure className="mx-auto w-full max-w-xs">
            <HoverTilt aspect="4 / 5">
              <Image src="/media/gallery/ribbon-4x5.webp" alt={copy.proof.photoAlt} fill sizes="320px" className="object-cover" />
            </HoverTilt>
            <figcaption className="mt-3 text-sm">{copy.proof.caption}</figcaption>
          </figure>
        </Container>
      </section>

      <section className="bg-teal-900 py-16 md:py-20" aria-labelledby="cta-h">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h2 id="cta-h" className="font-serif text-display-l text-white [overflow-wrap:break-word]">
              {copy.cta.title}
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-lead text-peach-100">
              <PhoneIcon size={20} />
              {copy.cta.helpline}:{" "}
              <a href={`tel:${facts.storeHelpline.replace(/\s/g, "")}`} className="font-semibold text-white underline underline-offset-4">
                {facts.storeHelpline}
              </a>
            </p>
          </div>
          <ButtonLink href={STORE_URL} external>
            {copy.cta.apply}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
