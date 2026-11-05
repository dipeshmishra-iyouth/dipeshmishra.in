import { notFoundContent } from "@/content/not-found";
import { PageMotion } from "@/components/page-motion";
import { ButtonLink, Container } from "@/components/ui";
import { getLocale } from "./dictionaries";

export default async function NotFound() {
  const locale = await getLocale();
  const copy = notFoundContent[locale];
  return (
    <section className="bg-peach-50 py-20 md:py-28" aria-labelledby="not-found-h">
      <PageMotion />
      <Container className="flex flex-col items-center gap-6 text-center">
        <p data-enter aria-hidden="true" className="font-serif text-[clamp(4.5rem,3rem+8vw,6rem)] leading-none text-saffron-500">
          4
          <span className="ring-breathe mx-[0.04em] inline-block size-[0.72em] rounded-full border-[0.12em] border-saffron-500 align-[-0.03em]" />4
        </p>
        <h1 id="not-found-h" data-enter className="font-serif text-display-l">
          {copy.title}
        </h1>
        <p data-enter className="max-w-xl text-lead">
          {copy.body}
        </p>
        <div data-enter className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={`/${locale}`}>{copy.home}</ButtonLink>
          <ButtonLink href={`/${locale}/contact`} variant="outline">
            {copy.contact}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
