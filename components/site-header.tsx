import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { facts } from "@/lib/facts";
import { LangSwitch } from "./lang-switch";
import { HeaderChrome, type NavItem } from "./header-chrome";

const NAV: { key: keyof Dictionary["nav"]; path: string }[] = [
  { key: "about", path: "about" },
  { key: "ventures", path: "ventures" },
  { key: "store", path: "iyouth-store" },
  { key: "journey", path: "journey" },
  { key: "media", path: "media" },
  { key: "contact", path: "contact" },
];

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items: NavItem[] = NAV.map(({ key, path }) => ({ href: `/${locale}/${path}`, label: dict.nav[key] }));
  const partner = { href: `/${locale}/contact`, label: dict.nav.partner };
  return (
    <HeaderChrome
      items={items}
      partner={partner}
      socials={[
        { label: "Facebook", href: facts.social.facebook },
        { label: "Instagram", href: facts.social.instagram },
        { label: "X", href: facts.social.x },
        { label: "YouTube", href: facts.social.youtube },
      ]}
      labels={{ nav: dict.a11y.primaryNav, open: dict.a11y.openMenu, close: dict.a11y.closeMenu, socials: dict.footer.social }}
      brand={
        <Link href={`/${locale}`} className="font-serif text-xl text-ink-900">
          {dict.meta.siteName}
        </Link>
      }
      langSwitch={<LangSwitch locale={locale} label={dict.a11y.switchTo} />}
    />
  );
}
