# paulsunnyisogon-website

Source for [paulsunnydev.com](https://paulsunnydev.com), the portfolio of Paul Sunny Isogon Jr: websites, AI chat assistants and GoHighLevel automation for service businesses in Australia, the US and the UK.

## Stack

- **Site:** React 19 + TypeScript, built with Vite 7 and styled with Tailwind CSS 3.
- **Prerender:** `scripts/prerender.mjs` server-renders the `/` route into `dist/index.html` after the Vite build, so crawlers get the full content without running JavaScript. No SSR framework, just `react-dom/server` through a one-off Vite SSR bundle.
- **Guides:** plain static HTML pages in `public/guides/`, copied into `dist/` as-is.
- **Chat widget:** `public/chat.js`, a standalone script that talks to the chat Worker.
- **Leads:** quote-calculator submissions go to the `quote-relay` Cloudflare Worker (Workers + D1, separate repo), which forwards them to GoHighLevel and Telegram. The endpoint is set in `src/site.config.ts`.
- **Hosting:** GitHub Pages, deployed by GitHub Actions. Custom domain comes from `public/CNAME`.

Client sites I build are a separate stack (Astro 5 on Cloudflare Pages) and don't live in this repo.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload. |
| `npm run build` | Type-checks (`tsc -b`) and builds to `dist/`. The `postbuild` hook then runs `scripts/prerender.mjs` (injects server-rendered homepage HTML) and `scripts/build.mjs` (generates `dist/sitemap.xml` with lastmod dates taken from git). |
| `npm run verify` | Checks the built `dist/guides/pressure-cleaning-website-design.html` for SEO tags, schema, structure, internal links and sitemap inclusion. Run it after `build`. |
| `npm run preview` | Serves `dist/` locally on port 4173. |
| `npm run lint` | ESLint. |

`node scripts/render-check.mjs` (needs `npm run preview` running) uses Playwright to render the homepage at 360, 768 and 1440 px and check the Latest Build section.

## Folder map

```
src/
  main.tsx, App.tsx        client entry
  entry-server.tsx         SSR entry used by the prerender
  pages/Home.tsx           the homepage, composed from sections
  sections/                one file per homepage section (Hero, LatestBuild, case studies, FAQ, Footer...)
  components/              shared bits (links, labels, icons)
  lib/                     hero animations, video modal, tech icons
  site.config.ts           endpoints, Latest Build content, demo honesty pill, hero animation switch
  assets/                  images/PDFs imported by components (hashed by Vite)
public/
  guides/                  static SEO guides (don't rename these URLs)
  images/                  images referenced by plain URL
  chat.js                  chat widget
  CNAME, robots.txt, 404.html, booked.html
scripts/                   prerender, sitemap, verify, render-check, screenshot capture
animation/                 standalone prototypes of the hero animations
.github/workflows/         GitHub Pages deploy
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci`, `npm run build` and `npm run verify`, then publishes `dist/` to GitHub Pages. If `verify` fails, nothing is deployed.
