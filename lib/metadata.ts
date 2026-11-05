import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { OG_IMAGE, OG_LOCALE, languageAlternates } from "./seo";

/** Title, description, hreflang alternates and social preview for one page ("" is the home page). */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const tail = path ? `/${path}` : "";
  const social = path ? `${title} · Dipesh Mishra` : title;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${tail}`, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      title: social,
      description,
      url: `/${locale}${tail}`,
      siteName: "Dipesh Mishra",
      locale: OG_LOCALE[locale],
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: social, description, images: [OG_IMAGE.url] },
  };
}
