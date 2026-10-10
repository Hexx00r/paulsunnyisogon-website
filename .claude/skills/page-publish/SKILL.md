---
name: page-publish
description: Write or update a paulsunnydev.com page from its brief and publish it safely. Use after page-brief, when asked to build, rewrite or publish a page.
---

Site: paulsunnydev.com (Vite + React SPA; SEO pages are static HTML files in `public/` and `public/guides/`; deployed to GitHub Pages from `main` via `.github/workflows/deploy.yml`).
Config:
- Page template: the closest existing static page of the same type in `public/` (a service page for a service keyword, a guide in `public/guides/` for a guide, and so on). Name the file you're using as the template before writing.
- SEO process file: `chatSeo/seo-process.md`. If it's missing, stop and ask for it.

0. Pre-flight
   - Read `chatSeo/briefs/<keyword-slug>.md`. If it doesn't exist, stop and run page-brief first.
   - Pick the template page and read it, then read `chatSeo/seo-process.md`.
   - If the brief says optimise, read the current version of that page and keep it as the old version for step 4.
1. Write or rewrite the page on the template:
   - Cover every section the top 3 share (from the brief).
   - Add one thing they don't have: a quiz, a calculator, photos, real numbers or a video.
   - Use only real assets and real numbers from the user or the site. If none exist, propose the element and leave a clearly marked TODO. Never fabricate stats, testimonials or photos.
2. On-page basics:
   - Exactly one H1, and it contains the primary keyword.
   - Title and meta description copied from the brief unchanged.
3. Run every check in `chatSeo/seo-process.md` sections 1–8 and report each as PASS / FAIL / N/A. Any FAIL blocks publishing until it's fixed or the user accepts it in writing.
4. DIFF GATE (before any publish):
   - Compare the new page with the old version (when optimising) or the template/reference page (when creating).
   - List every element present before and missing now: tables, rankings, forms, quizzes, embeds, images, internal links, schema, redirects or a changed URL slug.
   - Show the list. If it is not empty, the first line of the reply says: "DIFF GATE: N elements missing". If it is empty, say "DIFF GATE: clean".
5. Publish only after an explicit yes from the user, given in this conversation after the diff gate was shown.
   - Never commit straight to `main` (a push to `main` goes live on GitHub Pages). Commit to a git branch, run `npm run build && npm run verify`, then `npx vite preview` and share the local preview URL. Run the seo-process checks that need a live page (forms, links, schema, PageSpeed) on that preview. PageSpeed and the Rich Results Test need a public URL, so run them after the merge or mark N/A and say so.
   - A yes covers this page and this version only. Any edit after the yes needs a new diff gate and a new yes.
   - After the merge to main goes live, run `chatSeo/seo-process.md` section 9 (sitemap, GSC indexing request, 14-day recheck).
