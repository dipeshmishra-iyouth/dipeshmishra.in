import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { facts } from "@/lib/facts";
import { CurrentYear } from "./current-year";
import { CopyEmail } from "./copy-email";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "./icons";

const SOCIAL = [
  { href: facts.social.facebook, name: "Facebook", Icon: FacebookIcon },
  { href: facts.social.instagram, name: "Instagram", Icon: InstagramIcon },
  { href: facts.social.x, name: "X", Icon: TwitterIcon },
  { href: facts.social.youtube, name: "YouTube", Icon: YoutubeIcon },
];

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const p = (path: string) => `/${locale}/${path}`;
  const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
      title: f.about,
      links: [
        { label: f.aboutDipesh, href: p("about") },
        { label: f.journey, href: p("journey") },
        { label: f.media, href: p("media") },
      ],
    },
    {
      title: f.ventures,
      links: [
        { label: f.iyouth, href: p("ventures#iyouth") },
        { label: f.cyf, href: p("ventures#cyf") },
        { label: f.casa, href: p("ventures#casa") },
        { label: f.store, href: p("iyouth-store") },
      ],
    },
    {
      title: f.involved,
      links: [
        { label: f.partner, href: p("contact") },
        { label: f.counselling, href: p("services") },
        { label: f.advisory, href: p("services") },
        { label: f.openStore, href: "https://www.iyouthstore.in/", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-peach-100 pb-24 pt-14 text-[15px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-bold text-ink-900">{col.title}</h2>
            <ul className="mt-3 space-y-1">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-11 items-center hover:text-saffron-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="font-bold text-ink-900">{f.connect}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <CopyEmail email={facts.email} copyLabel={dict.a11y.copy} copiedLabel={dict.a11y.copied} />
            </li>
            <li>
              <a href={`tel:${facts.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-saffron-700">
                {facts.phone}
              </a>
            </li>
            <li className="inline-flex min-h-11 items-center">{f.location}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col gap-6 border-t border-ink-900/10 px-4 pt-8 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <p lang="hi" className="font-serif text-xl text-ink-900">
          {dict.home.slogan}
        </p>
        <ul aria-label={f.social} className="flex gap-1">
          {SOCIAL.map(({ href, name, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex size-11 items-center justify-center rounded-full text-ink-700 hover:bg-white hover:text-saffron-700"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
        <p>
          © <CurrentYear /> {f.rights}
        </p>
      </div>
    </footer>
  );
}
