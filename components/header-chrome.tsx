"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MenuIcon } from "./icons";
import type { MenuLink } from "./staggered-menu";
import { MagnetButton } from "./ui";

export type NavItem = { href: string; label: string };

type HeaderChromeProps = {
  items: NavItem[];
  partner: NavItem;
  socials: MenuLink[];
  labels: { nav: string; open: string; close: string; socials: string };
  brand: ReactNode;
  langSwitch: ReactNode;
};

// GSAP ships only in this chunk, fetched the first time the burger is touched.
const loadMenu = () => import("./staggered-menu");
const StaggeredMenu = dynamic(loadMenu, { ssr: false });

export function HeaderChrome({ items, partner, socials, labels, brand, langSwitch }: HeaderChromeProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, show on scroll up; always shown near the top.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    setMenuLoaded(true);
    setOpen(true);
  };
  const closeMenu = () => setOpen(false);

  const isCurrent = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header data-hidden={hidden && !open} className="site-header sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            ref={burger}
            type="button"
            onClick={openMenu}
            onPointerEnter={loadMenu}
            onFocus={loadMenu}
            aria-label={labels.open}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="-ml-2 inline-flex size-11 items-center justify-center rounded-full text-ink-900 hover:bg-peach-50 lg:hidden"
          >
            <MenuIcon />
          </button>
          {brand}
        </div>

        <nav aria-label={labels.nav} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[15px] font-medium text-ink-700">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="nav-link py-2 hover:text-saffron-700 aria-[current=page]:text-saffron-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {langSwitch}
          <MagnetButton wrapperClassName="hidden sm:inline-block">
            <Link
              href={partner.href}
              className="inline-flex min-h-11 items-center rounded-full bg-saffron-700 px-5 text-sm font-semibold text-white transition-colors duration-[var(--duration-quick)] hover:bg-saffron-800"
            >
              {partner.label}
            </Link>
          </MagnetButton>
        </div>
      </div>

      {menuLoaded && (
        <StaggeredMenu
          open={open}
          onClose={closeMenu}
          onClosed={() => burger.current?.focus()}
          items={items.map(({ href, label }) => ({ href, label }))}
          socials={socials}
          labels={{ nav: labels.nav, close: labels.close, socials: labels.socials }}
          footer={
            <>
              {langSwitch}
              <Link
                href={partner.href}
                onClick={closeMenu}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-saffron-700 px-5 text-sm font-semibold text-white hover:bg-saffron-800"
              >
                {partner.label}
              </Link>
            </>
          }
        />
      )}
    </header>
  );
}
