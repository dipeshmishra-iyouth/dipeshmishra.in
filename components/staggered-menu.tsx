"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { CloseIcon } from "./icons";
import "./staggered-menu.css";

// Adapted from React Bits "StaggeredMenu": same layered slide-in and staggered
// item reveal, rebuilt as a controlled, localised modal dialog in our theme.

export type MenuLink = { label: string; href: string };

type StaggeredMenuProps = {
  open: boolean;
  onClose: () => void;
  /** Runs once the close animation has finished and the dialog is closed. */
  onClosed?: () => void;
  items: MenuLink[];
  socials: MenuLink[];
  labels: { nav: string; close: string; socials: string };
  footer: ReactNode;
};

const OFFSCREEN = -100;

type Refs = {
  panel: RefObject<HTMLDivElement | null>;
  layers: RefObject<HTMLDivElement | null>;
  scrim: RefObject<HTMLDivElement | null>;
};

function targets({ panel, layers }: Refs) {
  const p = panel.current;
  return {
    layerEls: Array.from(layers.current?.children ?? []),
    labelEls: Array.from(p?.querySelectorAll(".sm-label") ?? []),
    numEls: Array.from(p?.querySelectorAll(".sm-num") ?? []),
    socialEls: Array.from(p?.querySelectorAll(".sm-social") ?? []),
  };
}

function reset(refs: Refs) {
  const { layerEls, labelEls, numEls, socialEls } = targets(refs);
  gsap.set([refs.panel.current, ...layerEls], { xPercent: OFFSCREEN });
  gsap.set(labelEls, { yPercent: 140, rotate: 8 });
  gsap.set([...numEls, ...socialEls], { opacity: 0 });
  gsap.set(socialEls, { y: 20 });
  gsap.set(refs.scrim.current, { opacity: 0 });
}

export default function StaggeredMenu({ open, onClose, onClosed, items, socials, labels, footer }: StaggeredMenuProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const layers = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const shown = useRef(false);
  const refs = { panel, layers, scrim };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => reset(refs));
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable objects
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { layerEls, labelEls, numEls, socialEls } = targets(refs);
    timeline.current?.kill();

    if (open) {
      shown.current = true;
      if (!d.open) d.showModal(); // effects can re-run (StrictMode); showModal throws if already open
      document.documentElement.style.overflow = "hidden";
      if (reduce) {
        gsap.set([panel.current, ...layerEls], { xPercent: 0 });
        gsap.set(labelEls, { yPercent: 0, rotate: 0 });
        gsap.set([...numEls, ...socialEls], { opacity: 1, y: 0 });
        gsap.set(scrim.current, { opacity: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.to(scrim.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      layerEls.forEach((el, i) => tl.to(el, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07));
      const start = layerEls.length * 0.07 + 0.08;
      tl.to(panel.current, { xPercent: 0, duration: 0.65, ease: "power4.out" }, start);
      tl.to(labelEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, start + 0.1);
      tl.to(numEls, { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 }, start + 0.2);
      tl.to(socialEls, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08 }, start + 0.3);
      timeline.current = tl;
    } else if (shown.current) {
      shown.current = false;
      const finish = () => {
        d.close();
        document.documentElement.style.overflow = "";
        reset(refs);
        onClosed?.();
      };
      if (reduce) return finish();
      timeline.current = gsap
        .timeline({ onComplete: finish })
        .to(scrim.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
        .to([panel.current, ...layerEls], { xPercent: OFFSCREEN, duration: 0.32, ease: "power3.in" }, 0);
    }
    return () => {
      timeline.current?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- refs are stable; onClosed is read at close time
  }, [open]);

  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  return (
    <dialog
      ref={dialog}
      aria-label={labels.nav}
      className="sm-dialog"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (!panel.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div ref={scrim} className="sm-scrim" aria-hidden="true" />
      <div ref={layers} className="sm-layers" aria-hidden="true">
        <div className="sm-layer sm-layer-saffron" />
        <div className="sm-layer sm-layer-teal" />
      </div>
      <div ref={panel} className="sm-panel">
        <div className="flex justify-end">
          <button type="button" onClick={onClose} aria-label={labels.close} className="sm-close">
            <CloseIcon />
          </button>
        </div>

        <nav aria-label={labels.nav} className="mt-6">
          <ol className="sm-list">
            {items.map((item, i) => (
              <li key={item.href} className="sm-item">
                <Link href={item.href} onClick={onClose} className="sm-link">
                  <span className="sm-label">{item.label}</span>
                  <span className="sm-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="sm-bottom">
          <h2 className="sm-social-title sm-social">{labels.socials}</h2>
          <ul className="sm-social-list">
            {socials.map((s) => (
              <li key={s.href} className="sm-social">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="sm-social-link">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3">{footer}</div>
        </div>
      </div>
    </dialog>
  );
}
