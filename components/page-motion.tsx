"use client";

import { useLayoutEffect } from "react";

// Same curve as --ease-smooth-out in globals.css.
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 600;
const MAX_STAGGER_MS = 360;
const RESCUE_MS = 3000;

const hide = (els: Element[]) => els.forEach((el) => ((el as HTMLElement).style.opacity = "0"));
const show = (els: Element[]) => els.forEach((el) => (el as HTMLElement).style.removeProperty("opacity"));

/**
 * Entrance motion for a page, driven by data attributes in the server markup:
 *   data-enter   page-opening blocks, played once on load, staggered
 *   data-stagger children of this element rise in one after another when it scrolls into view
 *   data-reveal  this element rises in when it scrolls into view
 * Anime.js v4's WAAPI build is loaded lazily (about 3 KB), so nothing animates on the main thread.
 * Reduced-motion users get the markup as served; if the chunk fails or frames never render, items are shown again.
 */
export function PageMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.getElementById("main");
    if (!root) return;

    const enter = [...root.querySelectorAll("[data-enter]")];
    const groups = [...root.querySelectorAll("[data-stagger]")].map((el) => ({ el, items: [...el.children] }));
    const singles = [...root.querySelectorAll("[data-reveal]")];
    const pending = [...enter, ...groups.flatMap((g) => g.items), ...singles];
    if (!pending.length) return;

    hide(pending);
    let alive = true;
    let io: IntersectionObserver | undefined;
    const running: { cancel: () => unknown }[] = [];
    // If frames never render (stalled tab, headless capture), nothing already on screen stays hidden.
    const rescue = window.setTimeout(() => {
      show(enter);
      const onScreen = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      };
      groups.filter((g) => onScreen(g.el)).forEach((g) => show(g.items));
      show(singles.filter(onScreen));
    }, RESCUE_MS);

    Promise.all([import("animejs/waapi"), import("animejs/utils")])
      .then(([{ waapi }, { stagger }]) => {
        if (!alive) return;
        const play = (targets: Element[], distance: number, step: number) => {
          if (!targets.length) return;
          const gap = Math.min(step, MAX_STAGGER_MS / Math.max(1, targets.length - 1));
          running.push(
            waapi.animate(targets as HTMLElement[], {
              opacity: [0, 1],
              translate: [`0px ${distance}px`, "0px 0px"],
              duration: DURATION,
              delay: stagger(gap),
              ease: EASE,
              onComplete: () => show(targets),
            }),
          );
        };

        play(enter, 18, 70);

        const itemsOf = new Map<Element, Element[]>();
        groups.forEach((g) => itemsOf.set(g.el, g.items));
        singles.forEach((el) => itemsOf.set(el, [el]));
        io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              io?.unobserve(entry.target);
              const items = itemsOf.get(entry.target) ?? [];
              play(items, 24, 60);
            }
          },
          { rootMargin: "0px 0px -8% 0px" },
        );
        itemsOf.forEach((_, el) => io?.observe(el));
      })
      .catch(() => show(pending));

    return () => {
      alive = false;
      window.clearTimeout(rescue);
      io?.disconnect();
      running.forEach((a) => a.cancel());
      show(pending);
    };
  }, []);

  return null;
}
