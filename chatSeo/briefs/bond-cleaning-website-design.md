# Brief: bond cleaning website design

Date: 2026-10-10 · Audience: bond / end-of-lease cleaning business owners, Brisbane and the Gold Coast

> **Method caveat (read first).** ChatSEO returned `forbidden: free MCP prompt limit reached`
> on `list_sites` and `get_gsc_sites`, so steps 1–3 of the page-brief skill could not run:
> no ChatSEO top-10 read, no GSC clicks/impressions check. This brief is built from my own web
> searches of the live SERP (result titles and snippets only, no volumes) plus the repo.
> **The create/optimise decision is UNVERIFIED.** Re-run through ChatSEO once credits are back
> and compare. No keyword volumes are given because none were returned.

## Decision
**Create** a new guide at `/guides/bond-cleaning-website-design.html` (UNVERIFIED: no GSC data).

Why: `grep` of `public/`, `src/` and `docs/` finds no existing bond/end-of-lease page. The
nearest page is `pressure-cleaning-website-design.html`, a different trade, so it's not an
optimise candidate. The SERP I could see for the keyword is directory profiles (Oneflare,
Bark, Issuu) and logo listings, with no dedicated "how to build a bond cleaning website"
guide, so a purpose-built guide has room.

Page type: guide with a service angle, same pattern as the pressure-washing guides.

## Keywords
- **Primary:** bond cleaning website design
- **Secondary (use naturally, once each in an H2 or body copy):**
  - end of lease cleaning website
  - bond cleaning quote calculator
  - bond cleaning leads Brisbane
  - bond back guarantee

## Required sections
From what the live bond-cleaning operators' pages and listings consistently show (search
snippets; I did not read each page in full):
1. Short answer / what a bond cleaning website has to do (keyword in first 100 words)
2. Fixed, size-based pricing and an instant quote (bedrooms/bathrooms/add-ons). Competitors use
   a static price grid or "message us for a quote"; none surfaced a live calculator.
3. Online booking form (address, bedrooms, bathrooms, services, dates, key handover)
4. The guarantee / re-clean policy, stated clearly (the main hook operators lead with)
5. Trust signals: insurance, police checks, years in business. **Only if true for that
   business**; the guide says to show what's real, it asserts nothing.
6. Proof of the clean: photo report / checklist the property manager can accept
7. Service areas / suburb coverage for Brisbane and the Gold Coast
8. FAQ (with FAQPage schema)

**The extra element the others lack:** a working demo build plus a real screenshot, in a
"See it working" block: BondProof Cleaning, https://bondproof-bond-demo.paulsunny.workers.dev,
labelled exactly **"Demo build — fictional business"**. Never presented as a real client.

## Title
`Bond Cleaning Website Design: Brisbane & Gold Coast` (51 chars)

## Meta description
`What a bond cleaning website needs to win end-of-lease jobs in Brisbane and the Gold Coast, plus a demo build you can click through before an audit call.` (153 chars)

## Notes
- **No invented numbers.** No prices, results, testimonials or lead counts. Paul has not
  given bond-cleaning prices; the page points to the audit call for scope and cost.
- The demo page cites RTA Queensland statistics ("21.5% of QLD bond claims are about
  cleaning", "42% of tenants did not get their full bond back"). They are unverified by me, so
  **do not repeat them** in the guide. Also the demo's guarantee shows a blank "-hour" value:
  describe the guarantee in general terms and don't quote a window.
- Demo prices are explicitly "examples" on the demo itself. Don't quote them.
- No claim of bond-cleaning client experience. Paul's real background is pressure cleaning
  (family business, Albury–Wodonga); the guide can say the same system is shown in the demo.
- Demo stays noindex; don't touch the demo repo. Screenshot captured with
  `node scripts/capture-build-shots.mjs bondproof` (real capture, not a mockup).
- Oneflare "closing 30 June 2026" appeared in a search snippet only. Not verified; omit.
- Internal links: `pressure-cleaning-website-design.html` (same system, other trade),
  `missed-call-text-back-for-tradies.html`, `gohighlevel-pricing-australia.html`,
  `/#calculator`. Add inbound links from `guides/index.html` and one existing page.
- Slug: `bond-cleaning-website-design` (4 words, no stop-words).
