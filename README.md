<div align="center">

<img src="public/media/logo-iyouth.webp" alt="iYouth" width="220" />

# dipeshmishra.in

Bilingual website for **Dipesh Mishra**, founder and CEO of iYouth Pvt. Ltd. and founder of the Chhattisgarh Youth Federation and the Chhattisgarh Adventure Sports Association.

[Live site](https://dipeshmishra.in) · [English](https://dipeshmishra.in/en) · [हिन्दी](https://dipeshmishra.in/hi)

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

</div>

## Overview

The site presents Dipesh Mishra's work with young people in Chhattisgarh and the iYouth ecosystem: the institutions he founded, the iYouth Store retail model, his services, a timeline from 2012 to Vision 2030, and a contact form. Every page exists in English and Hindi.

There is no database or CMS. Content is typed and lives in the repository, so a missing Hindi string fails the type check.

## Features

- **Two languages**: routes under `/en` and `/hi`, with language detection on first visit and hreflang alternates for search engines.
- **Pages**: home, about, ventures, iYouth Store, services, journey, media and contact, plus a localized 404.
- **iYouth Store brochure**: a 3D page-turning book on desktop and a PDF download prompt on phones.
- **Contact form**: validated on the server, protected by a honeypot and a rate limit, delivered through [Resend](https://resend.com).
- **Search and sharing**: `sitemap.xml`, `robots.txt`, canonical and Open Graph tags, and JSON-LD for the person and the three institutions.
- **Motion with restraint**: Anime.js (WAAPI build) for entrances, CSS for the marquee and micro-interactions; everything respects `prefers-reduced-motion`.
- **Light on the wire**: about 150 KB of first-load JavaScript (gzip) per page.

## Getting started

**Prerequisites**: Node.js 22 or newer and [pnpm](https://pnpm.io).

```bash
git clone https://github.com/iyouth-official/dipeshmishra.in.git
cd dipeshmishra.in
pnpm install
cp .env.example .env.local
pnpm dev
```

The site runs at <http://localhost:3000>. Without `RESEND_API_KEY` the contact form logs messages to the terminal instead of sending them.

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Generate route types and run `tsc --noEmit` |

## Configuration

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sending key for the contact form |
| `CONTACT_TO` | Inbox that receives messages (defaults to the address in `lib/facts.ts`) |
| `CONTACT_FROM` | Verified sender, for example `Website <noreply@dipeshmishra.in>` |
| `NEXT_PUBLIC_SITE_URL` | Public origin used for canonical links, the sitemap and social previews |

> [!WARNING]
> Keep real values in `.env.local` or the hosting panel. `.env*` files are git-ignored except `.env.example`.

## Project structure

```text
app/
  [locale]/        pages, layout and 404 for /en and /hi
  actions/         contact form server action
  sitemap.ts       robots.ts
components/        UI components
content/           page copy, one typed module per page (EN and HI together)
lib/               facts, SEO helpers, validation, rate limit
messages/          shared interface strings (en.json, hi.json)
public/media/      photos, logos, brochure PDF and page images
scripts/           optional image and bundle-size helpers
```

## Editing content

| To change | Edit |
|---|---|
| Wording on a page | its file in `content/`, in both languages |
| A number, phone, email or social link | `lib/facts.ts` |
| Navigation and shared labels | `messages/en.json` and `messages/hi.json` |
| The store brochure | replace the PDF in `public/media/brochure/`, then run `python scripts/make_brochure.py "<path to pdf>"` |
| Site icons | `node scripts/make_favicon.mjs "<path to logo>"` rewrites `app/icon.png`, `app/apple-icon.png` and `app/favicon.ico` |

## Deployment

The site is hosted on Hostinger as a Node.js application deployed from this repository.

1. Install with `pnpm install`, build with `pnpm build`, start with `pnpm start`, on Node 22.
2. Set the environment variables above in the hosting panel.
3. After the first deploy, send one test message through the contact form to confirm delivery.

## Tech stack

[Next.js 16](https://nextjs.org) (App Router) · [React 19](https://react.dev) · TypeScript · [Tailwind CSS v4](https://tailwindcss.com) · [Anime.js 4](https://animejs.com) · [GSAP](https://gsap.com) (menu and ribbon only, loaded lazily) · [Zod](https://zod.dev) · [Resend](https://resend.com)
