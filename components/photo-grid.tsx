"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

export type Photo = { src: string; width: number; height: number; alt: string; caption: string };
type PhotoGridProps = { photos: Photo[]; labels: { open: string; close: string; prev: string; next: string } };

const ROUND = "inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20";

/** Masonry of photos; each opens in a native modal dialog with prev / next. */
export function PhotoGrid({ photos, labels }: PhotoGridProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + photos.length) % photos.length);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <>
      <ul data-stagger className="columns-2 gap-4 md:columns-3">
        {photos.map((p, i) => (
          <li key={p.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              aria-label={`${labels.open}: ${p.caption}`}
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
              className="group block w-full overflow-hidden rounded-[var(--radius-image)]"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
              />
            </button>
            <p className="mt-2 text-sm">{p.caption}</p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={photo.caption}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto size-full max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/85 md:p-8"
      >
        <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center gap-4">
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="90vw" className="max-h-[75dvh] w-auto rounded-[var(--radius-image)] object-contain" />
          <p className="text-center text-white">{photo.caption}</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={ROUND}>
              <ChevronLeftIcon />
            </button>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className={ROUND}>
              <CloseIcon />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className={ROUND}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
