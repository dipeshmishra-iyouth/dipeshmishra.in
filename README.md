# dipeshmishra.in

Bilingual (English and Hindi) site for Dipesh Mishra: founder and CEO of iYouth Pvt. Ltd., founder of the Chhattisgarh Youth Federation and the Chhattisgarh Adventure Sports Association.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. No database or CMS; content lives in the repository.

## Run it

Needs Node 22 or newer and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build && pnpm start
```

## Where things are

| Path | What it holds |
|---|---|
| `app/[locale]/` | Pages for `/en` and `/hi`, layout, 404, `sitemap.ts`, `robots.ts` |
| `app/actions/contact.ts` | Contact form server action (sends through Resend) |
| `content/` | Page copy, one typed module per page, English and Hindi side by side |
| `messages/` | Shared interface strings (`en.json`, `hi.json`) |
| `lib/facts.ts` | Numbers, dates, contact details and social links used across pages |
| `components/` | UI components |
| `public/media/` | Photos, logos and the store brochure (PDF and page images) |
| `scripts/` | Optional helpers that regenerate images and measure bundle size |

## Editing content

- Wording for a page: edit its file in `content/`, in both languages. TypeScript flags a missing Hindi field.
- A number, phone, email or social link: edit `lib/facts.ts`.
- Brochure: replace the PDF, then rebuild the page images with `python scripts/make_brochure.py "<path to pdf>"`.

## Environment

Copy `.env.example` to `.env.local` for local work. On the server set:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sending key for the contact form. Without it the form reports a failure in production. |
| `CONTACT_TO` | Inbox that receives messages (defaults to the address in `lib/facts.ts`) |
| `CONTACT_FROM` | Verified sender, for example `Website <noreply@send.dipeshmishra.in>` |
| `NEXT_PUBLIC_SITE_URL` | Public origin, used for canonical links, the sitemap and social previews |

## Deploy

Hostinger Node.js app from this repository: install `pnpm install`, build `pnpm build`, start `pnpm start`, Node 22. Set the variables above in the hosting panel; never commit them.
