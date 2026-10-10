# SEO Process — paulsunnydev.com

Run every check on every new or rewritten page, before the diff gate.
Mark each one **PASS / FAIL / N/A** in the reply. Any FAIL blocks publishing until it's fixed or you accept it in writing.

Stack: Vite + React SPA with static HTML SEO pages in `public/` (guides in `public/guides/`), deployed to GitHub Pages from `main`. There are no per-branch preview deploys: preview locally with `npm run build && npx vite preview`.

## 1. URL
- [ ] Slug is lowercase, hyphenated, ≤5 words, and contains the primary keyword (e.g. `/ghl-setup-cleaning-business`)
- [ ] No dates, IDs or stop-words in the slug
- [ ] **Existing page:** slug unchanged. If it must change, a redirect stub is left at the old path in the same commit (GitHub Pages has no `_redirects`; use meta-refresh plus a canonical to the new URL)

## 2. Head tags
- [ ] Title from the brief: primary keyword near the front, ≤60 characters
- [ ] Meta description from the brief: ≤155 characters, ends with a reason to click
- [ ] Canonical tag points to the page's own absolute URL (https, no trailing-slash mismatch)
- [ ] No `noindex` on the page
- [ ] Open Graph title, description and image set (1200×630)

## 3. Content structure
- [ ] Exactly one H1, and it contains the primary keyword
- [ ] H2s cover every section the top 3 share (from the brief)
- [ ] Primary keyword appears in the first 100 words
- [ ] Each secondary keyword is used at least once, naturally, in an H2 or body copy
- [ ] The extra element the top 3 lack is present (quiz, calculator, photos, real numbers or video), or a TODO is clearly marked
- [ ] No fabricated stats, testimonials, client names or photos

## 4. Conversion
- [ ] Primary CTA (book a call or contact) visible above the fold on mobile
- [ ] CTA repeated at the end of the page
- [ ] Contact form or booking link tested on the preview URL

## 5. Internal links
- [ ] ≥3 links out to relevant existing pages (descriptive anchors, not "click here")
- [ ] ≥1 existing page updated to link to this one; list which ones
- [ ] No broken links (check on the preview)

## 6. Schema (JSON-LD)
- [ ] Service pages → `Service` + `Organization`
- [ ] Location pages → `LocalBusiness` (with areaServed)
- [ ] FAQ section → `FAQPage`
- [ ] Validated with Google's Rich Results Test on the preview URL

## 7. Images
- [ ] Every image has descriptive alt text (keyword only where it fits naturally)
- [ ] WebP or AVIF format, ≤200 KB each (optimise by hand before adding to `public/`)
- [ ] Width and height set (no layout shift)
- [ ] Below-the-fold images lazy-loaded; the hero image is not

## 8. Performance (Lighthouse on the local preview; PageSpeed Insights on the live URL after merge)
- [ ] PageSpeed Insights mobile score ≥90
- [ ] LCP <2.5s, CLS <0.1, INP <200ms
- [ ] No new third-party scripts unless the page needs them

## 9. Indexing (after publish)
- [ ] Run `npm run sitemap` (after `npm run build`; regenerates `dist/sitemap.xml` from the built HTML, with lastmod from git) and confirm the page's URL appears in it. The build also runs this automatically, so the sitemap deployed from `main` is always current. Pages with `noindex`, `404.html` and `booked.html` are excluded on purpose.
- [ ] Indexing requested in Google Search Console via URL Inspection
- [ ] Recheck rank and impressions in GSC after 14 days
