"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "./icons";

const COPIES = 3; // enough width to loop seamlessly even on very wide screens

type MarqueeProps = {
  label: string;
  pauseLabel: string;
  resumeLabel: string;
  tone?: "light" | "dark";
  /** Seconds each item takes to pass, so speed stays the same whatever the item count. */
  secondsPerItem?: number;
  children: ReactNode[];
};

/**
 * Endless row driven by one CSS transform animation (compositor only, no JS per frame).
 * Pauses on hover and focus (mouse) and via the toggle (touch, keyboard). With reduced motion it becomes a plain scrollable row.
 * The repeated copies are inert, so links are only reachable once.
 */
export function Marquee({ label, pauseLabel, resumeLabel, tone = "light", secondsPerItem = 6, children }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const toggle =
    tone === "dark"
      ? "bg-white/10 text-white hover:bg-white/20"
      : "border border-line bg-white text-ink-900 hover:border-saffron-700 hover:text-saffron-700";
  const vars = { "--marquee-copies": COPIES, "--marquee-duration": `${children.length * secondsPerItem}s` } as CSSProperties;

  return (
    <section aria-roledescription="carousel" aria-label={label} className="marquee min-w-0" data-paused={paused} style={vars}>
      <div className="marquee-viewport" tabIndex={0}>
        <div className="marquee-track">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul key={copy} className="marquee-group" {...(copy > 0 ? { "aria-hidden": true, inert: true } : {})}>
              {children.map((child, i) => (
                <li key={i} className="marquee-item">
                  {child}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? resumeLabel : pauseLabel}
        className={`marquee-toggle mt-4 inline-flex size-11 items-center justify-center rounded-full ${toggle}`}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </section>
  );
}
