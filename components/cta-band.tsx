import { ButtonLink, Container } from "./ui";

type CtaBandProps = { title: string; body?: string; label: string; href: string };

/** Closing call to action shared by the inner pages. */
export function CtaBand({ title, body, label, href }: CtaBandProps) {
  return (
    <section className="bg-teal-900 py-16 md:py-20" aria-labelledby="cta-h">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h2 id="cta-h" className="font-serif text-display-l text-white [overflow-wrap:break-word]">
            {title}
          </h2>
          {body && <p className="mt-3 text-lead text-peach-100">{body}</p>}
        </div>
        <ButtonLink href={href}>{label}</ButtonLink>
      </Container>
    </section>
  );
}
