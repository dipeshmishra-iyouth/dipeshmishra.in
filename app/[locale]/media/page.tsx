import { homeContent } from "@/content/home";
import { mediaContent } from "@/content/media";
import { PageHero } from "@/components/page-hero";
import { PhotoGrid } from "@/components/photo-grid";
import { Tabs } from "@/components/tabs";
import { VideoFacade } from "@/components/video-facade";
import { Container } from "@/components/ui";
import { facts } from "@/lib/facts";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = mediaContent[locale].meta;
  return pageMetadata(locale, "media", title, description);
}

export default async function MediaPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = mediaContent[locale];
  const videoTitles = homeContent[locale].watch.videos;

  // A tab with nothing in it is left out, so visitors never see an empty state.
  const tabs = [
    {
      id: "photos",
      label: copy.tabs.photos,
      items: copy.photos.length,
      panel: <PhotoGrid photos={copy.photos} labels={copy.lightbox} />,
    },
    {
      id: "videos",
      label: copy.tabs.videos,
      items: facts.videos.length,
      panel: (
        <ul className="grid gap-6 md:grid-cols-3">
          {facts.videos.map((id, i) => (
            <li key={id}>
              <VideoFacade id={id} title={videoTitles[i]} playLabel={dict.a11y.play} />
              <p className="mt-3 font-semibold text-ink-900">{videoTitles[i]}</p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "documents",
      label: copy.tabs.documents,
      items: copy.documents.length,
      panel: <PhotoGrid photos={copy.documents} labels={copy.lightbox} />,
    },
  ]
    .filter((tab) => tab.items > 0)
    .map(({ id, label, panel }) => ({ id, label, panel }));

  return (
    <>
      <PageHero kicker={copy.hero.kicker} title={copy.hero.title} note={copy.hero.note} />
      <section className="py-16 md:py-24" aria-label={copy.hero.kicker}>
        <Container>
          <Tabs label={copy.tabsLabel} tabs={tabs} />
        </Container>
      </section>
    </>
  );
}
