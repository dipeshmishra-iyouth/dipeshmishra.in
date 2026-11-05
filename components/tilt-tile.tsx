"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

const MAX_DEG = 7;

/**
 * Leans a tile toward the mouse. The pointer only writes two CSS variables; the transform, easing and the
 * hover-only gating (fine pointer, no reduced motion) live in globals.css, so touch screens see a flat tile.
 */
export function TiltTile({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const lean = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ry", `${((clientX - r.left) / r.width - 0.5) * MAX_DEG * 2}deg`);
      el.style.setProperty("--rx", `${-((clientY - r.top) / r.height - 0.5) * MAX_DEG * 2}deg`);
    });
  };

  const settle = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.active;
  };

  return (
    <div
      ref={ref}
      className={`tilt-tile ${className}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && ref.current && (ref.current.dataset.active = "")}
      onPointerMove={lean}
      onPointerLeave={settle}
    >
      {children}
    </div>
  );
}
