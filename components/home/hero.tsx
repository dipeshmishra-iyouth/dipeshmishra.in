import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { HomeContent } from "@/content/home";
import { TiltTile } from "../tilt-tile";
import { ButtonLink, Container } from "../ui";
import { SignatureInk } from "./signature-ink";

const BRUSH_MASK = { WebkitMaskImage: "url(/media/brush.webp)", maskImage: "url(/media/brush.webp)", WebkitMaskSize: "100% 100%", maskSize: "100% 100%" };
const ARCH = "rounded-t-[999px] rounded-b-[2rem]";

/** Dry-brush saffron stroke (scripts/make_brush.mjs) carrying Dipesh's signature, black ink scan inverted to white. */
function SignatureBrush() {
  return (
    <div className="relative aspect-[1600/470] w-[min(100%,28rem)] sm:w-[min(100%,36rem)]" aria-hidden="true">
      <div className="absolute inset-0 bg-saffron-500" style={BRUSH_MASK} />
      <SignatureInk className="absolute left-1/2 top-1/2 h-auto w-[64%] sm:w-[55%] -translate-x-1/2 -translate-y-1/2 invert drop-shadow-[0_0_0.8px_#fff] drop-shadow-[0_0_0.6px_#fff]" />
    </div>
  );
}

/** Round stamp with the role printed along its edge; turns slowly unless reduced motion is asked for. */
function RoleStamp({ text }: { text: string }) {
  const ring = "M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0";
  return (
    <div className="absolute -bottom-5 -left-5 z-10 size-24 rounded-full bg-saffron-700 text-white shadow-[0_14px_28px_-12px_rgb(194_65_12/0.7)] sm:-left-8 sm:size-28" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="spin-slow size-full">
        <defs>
          <path id="role-ring" d={ring} />
        </defs>
        <text fontSize="9" fontWeight="600" fill="currentColor">
          <textPath href="#role-ring" textLength="228" lengthAdjust="spacing">
            {`${text} · `}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-2xl">✦</span>
    </div>
  );
}

/** Layered portrait: glow, dot grid, an outline arch and a peach plate offset behind the photo, a lit B&W portrait that leans with the mouse, and the role stamp. */
function HeroPortrait({ alt, role }: { alt: string; role: string }) {
  return (
    <div className="relative isolate order-1 mx-auto w-full max-w-[15rem] sm:max-w-[22rem] lg:order-2 lg:max-w-none">
      <div className="absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-saffron-500)_20%,transparent),transparent)]" aria-hidden="true" />
      <div className="hero-dots absolute -left-7 -top-7 -z-10 h-28 w-28 text-saffron-500/70 sm:h-36 sm:w-36" aria-hidden="true" />
      <div className={`absolute -bottom-4 -left-4 -z-10 size-full bg-peach-100 ${ARCH}`} aria-hidden="true" />
      <div className={`absolute -right-4 -top-4 -z-10 size-full border-2 border-saffron-500 ${ARCH}`} aria-hidden="true" />

      <TiltTile className="tilt-flat">
        <div className={`relative aspect-[4/5] overflow-hidden bg-ink-900 shadow-[0_30px_60px_-30px_rgb(26_26_26/0.55)] ${ARCH}`}>
          <Image
            src="/media/dipesh-portrait.webp"
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 480px, 22rem"
            className="object-cover object-top grayscale contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-saffron-700/45 via-transparent to-transparent mix-blend-multiply" aria-hidden="true" />
        </div>
      </TiltTile>

      <RoleStamp text={role} />
    </div>
  );
}

export function Hero({ locale, copy, name }: { locale: Locale; copy: HomeContent["hero"]; name: string }) {
  return (
    <section className="overflow-hidden bg-white">
      <Container className="grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:pb-20 lg:pt-14">
        <div className="order-2 min-w-0 lg:order-1">
          <h1 className="font-serif text-display-xl [overflow-wrap:break-word]">{name}</h1>
          <p className="mt-4 text-lead font-semibold text-ink-900">{copy.role}</p>
          <p className="mt-1 max-w-xl text-ink-500">{copy.orgs}</p>

          <div className="mt-8">
            <SignatureBrush />
          </div>

          <blockquote className="mt-6 max-w-xl border-l-4 border-saffron-500 pl-5 font-quote text-[clamp(1.125rem,0.9rem+0.9vw,1.5rem)] font-semibold text-ink-900">
            {copy.quote}
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/contact`}>{copy.partner}</ButtonLink>
            <ButtonLink href={`/${locale}/ventures`} variant="outline">
              {copy.explore}
            </ButtonLink>
          </div>
        </div>

        <HeroPortrait alt={copy.portraitAlt} role={copy.role} />
      </Container>
    </section>
  );
}
