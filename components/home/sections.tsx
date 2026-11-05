import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { HomeContent } from "@/content/home";
import { facts, platforms } from "@/lib/facts";
import { BentoTile, HashtagCard, PlatformCard } from "../cards";
import { Marquee } from "../marquee";
import { TiltTile } from "../tilt-tile";
import { BrochureBook } from "../brochure-book";
import { VideoFacade } from "../video-facade";
import { ButtonLink, Container, MoreLink, SectionHead } from "../ui";
import { PlayIcon } from "../icons";
import { CountUp } from "./count-up";
import { HoverTilt } from "../hover-tilt";
import { RibbonLoop } from "./ribbon-loop";

const SECTION = "py-16 md:py-24";

export function ProofStrip({ items }: { items: HomeContent["proof"] }) {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-peach-50">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex min-w-0 flex-col">
              <dt className="order-2 mt-1 text-[15px]">{item.label}</dt>
              <dd className="order-1 font-serif text-display-l text-saffron-500">
                {item.id === "stores" ? <CountUp value={item.value} /> : item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

const LOGOS: Record<string, { src: string; alt: string } | undefined> = {
  cyf: { src: "/media/logo-cyf.webp", alt: "Chhattisgarh Youth Federation logo" },
  casa: { src: "/media/logo-casa.webp", alt: "Chhattisgarh Adventure Sports Association logo" },
};

export function Ventures({ locale, copy }: { locale: Locale; copy: HomeContent["ventures"] }) {
  return (
    <section className={SECTION} aria-labelledby="ventures-h">
      <Container className="space-y-10">
        <SectionHead id="ventures-h" kicker={copy.kicker} title={copy.title} note={copy.note} />
        <ul className="grid gap-4 md:grid-cols-2">
          {copy.cards.map((card) => {
            const logo = LOGOS[card.id];
            return (
              <li key={card.id}>
                <HashtagCard
                  title={card.title}
                  body={card.body}
                  href={`/${locale}/${card.href}`}
                  more={copy.more}
                  mark={logo && <Image src={logo.src} alt={logo.alt} width={44} height={44} className="size-11 object-contain" />}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function StoreBand({ locale, copy, dict }: { locale: Locale; copy: HomeContent["store"]; dict: Dictionary }) {
  return (
    <section className="bg-teal-900 py-16 md:py-24" aria-labelledby="store-h">
      <Container className="space-y-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="text-kicker font-bold text-peach-100">{copy.kicker}</p>
            <h2 id="store-h" className="mt-2 font-serif text-display-l text-white [overflow-wrap:break-word]">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-xl border-l-4 border-saffron-500 pl-5 text-lead font-semibold text-white">{copy.note}</p>
          </div>
          <div className="grid grid-cols-2 items-start gap-4 sm:gap-6">
            <figure className="min-w-0">
              <HoverTilt aspect="4 / 5">
                <Image src="/media/gallery/ribbon-4x5.webp" alt={copy.photoAlt} fill sizes="(min-width: 1024px) 26vw, 45vw" className="object-cover" />
              </HoverTilt>
              <figcaption className="mt-3 text-sm text-peach-100">{copy.meetingCaption}</figcaption>
            </figure>
            <BrochureBook alt={copy.brochureAlt} caption={copy.brochureCaption} labels={copy.brochureLabels} />
          </div>
        </div>
        <Marquee label={copy.kicker} pauseLabel={dict.a11y.pauseMotion} resumeLabel={dict.a11y.resumeMotion} tone="dark">
          {copy.cards.map((text) => (
            <TiltTile key={text}>
              <p className="h-full min-h-40 rounded-[var(--radius-card)] bg-white p-6 text-lg font-semibold text-ink-900">{text}</p>
            </TiltTile>
          ))}
        </Marquee>
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="https://www.iyouthstore.in/" external>
            {copy.open}
          </ButtonLink>
          <Link
            href={`/${locale}/iyouth-store`}
            className="inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4 hover:text-peach-100"
          >
            {copy.story}
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function Bento({ locale, copy, dict }: { locale: Locale; copy: HomeContent["bento"]; dict: Dictionary }) {
  const p = (path: string) => `/${locale}/${path}`;
  return (
    <section className={SECTION} aria-labelledby="bento-h">
      <Container className="space-y-10">
        <SectionHead id="bento-h" kicker={copy.kicker} title={copy.title} />
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
          <BentoTile label={copy.quoteLabel}>
            <p className="font-serif text-display-m text-ink-900">{copy.equation}</p>
          </BentoTile>

          <BentoTile label={copy.manLabel} tone="teal" href={p("about")} className="min-h-80 md:row-span-2">
            <Image src="/media/gallery/speaking-close-4x5.webp" alt={copy.manAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-10 object-cover object-top" />
            <p className="mt-auto rounded-2xl bg-white/90 p-4 font-serif text-xl text-ink-900">{copy.manTitle}</p>
          </BentoTile>

          <BentoTile label={copy.servicesLabel} tone="white" href={p("services")}>
            <p className="text-lead font-semibold text-ink-900">{copy.servicesTitle}</p>
          </BentoTile>

          <BentoTile label={copy.watchLabel} tone="teal" href={p("media")}>
            <p className="flex items-center gap-3 font-semibold text-ink-900">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-saffron-700 text-white">
                <PlayIcon size={16} />
              </span>
              {copy.watchTitle}
            </p>
          </BentoTile>

          <BentoTile tone="saffron" className="md:col-span-2">
            <p lang="hi" className="font-serif text-display-l text-white">
              {dict.home.slogan}
            </p>
          </BentoTile>
        </div>
      </Container>
    </section>
  );
}

export function Platforms({ copy, dict }: { copy: HomeContent["platforms"]; dict: Dictionary }) {
  return (
    <section className={`${SECTION} bg-peach-50`} aria-labelledby="platforms-h">
      <Container className="space-y-10">
        <SectionHead id="platforms-h" kicker={copy.kicker} title={copy.title} />
        <Marquee label={copy.kicker} pauseLabel={dict.a11y.pauseMotion} resumeLabel={dict.a11y.resumeMotion} secondsPerItem={5}>
          {platforms.map((pl) => (
            <TiltTile key={pl.domain}>
              <PlatformCard
                domain={pl.domain}
                body={copy.items[pl.domain]}
                status={pl.status}
                statusLabel={dict.status[pl.status]}
                externalLabel={dict.a11y.external}
              />
            </TiltTile>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}

export function Watch({ copy, dict }: { copy: HomeContent["watch"]; dict: Dictionary }) {
  return (
    <section className={SECTION} aria-labelledby="watch-h">
      <Container className="space-y-10">
        <SectionHead id="watch-h" kicker={copy.kicker} title={copy.title} note={copy.note} />
        <ul className="grid gap-6 md:grid-cols-3">
          {facts.videos.map((id, i) => (
            <li key={id}>
              <VideoFacade id={id} title={copy.videos[i]} playLabel={dict.a11y.play} />
              <p className="mt-3 font-semibold text-ink-900">{copy.videos[i]}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Vision({ locale, copy }: { locale: Locale; copy: HomeContent["vision"] }) {
  return (
    <section className="pb-16 md:pb-24" aria-labelledby="vision-h">
      <Container className="space-y-10">
        <SectionHead id="vision-h" kicker={copy.kicker} title={copy.title} />
        <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
          {copy.phases.map((text, i) => (
            <li key={text} className="relative min-w-0 border-t-4 border-saffron-500 pt-4">
              <span className="font-serif text-display-m text-saffron-500">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-semibold text-ink-900">{text}</p>
            </li>
          ))}
        </ol>
        <MoreLink href={`/${locale}/journey`}>{copy.link}</MoreLink>
      </Container>
    </section>
  );
}

export function Connect({ locale, copy }: { locale: Locale; copy: HomeContent["connect"] }) {
  return (
    <section className="relative isolate overflow-hidden bg-peach-50 py-20 md:py-28" aria-labelledby="connect-h">
      <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <h2 id="connect-h" className="font-serif text-display-l">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-xl text-lead">{copy.body}</p>
          <div className="mt-8">
            <ButtonLink href={`/${locale}/contact`}>{copy.cta}</ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-xs">
          <RibbonLoop text={copy.ribbon} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-teal-50">
            <Image src="/media/dipesh-sea.webp" alt={copy.photoAlt} fill sizes="320px" className="object-cover object-top" />
          </div>
        </div>
      </Container>
    </section>
  );
}
