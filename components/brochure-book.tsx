"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { HoverTilt } from "./hover-tilt";
import { BookIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

// Rendered from the PDF by scripts/make_brochure.py; booklet order, cover first.
const PAGES = ["/media/brochure/page-1.webp", "/media/brochure/page-2.webp", "/media/brochure/page-3.webp", "/media/brochure/page-4.webp"];
const PDF = "/media/brochure/iyouth-store-brochure.pdf";
const PAGE_W = 1020;
const PAGE_H = 1320;
const TURN_MS = 900; // keep in step with .book transitions in globals.css
const LAST = 2; // 0 = closed on the cover, 1 = pages 2 and 3, 2 = back cover
// Wide screens get the turning book; phones get a prompt to download the PDF instead.
const DESKTOP = "(min-width: 768px)";

export type BrochureLabels = {
  open: string;
  close: string;
  page: string;
  prev: string;
  next: string;
  download: string;
  prompt: string;
  notNow: string;
};

type BrochureBookProps = { alt: string; caption: string; labels: BrochureLabels };

const ROUND = "inline-flex size-11 items-center justify-center rounded-full bg-white text-ink-900 shadow-lg hover:bg-peach-50 disabled:opacity-40";

/** Brochure cover. Desktop: opens a book whose leaves turn in 3D through all four pages. Phones: offers the PDF. */
export function BrochureBook({ alt, caption, labels }: BrochureBookProps) {
  const book = useRef<HTMLDialogElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  // Pages load only once the visitor reaches for the brochure on desktop, ahead of the first turn.
  const [warm, setWarm] = useState(false);

  // Phones never open the book, so they never download its page images.
  const warmUp = () => window.matchMedia(DESKTOP).matches && setWarm(true);
  const turn = (dir: 1 | -1) => setStep((s) => Math.min(LAST, Math.max(0, s + dir)));

  const show = () => {
    if (!window.matchMedia(DESKTOP).matches) {
      sheet.current?.showModal();
      return;
    }
    setWarm(true);
    book.current?.showModal();
    // Read layout once so the closed pose is computed before the cover starts to turn.
    book.current?.querySelector(".book")?.getBoundingClientRect();
    setStep(1);
  };
  const hide = () => {
    setStep(0);
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    window.setTimeout(() => book.current?.close(), motion ? TURN_MS : 0);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") turn(1);
    if (e.key === "ArrowLeft") turn(-1);
  };

  // Book pages are not rendered at all until warm, so the closed dialog fetches nothing.
  const page = (i: number) =>
    warm && (
    <Image
      src={PAGES[i]}
      alt={`${labels.page} ${i + 1}`}
      width={PAGE_W}
      height={PAGE_H}
      sizes="44vw"
      loading="eager"
      className="size-full object-cover"
    />
    );
  // A leaf is on the right until it turns; the later leaf sits on top once both have turned.
  const leaf = (index: 0 | 1, front: number, back: number) => (
    <div className="book-leaf" data-turned={step > index || undefined} style={{ zIndex: step > 1 ? index + 1 : 2 - index }}>
      <button type="button" tabIndex={-1} aria-hidden="true" className="book-face" onClick={() => turn(1)}>
        {page(front)}
      </button>
      <button type="button" tabIndex={-1} aria-hidden="true" className="book-face book-face-back" onClick={() => turn(-1)}>
        {page(back)}
      </button>
    </div>
  );

  return (
    <figure className="mt-8 min-w-0 sm:mt-12">
      <button
        type="button"
        onClick={show}
        onPointerEnter={warmUp}
        onFocus={warmUp}
        aria-haspopup="dialog"
        aria-label={`${labels.open}: ${caption}`}
        className="group relative block w-full"
      >
        <HoverTilt aspect={`${PAGE_W} / ${PAGE_H}`}>
          <Image src={PAGES[0]} alt={alt} fill sizes="(min-width: 1024px) 26vw, 45vw" className="object-cover" />
        </HoverTilt>
        <span className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-saffron-700 text-white shadow-lg transition-transform duration-[var(--duration-fast)] group-hover:scale-110">
          <BookIcon size={18} />
        </span>
      </button>
      <figcaption className="mt-3 text-sm text-peach-100">{caption}</figcaption>

      <dialog
        ref={book}
        aria-label={caption}
        onKeyDown={onKeyDown}
        onCancel={(e) => {
          e.preventDefault();
          hide();
        }}
        onClick={(e) => e.target === e.currentTarget && hide()}
        className="m-0 size-full max-h-none max-w-none flex-col items-center justify-center gap-5 overflow-hidden bg-black/80 p-4 backdrop:bg-transparent open:flex"
      >
        <button type="button" onClick={hide} aria-label={labels.close} className={`${ROUND} fixed right-4 top-4 z-10`}>
          <CloseIcon />
        </button>
        <div className="book" data-step={step}>
          {leaf(1, 2, 3)}
          {leaf(0, 0, 1)}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => turn(-1)} disabled={step === 0} aria-label={labels.prev} className={ROUND}>
            <ChevronLeftIcon />
          </button>
          <a href={PDF} download className="inline-flex min-h-11 items-center rounded-full bg-saffron-700 px-5 text-sm font-semibold text-white hover:bg-saffron-800">
            {labels.download}
          </a>
          <button type="button" onClick={() => turn(1)} disabled={step === LAST} aria-label={labels.next} className={ROUND}>
            <ChevronRightIcon />
          </button>
        </div>
      </dialog>

      <dialog
        ref={sheet}
        aria-label={caption}
        onClick={(e) => e.target === e.currentTarget && sheet.current?.close()}
        className="mx-auto mb-0 mt-auto w-full max-w-md rounded-t-[var(--radius-card)] bg-white p-6 text-ink-700 backdrop:bg-black/60"
      >
        <p className="font-serif text-display-m text-ink-900">{caption}</p>
        <p className="mt-2">{labels.prompt}</p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={PDF}
            download
            onClick={() => sheet.current?.close()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-saffron-700 px-6 font-semibold text-white"
          >
            {labels.download}
          </a>
          <button type="button" onClick={() => sheet.current?.close()} className="min-h-12 rounded-full border-2 border-ink-900 font-semibold text-ink-900">
            {labels.notNow}
          </button>
        </div>
      </dialog>
    </figure>
  );
}
