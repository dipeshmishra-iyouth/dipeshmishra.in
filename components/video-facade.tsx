"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayIcon } from "./icons";

type VideoFacadeProps = { id: string; title: string; playLabel: string };

/** Shows the YouTube thumbnail; the player (and YouTube's scripts) load only after a click. */
export function VideoFacade({ id, title, playLabel }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[var(--radius-image)] bg-ink-900">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full" aria-label={`${playLabel}: ${title}`}>
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, 90vw"
            className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-4 left-4 inline-flex size-12 items-center justify-center rounded-full bg-saffron-700 text-white">
            <PlayIcon size={18} />
          </span>
        </button>
      )}
    </div>
  );
}
