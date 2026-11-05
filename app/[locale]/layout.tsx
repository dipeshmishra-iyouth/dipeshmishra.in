import type { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { getDictionary, getLocale } from "./dictionaries";
import { fontVariables } from "./fonts";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  // Home-page defaults; every inner page overrides them through pageMetadata.
  return {
    ...pageMetadata(locale, "", dict.meta.title, dict.meta.description),
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s · ${dict.meta.siteName}` },
    other: { "geo.region": "IN-CT", "geo.placename": "Raipur, Chhattisgarh" },
  };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-white font-sans">
        <div className="scroll-progress" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.a11y.skip}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <WhatsAppFab label={dict.a11y.whatsapp} />
      </body>
    </html>
  );
}
