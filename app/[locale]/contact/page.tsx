import { Suspense } from "react";
import { contactContent } from "@/content/contact";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { MailIcon, MapPinIcon, MessageIcon, PhoneIcon } from "@/components/icons";
import { PageMotion } from "@/components/page-motion";
import { Container, SectionHead } from "@/components/ui";
import { isTopic } from "@/lib/contact-topics";
import { facts } from "@/lib/facts";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary, getLocale } from "../dictionaries";

export async function generateMetadata() {
  const locale = await getLocale();
  const { title, description } = contactContent[locale].meta;
  return pageMetadata(locale, "contact", title, description);
}

/** Reads ?topic= at request time, so only this form streams in; the rest of the page stays static. */
async function TopicForm({ searchParams, copy }: { searchParams: Promise<{ topic?: string | string[] }>; copy: Parameters<typeof ContactForm>[0]["copy"] }) {
  const { topic } = await searchParams;
  return <ContactForm copy={copy} initialTopic={isTopic(topic) ? topic : "partnership"} />;
}

export default async function ContactPage({ searchParams }: PageProps<"/[locale]/contact">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const copy = contactContent[locale];
  const formCopy = { form: copy.form, errors: copy.errors, success: copy.success };
  const row = "flex items-start gap-3";
  const icon = "mt-1 shrink-0 text-saffron-700";
  return (
    <section className="py-14 md:py-20" aria-label={copy.hero.kicker}>
      <PageMotion />
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div className="min-w-0 space-y-8">
          <div data-enter>
            <SectionHead as="h1" kicker={copy.hero.kicker} title={copy.hero.title} />
          </div>
          <p data-enter className="border-l-4 border-saffron-500 pl-5 text-lead font-semibold text-ink-700">
            {copy.hero.note}
          </p>
          <ul data-stagger className="space-y-4">
            <li className={row}>
              <MailIcon className={icon} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">{copy.details.email}</p>
                <CopyEmail email={facts.email} copyLabel={dict.a11y.copy} copiedLabel={dict.a11y.copied} />
              </div>
            </li>
            <li className={row}>
              <PhoneIcon className={icon} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">{copy.details.phone}</p>
                <a href={`tel:${facts.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center font-semibold text-ink-900 hover:text-saffron-700">
                  {facts.phone}
                </a>
              </div>
            </li>
            <li className={row}>
              <MessageIcon className={icon} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">{copy.details.whatsapp}</p>
                <a
                  href={`https://wa.me/${facts.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.details.whatsapp}, ${dict.a11y.external}`}
                  className="inline-flex min-h-11 items-center font-semibold text-ink-900 hover:text-saffron-700"
                >
                  {facts.phone}
                </a>
              </div>
            </li>
            <li className={row}>
              <MapPinIcon className={icon} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide">{copy.details.address}</p>
                <p className="font-semibold text-ink-900">{dict.footer.location}</p>
              </div>
            </li>
          </ul>
        </div>
        <Suspense fallback={<ContactForm copy={formCopy} initialTopic="partnership" />}>
          <TopicForm searchParams={searchParams} copy={formCopy} />
        </Suspense>
      </Container>
    </section>
  );
}
