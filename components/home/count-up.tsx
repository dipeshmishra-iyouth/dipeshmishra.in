"use client";

import { useEffect, useRef } from "react";

/** Counts up once when scrolled into view. The final value is already in the markup, so no-JS and reduced-motion users see it. */
export function CountUp({ value }: { value: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!node || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(match[1]);
    if (target > 99) return; // years and similar read better static
    const suffix = match[2];

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 900);
          const eased = 1 - Math.pow(1 - t, 3);
          node.textContent = `${Math.round(target * eased)}${suffix}`;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return <span ref={el}>{value}</span>;
}
