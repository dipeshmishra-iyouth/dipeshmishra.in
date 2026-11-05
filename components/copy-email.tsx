"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

type CopyEmailProps = { email: string; copyLabel: string; copiedLabel: string };

/** Shows the address as a mailto link plus a copy button with a small toast. */
export function CopyEmail({ email, copyLabel, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return; // clipboard blocked: the mailto link beside it still works
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="relative inline-flex items-center gap-1">
      <a href={`mailto:${email}`} className="font-semibold text-ink-900 underline-offset-4 hover:text-saffron-700 hover:underline">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copyLabel}
        className="inline-flex size-11 items-center justify-center rounded-full text-ink-700 hover:bg-peach-50 hover:text-saffron-700"
      >
        {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
      </button>
      <span
        role="status"
        className={`t-toast pointer-events-none absolute -top-10 left-0 whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 text-sm text-white ${copied ? "is-open" : ""}`}
      >
        {copied ? copiedLabel : ""}
      </span>
    </span>
  );
}
