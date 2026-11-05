import Link from "next/link";
import type { ReactNode } from "react";
import type { PlatformStatus } from "@/lib/facts";
import { ArrowChip } from "./ui";
import { ArrowUpRightIcon, LearnChevron } from "./icons";
import { SpotlightCard } from "./SpotlightCard";
import { Tactile } from "./tactile";

const CARD = "rounded-[var(--radius-card)] p-6 md:p-7";

type HashtagCardProps = { title: string; body: string; href: string; more: string; mark?: ReactNode };

/** Peach card from the "Global Footprints" pattern: #title, two lines, a read-more pill. */
export function HashtagCard({ title, body, href, more, mark }: HashtagCardProps) {
  return (
    <SpotlightCard
      as="article"
      spotlightColor="var(--color-saffron-700)"
      staticBorderColor="color-mix(in srgb, var(--color-saffron-700) 12%, transparent)"
      intensity={0.12}
      className={`${CARD} flex flex-col gap-4 bg-peach-50`}
    >
      <div className="flex items-center gap-3">
        {mark}
        <h3 className="min-w-0 text-lg font-bold text-ink-900 [overflow-wrap:anywhere]">{title}</h3>
      </div>
      <p className="line-clamp-3">{body}</p>
      <Tactile plate="color-mix(in srgb, var(--color-saffron-700) 30%, var(--color-peach-100))" className="mt-auto w-fit">
        <Link
          href={href}
          className="t-learn inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink-900 hover:bg-saffron-700 hover:text-white"
        >
          {more}
          <LearnChevron />
        </Link>
      </Tactile>
    </SpotlightCard>
  );
}

type PlatformCardProps = { domain: string; body: string; status: PlatformStatus; statusLabel: string; externalLabel: string };

/** Live platforms link out; upcoming ones are plain text, never dead links. */
export function PlatformCard({ domain, body, status, statusLabel, externalLabel }: PlatformCardProps) {
  const live = status === "live";
  const chip = (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${live ? "bg-teal-700 text-white" : "bg-peach-100 text-ink-700"}`}
    >
      {live && <span aria-hidden="true" className="live-dot" />}
      {statusLabel}
    </span>
  );
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-lg font-bold text-ink-900 [overflow-wrap:anywhere]">{domain}</h3>
        {live && <ArrowUpRightIcon size={18} className="mt-1 shrink-0 text-saffron-700" />}
      </div>
      <p>{body}</p>
      {chip}
    </>
  );
  const cls = `${CARD} flex h-full flex-col gap-3 border border-line bg-white`;
  return live ? (
    <a
      href={`https://www.${domain}/`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${domain}, ${externalLabel}`}
      className={`${cls} transition-[border-color,transform] duration-[var(--duration-fast)] hover:-translate-y-1 hover:border-saffron-700`}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

type BentoTileProps = {
  label?: string;
  tone?: "peach" | "teal" | "saffron" | "white";
  href?: string;
  className?: string;
  children: ReactNode;
};

const TONES = {
  peach: "bg-peach-50 text-ink-700",
  teal: "bg-teal-50 text-ink-700",
  saffron: "bg-saffron-700 text-white",
  white: "bg-white text-ink-700",
};

const SPOTLIGHT_BY_TONE = {
  peach: {
    color: "var(--color-saffron-700)",
    border: "color-mix(in srgb, var(--color-saffron-700) 12%, transparent)",
    intensity: 0.12,
  },
  teal: {
    color: "var(--color-teal-700)",
    border: "color-mix(in srgb, var(--color-teal-700) 15%, transparent)",
    intensity: 0.12,
  },
  saffron: {
    color: "var(--color-peach-100)",
    border: "color-mix(in srgb, white 20%, transparent)",
    intensity: 0.14,
  },
  white: {
    color: "var(--color-saffron-700)",
    border: "var(--color-line)",
    intensity: 0.1,
  },
} as const;

/** Bento tile: a pill label, content, and an arrow chip when it links somewhere. */
export function BentoTile({ label, tone = "peach", href, className = "", children }: BentoTileProps) {
  const body = (
    <>
      {(label || href) && (
        <div className="flex items-center justify-between gap-3">
          {label ? (
            <span className="rounded-full bg-saffron-700 px-3 py-1 text-sm font-semibold text-white">{label}</span>
          ) : (
            <span />
          )}
          {href && <ArrowChip />}
        </div>
      )}
      {children}
    </>
  );
  const spot = SPOTLIGHT_BY_TONE[tone];
  const cls = `${CARD} relative isolate flex min-w-0 flex-col gap-4 overflow-hidden ${TONES[tone]} ${className}`;
  return href ? (
    <SpotlightCard
      href={href}
      spotlightColor={spot.color}
      staticBorderColor={spot.border}
      intensity={spot.intensity}
      className={`${cls} transition-transform duration-[var(--duration-fast)] hover:-translate-y-1`}
    >
      {body}
    </SpotlightCard>
  ) : (
    <SpotlightCard
      as="div"
      spotlightColor={spot.color}
      staticBorderColor={spot.border}
      intensity={spot.intensity}
      className={cls}
    >
      {body}
    </SpotlightCard>
  );
}
