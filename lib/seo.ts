import type { Locale } from "./i18n";
import { facts } from "./facts";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dipeshmishra.in").replace(/\/$/, "");

/** Locale codes for hreflang and Open Graph, targeted at India. */
export const HREFLANG: Record<Locale, string> = { en: "en-IN", hi: "hi-IN" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_IN", hi: "hi_IN" };

export const OG_IMAGE = { url: "/media/og.jpg", width: 1200, height: 630 };

/** Pages that exist per locale, for the sitemap and hreflang alternates. "" is the home page. */
export const PAGES = ["", "about", "ventures", "iyouth-store", "services", "journey", "media", "contact"] as const;

/** hreflang map for one page path, with x-default pointing at English. */
export function languageAlternates(path: string): Record<string, string> {
  const tail = path ? `/${path}` : "";
  return { [HREFLANG.en]: `/en${tail}`, [HREFLANG.hi]: `/hi${tail}`, "x-default": `/en${tail}` };
}

const abs = (path: string) => `${SITE_URL}${path}`;

// Founding years and the Kumhari headquarters are the confirmed facts; nothing here is estimated.
const ORGS = [
  { id: "iyouth", name: "iYouth Pvt. Ltd.", founded: "2026", logo: "/media/logo-iyouth.webp", url: "https://www.iyouth.in/", locality: "Kumhari, Durg" },
  { id: "cyf", name: "Chhattisgarh Youth Federation", founded: "2012", logo: "/media/logo-cyf.webp" },
  { id: "casa", name: "Chhattisgarh Adventure Sports Association", founded: "2012", logo: "/media/logo-casa.webp" },
] as const;

/** One JSON-LD graph: the site, Dipesh Mishra and the three institutions he founded. */
export function siteGraph(locale: Locale, description: string) {
  const personId = abs("/#person");
  const region = { "@type": "AdministrativeArea", name: "Chhattisgarh", containedInPlace: { "@type": "Country", name: "India" } };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: abs(`/${locale}`),
        name: "Dipesh Mishra",
        inLanguage: HREFLANG[locale],
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Dipesh Mishra",
        alternateName: "दीपेश मिश्रा",
        url: abs(`/${locale}`),
        image: abs("/media/dipesh-portrait.webp"),
        description,
        jobTitle: "Founder & CEO, iYouth Pvt. Ltd.",
        worksFor: { "@id": abs("/#org-iyouth") },
        address: { "@type": "PostalAddress", addressLocality: "Raipur", addressRegion: "Chhattisgarh", addressCountry: "IN" },
        areaServed: region,
        sameAs: Object.values(facts.social),
      },
      ...ORGS.map((org) => ({
        "@type": "Organization",
        "@id": abs(`/#org-${org.id}`),
        name: org.name,
        foundingDate: org.founded,
        logo: abs(org.logo),
        founder: { "@id": personId },
        areaServed: region,
        ...("url" in org ? { url: org.url } : {}),
        ...("locality" in org
          ? { address: { "@type": "PostalAddress", addressLocality: org.locality, addressRegion: "Chhattisgarh", addressCountry: "IN" } }
          : {}),
      })),
    ],
  };
}
