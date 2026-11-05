import { homeContent } from "@/content/home";
import { JsonLd } from "@/components/json-ld";
import { siteGraph } from "@/lib/seo";
import { Hero } from "@/components/home/hero";
import { Bento, Connect, Platforms, ProofStrip, StoreBand, Ventures, Vision, Watch } from "@/components/home/sections";
import { getDictionary, getLocale } from "./dictionaries";

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = homeContent[locale];
  return (
    <>
      <JsonLd data={siteGraph(locale, dict.meta.description)} />
      <Hero locale={locale} copy={copy.hero} name={dict.meta.siteName} />
      <ProofStrip items={copy.proof} />
      <Ventures locale={locale} copy={copy.ventures} />
      <StoreBand locale={locale} copy={copy.store} dict={dict} />
      <Bento locale={locale} copy={copy.bento} dict={dict} />
      <Platforms copy={copy.platforms} dict={dict} />
      <Watch copy={copy.watch} dict={dict} />
      <Vision locale={locale} copy={copy.vision} />
      <Connect locale={locale} copy={copy.connect} />
    </>
  );
}
