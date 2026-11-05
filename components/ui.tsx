import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRightIcon, LearnChevron } from "./icons";
import Magnet from "./magnet";
import { Tactile } from "./tactile";

type Variant = "primary" | "dark" | "outline" | "light";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-saffron-700 text-white hover:bg-saffron-800 active:bg-saffron-800",
  dark: "bg-teal-900 text-white hover:bg-teal-700 active:bg-teal-700",
  outline: "border-2 border-ink-900 bg-white text-ink-900 hover:bg-ink-900 hover:text-white",
  light: "bg-white text-ink-900 hover:bg-peach-50",
};

// Fixed plate each keycap button sits on, one per non-primary variant.
const PLATES: Record<Exclude<Variant, "primary">, string> = {
  dark: "#06262c",
  outline: "var(--color-ink-900)",
  light: "color-mix(in srgb, var(--color-saffron-700) 30%, var(--color-peach-100))",
};

const BASE =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-[background-color,color,transform] duration-[var(--duration-quick)] active:scale-[0.98] aria-disabled:pointer-events-none aria-disabled:opacity-50";

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; external?: boolean };

/** Every call-to-action on the site is a link; there are no fake buttons. */
export function ButtonLink({ variant = "primary", external, className = "", children, ...rest }: ButtonLinkProps) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const link = (
    <Link {...rest} {...ext} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
      {external && <ArrowUpRightIcon size={16} className="transition-transform duration-[var(--duration-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </Link>
  );
  // Saffron buttons lean toward the pointer (Magnet ignores touch and reduced-motion users); the rest press like a keycap.
  return variant === "primary" ? <MagnetButton>{link}</MagnetButton> : <Tactile plate={PLATES[variant]}>{link}</Tactile>;
}

export function MagnetButton({ children, wrapperClassName }: { children: ReactNode; wrapperClassName?: string }) {
  return (
    <Magnet padding={60} magnetStrength={4} maxOffset={10} wrapperClassName={wrapperClassName}>
      {children}
    </Magnet>
  );
}

/** Text link with a chevron that opens into an arrow on hover. */
export function MoreLink({ className = "", children, ...rest }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      className={`t-learn inline-flex min-h-11 items-center gap-1.5 font-semibold text-saffron-700 underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <LearnChevron />
    </Link>
  );
}

/** Saffron circle holding an arrow; sits beside text, never glued into it. */
export function ArrowChip({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-saffron-700 text-white ${className}`}
    >
      <ArrowUpRightIcon size={16} />
    </span>
  );
}

type SectionHeadProps = {
  kicker?: string;
  title: ReactNode;
  note?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
};

/** narendramodi.in pattern: a kicker, a large serif statement, an optional side note on a saffron rule. */
export function SectionHead({ kicker, title, note, tone = "light", as: Tag = "h2", id }: SectionHeadProps) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
      <div className="min-w-0">
        {kicker && (
          <p className={`text-kicker font-bold ${dark ? "text-peach-100" : "text-saffron-700"}`}>{kicker}</p>
        )}
        <Tag
          id={id}
          className={`mt-2 font-serif text-display-l [overflow-wrap:break-word] ${dark ? "text-white" : "text-ink-900"}`}
        >
          {title}
        </Tag>
      </div>
      {note && (
        <p className={`border-l-4 border-saffron-500 pl-5 text-lead font-semibold ${dark ? "text-white" : "text-ink-700"}`}>
          {note}
        </p>
      )}
    </div>
  );
}

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8 ${className}`}>{children}</div>;
}
