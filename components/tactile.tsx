"use client";

import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

// A tap lasts only a few frames, so the cap stays down at least this long to be seen.
const MIN_PRESS_MS = 90;

type TactileProps = { children: ReactNode; plate: string; className?: string };

/**
 * Keycap button: the child (the cap) rides on a fixed plate and drops onto it while pressed, then springs back.
 * Works for mouse, touch and keyboard; the press is released on window pointer events so it can never stick.
 * The motion itself lives in globals.css (.tactile), where reduced motion turns it into an instant swap.
 */
export function Tactile({ children, plate, className = "" }: TactileProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const downAt = useRef(0);
  const timer = useRef(0);

  const release = () => {
    const el = ref.current;
    if (!el || el.dataset.pressed === undefined) return;
    const wait = Math.max(0, MIN_PRESS_MS - (performance.now() - downAt.current));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => delete el.dataset.pressed, wait);
  };

  useEffect(() => {
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  const press = () => {
    window.clearTimeout(timer.current);
    downAt.current = performance.now();
    if (ref.current) ref.current.dataset.pressed = "";
  };

  return (
    <span
      ref={ref}
      className={`tactile ${className}`}
      style={{ "--plate": plate } as CSSProperties}
      onPointerDown={(e: PointerEvent) => (e.pointerType !== "mouse" || e.button === 0) && press()}
      onKeyDown={(e: KeyboardEvent) => (e.key === "Enter" || e.key === " ") && !e.repeat && press()}
      onKeyUp={release}
    >
      {children}
    </span>
  );
}
