"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// GSAP and the loop component load only when the ribbon is about to scroll into view.
const TextLoop = dynamic(() => import("../text-loop"), { ssr: false });

const CY = 260; // vertical centre of the component's 1200 x 520 viewBox
const STEP = 320;
const AMPLITUDE = 64;

/** A gentle wave far wider than any screen, so the ribbon never runs out on large displays. */
const WAVE_PATH = (() => {
  const from = -1600;
  const to = 2800;
  let d = `M ${from} ${CY} Q ${from + STEP / 2} ${CY - AMPLITUDE} ${from + STEP} ${CY}`;
  for (let x = from + STEP * 2; x <= to; x += STEP) d += ` T ${x} ${CY}`;
  return d;
})();

type RibbonLoopProps = { text: string };

/**
 * Decorative ribbon of looping values text, running right to left, meant to sit behind a section's content.
 * Place it inside the element it should pass behind; it centres on that element and is wide enough to reach both screen edges.
 * Tinted and low-contrast so the foreground copy stays readable; hidden from assistive tech
 * because the same words appear in the bento tile.
 */
export function RibbonLoop({ text }: RibbonLoopProps) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} aria-hidden="true" className="ribbon-loop pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-[200vw] -translate-x-1/2 -translate-y-1/2 sm:h-44 lg:h-52">
      {near && (
        <TextLoop
          text={text}
          path={WAVE_PATH}
          ribbonWidth={56}
          fontSize={30}
          fontWeight={600}
          letterSpacing={0}
          uppercase={false}
          separator="✦"
          speed={60}
          direction="reverse"
          pauseOnHover={false}
          ribbonColor="color-mix(in srgb, var(--color-saffron-500) 13%, var(--color-peach-50))"
          color="var(--color-saffron-500)"
        />
      )}
    </div>
  );
}
