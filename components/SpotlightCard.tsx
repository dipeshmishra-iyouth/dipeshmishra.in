'use client';

import Link from 'next/link';
import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import './SpotlightCard.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const falloff = (color: string, softness: number) => {
  const soft = clamp(softness, 0, 1);
  const core = (1 - soft) ** 1.5 * 0.85;
  const stop = (alpha: number, at: number) =>
    `color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;
  const list = [stop(1, 0)];
  for (let i = 0; i <= 14; i++) {
    const t = core + ((1 - core) * i) / 14;
    const g = (t - core) / (1 - core);
    const smooth = 1 - g * g * (3 - 2 * g);
    const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    list.push(stop(smooth + (glow - smooth) * soft, t));
  }
  return list.join(',');
};

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export type SpotlightCardProps = {
  as?: 'div' | 'article' | 'section';
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
  className?: string;
  spotlightColor?: string;
  staticBorderColor?: string;
  intensity?: number;
  spotlightSize?: number;
  softness?: number;
  borderGlow?: number;
  smoothing?: number;
  grain?: number;
  style?: React.CSSProperties;
} & HTMLAttributes<HTMLElement>;

export function SpotlightCard({
  as = 'div',
  href,
  target,
  rel,
  children,
  className = '',
  spotlightColor = '#c2410c',
  staticBorderColor,
  intensity = 0.12,
  spotlightSize = 280,
  softness = 0.75,
  borderGlow = 0.75,
  smoothing = 0.25,
  grain = 0,
  style,
  ...rest
}: SpotlightCardProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const lightRef = useRef<HTMLSpanElement | null>(null);
  const grainRef = useRef<HTMLSpanElement | null>(null);
  const edgeRef = useRef<HTMLSpanElement | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const settings = {
    fill: falloff(spotlightColor, softness),
    edge: falloff(spotlightColor, 1),
    size: Math.max(20, spotlightSize),
    intensity: clamp(intensity, 0, 1),
    borderGlow: clamp(borderGlow, 0, 1),
    smoothing: clamp(smoothing, 0, 1),
    grain: clamp(grain, 0, 1),
  };

  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
    wakeRef.current?.();
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Desktop-Only Rule: Wrap strictly under (hover: hover) and (pointer: fine).
    // On touch devices, disable touch tracking completely so mobile scrolling remains 100% smooth.
    const hoverQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)');
    if (!hoverQuery?.matches) {
      return;
    }

    const root = rootRef.current;
    const light = lightRef.current;
    const edge = edgeRef.current;
    const noise = grainRef.current;
    if (!root || !light || !edge) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state = { x: 0, y: 0, presence: 0, flare: 0, pressed: false };
    const pointer = { x: 0, y: 0, active: false };
    const drawn = { light: '', edge: '', noise: '' };
    let focus: Element | null = null;
    let raf = 0;
    let last = 0;
    let alive = true;

    const gradient = (size: number, x: number, y: number, stops: string) =>
      `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;

    const paint = (s: typeof settings) => {
      const size = s.size * (1 + 0.15 * state.flare);
      const boost = 1 + 0.5 * state.flare;
      const fill = gradient(size, state.x, state.y, s.fill);
      const rim = gradient(size * 0.7, state.x, state.y, s.edge);

      if (fill !== drawn.light) {
        drawn.light = fill;
        light.style.background = fill;
      }
      if (rim !== drawn.edge) {
        drawn.edge = rim;
        edge.style.background = rim;
      }

      light.style.opacity = String(Math.min(1, state.presence * s.intensity * boost));
      edge.style.opacity = String(Math.min(1, state.presence * s.borderGlow * boost));

      if (noise && s.grain > 0) {
        const grainy = gradient(size, state.x, state.y, '#000 0%, transparent 100%');
        if (grainy !== drawn.noise) {
          drawn.noise = grainy;
          noise.style.webkitMaskImage = grainy;
          noise.style.maskImage = grainy;
        }
        noise.style.opacity = String(state.presence * s.grain);
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const rect = root.getBoundingClientRect();

      let tx = state.x;
      let ty = state.y;
      let target = 0;

      if (focus && root.contains(focus)) {
        const box = focus.getBoundingClientRect();
        tx = box.left + box.width / 2 - rect.left;
        ty = box.top + box.height / 2 - rect.top;
        target = 1;
      } else if (pointer.active) {
        tx = pointer.x - rect.left;
        ty = pointer.y - rect.top;
        target = 1;
      }

      if (state.presence < 0.02 && target > 0) {
        state.x = tx;
        state.y = ty;
      }

      const follow = reduce || s.smoothing === 0 ? 1 : 1 - Math.exp(-dt / (0.015 + s.smoothing * 0.22));
      state.x += (tx - state.x) * follow;
      state.y += (ty - state.y) * follow;

      const fade = reduce ? 1 : 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.32));
      state.presence += (target - state.presence) * fade;
      if (Math.abs(target - state.presence) < 0.002) state.presence = target;

      const press = state.pressed && !reduce ? 1 : 0;
      state.flare += (press - state.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.28)));
      if (Math.abs(press - state.flare) < 0.002) state.flare = press;

      paint(s);

      const moving = Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1;
      const settled = !moving && state.presence === target && state.flare === press;

      if (!settled && (target > 0 || state.presence > 0)) {
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      wake();
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      wake();
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer.active = false;
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      state.pressed = true;
      wake();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      state.pressed = false;
      wake();
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
      focus = event.target;
      wake();
    };

    const onFocusOut = (event: FocusEvent) => {
      if (root.contains(event.relatedTarget as Node | null)) return;
      focus = null;
      wake();
    };

    root.addEventListener('pointerenter', onPointerEnter);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerleave', onPointerLeave);
    root.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      root.removeEventListener('pointerenter', onPointerEnter);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
      root.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      wakeRef.current = null;
    };
  }, []);

  const sharedStyle: React.CSSProperties = {
    ...(staticBorderColor ? { '--spotlight-card-border': staticBorderColor } : {}),
    ...style,
  };

  const sharedInner = (
    <>
      <span ref={lightRef} className="spotlight-card__light" aria-hidden="true" />
      {grain > 0 && (
        <span ref={grainRef} className="spotlight-card__grain" style={{ backgroundImage: NOISE }} aria-hidden="true" />
      )}
      {children}
      <span className="spotlight-card__border" aria-hidden="true" />
      <span ref={edgeRef} className="spotlight-card__edge" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <Link
        ref={rootRef as unknown as React.Ref<HTMLAnchorElement>}
        href={href}
        className={`spotlight-card ${className}`.trim()}
        style={sharedStyle}
        target={target}
        rel={rel}
        {...rest}
      >
        {sharedInner}
      </Link>
    );
  }

  const Tag = as;
  return (
    <Tag
      ref={rootRef as unknown as React.Ref<HTMLDivElement>}
      className={`spotlight-card ${className}`.trim()}
      style={sharedStyle}
      {...rest}
    >
      {sharedInner}
    </Tag>
  );
}

export default SpotlightCard;
