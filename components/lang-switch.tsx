"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";

interface LangSwitchProps {
  locale: Locale;
  label: string;
}

export function LangSwitch({ locale, label }: LangSwitchProps) {
  const target: Locale = locale === "en" ? "hi" : "en";
  const href = switchLocalePath(usePathname() ?? `/${locale}`, target);
  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      // Remember the choice so "/" sends the visitor back to this language.
      onClick={() => {
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold text-ink-700 hover:border-saffron-700 hover:text-saffron-700"
    >
      {target === "hi" ? "हिं" : "EN"}
    </Link>
  );
}
