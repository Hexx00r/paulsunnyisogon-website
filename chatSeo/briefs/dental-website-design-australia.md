# Brief: dental website design Australia

Date: 2026-10-10 · Audience: dental practice owners and managers in Australia

> **Method caveat (read first).** ChatSEO returned `forbidden: free MCP prompt limit reached`
> on `list_sites` and `get_gsc_sites`, so steps 1–3 of the page-brief skill could not run:
> no ChatSEO top-10 read, no GSC clicks/impressions check. This brief is built from my own web
> searches (result titles and snippets), one competitor page read (Five by Five) and the repo.
> **The create/optimise decision is UNVERIFIED.** Re-run through ChatSEO once credits are back
> and compare. No keyword volumes are given because none were returned.

## Decision
**Create** a new guide at `/guides/dental-website-design-australia.html` (UNVERIFIED: no GSC data).

Why: no dental page exists in `public/`, `src/` or `docs/` outside the homepage demo-fleet card
(Gawler Place Dental), which is a thumbnail, not a page that can rank for this term.

**Realism warning.** The SERP I saw for this keyword is Australian dental-marketing agencies'
service and portfolio pages (Five by Five, WP Creative, PSM Digital, Creative Baguette, Dental
Focus). paulsunnydev.com is a small site, so ranking on the head term is a long shot. The
guide's edge is the combination those pages lack: an owner-readable AHPRA-aware checklist plus
a working demo to look at. Treat the secondary keywords below as the likelier early wins.

Page type: guide with a service angle, same pattern as the pressure-washing guides.

## Keywords
- **Primary:** dental website design Australia
- **Secondary (use naturally, once each in an H2 or body copy):**
  - dental practice website
  - AHPRA compliant dental website (as "AHPRA advertising rules")
  - dental website online booking
  - what should a dental website include

## Required sections
From the competitor page I read (Five by Five, "best dental clinic website designs") and the
snippets of the others:
1. Short answer (keyword in first 100 words)
2. Clear booking calls to action: phone, online request, urgent/pain pathway
3. Treatment pages, one per service (SEO and clarity)
4. Mobile layout and speed
5. Easy navigation and clean structure
6. Trust elements, **handled the AHPRA way**: registration details and qualifications are fine;
   patient testimonials are not allowed in advertising; before/after images have rules; no
   unsubstantiated "best" or "leading" claims; don't imply specialist status without
   endorsement. This is the section competitors treat as a bullet and the one owners fear.
7. Online booking / practice-software integration (HealthEngine, Cliniko-style tools; mention
   generically, don't claim integrations I haven't built)
8. FAQ (with FAQPage schema)

**The extra element the others lack:** a working demo build plus a real screenshot, in a
"See it working" block: Gawler Place Dental, https://gawler-dental-demo.pages.dev, labelled
exactly **"Demo build — fictional business"**. Never presented as a real client or real practice.

## Title
`Dental Website Design Australia: What Practices Need` (52 chars)

## Meta description
`Dental website design in Australia: what a practice site needs to take bookings, the AHPRA advertising rules to check, and a demo build you can explore.` (152 chars)

## Notes
- **AHPRA wording must be careful.** Say: advertising rules apply to the practice even when an
  agency builds the site; testimonials are not allowed in advertising; before/after images and
  claims have rules. Say "general information, not legal advice" and link to the AHPRA
  advertising hub (https://www.ahpra.gov.au/Resources/Advertising-hub.aspx, returns 200) and the
  Dental Board's codes and guidelines. **Don't quote penalty amounts**: my sources disagreed.
- **Don't present the demo as compliant.** The Gawler demo has a before/after gallery, and its
  team cards say "AHPRA reg. pending, placeholder". The guide must say the demo is a design
  showcase that has not been compliance-reviewed, and the practice is responsible for its own
  advertising.
- **No patient photos on paulsunnydev.com.** The capture script blurs before/after sections.
  Only the existing hero thumbnail (`gawler-place-dental-thumb.jpg`, no before/after content)
  is used.
- No invented stats, testimonials, results, prices or client names. Demo prices
  ($199 Check & Clean, DentiCare terms) are fictional and are **not** quoted. No dental price
  from Paul has been supplied: the guide sends cost questions to the audit call.
- No claim of dental client experience or of integrating with a named practice-management
  system. Paul's real background is pressure cleaning (family business, Albury–Wodonga).
- Demo stays noindex (meta robots confirmed). Don't touch the demo repo.
- Internal links: `pressure-cleaning-website-design.html` (same system, other trade),
  `what-should-a-pressure-washing-website-include.html` (checklist pattern),
  `missed-call-text-back-for-tradies.html`, `gohighlevel-pricing-australia.html`.
  Inbound links from `guides/index.html` and one existing page.
- Spam Act: if the guide mentions appointment reminders by SMS, keep it generic and point to
  the missed-call guide's Spam Act section rather than restating it.
- Slug: `dental-website-design-australia` (4 words).
