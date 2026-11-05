import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { PAGES, SITE_URL, languageAlternates } from "@/lib/seo";

const abs = (path: string) => `${SITE_URL}${path}`;

// Every public page in both languages, each entry listing its translations (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(page)).map(([lang, path]) => [lang, abs(path)]));
    return locales.map((locale) => ({
      url: abs(`/${locale}${page ? `/${page}` : ""}`),
      alternates: { languages },
      changeFrequency: page === "" ? ("monthly" as const) : ("yearly" as const),
      priority: page === "" ? 1 : page === "iyouth-store" || page === "contact" ? 0.8 : 0.6,
    }));
  });
}
