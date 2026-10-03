/** quote-relay Cloudflare Worker endpoint that receives calculator quote submissions. */
export const QUOTE_RELAY_ENDPOINT =
  'https://quote-relay.paulsunny.workers.dev/quote/paulsunnydev'

export type TechStackItem = {
  label: string
  value: string
}
/** Tech Stack content. Not currently rendered anywhere; kept accurate for when it is. */
export const techStack: TechStackItem[] = [
  {
    label: 'This site',
    value: 'React 19 + Vite with a custom prerender, deployed to GitHub Pages via GitHub Actions',
  },
  {
    label: 'Client sites',
    value: 'Astro 5 on Cloudflare Pages',
  },
  {
    label: 'Backend',
    value: 'Cloudflare Workers + D1 (zero-cost serverless)',
  },
  {
    label: 'Automation',
    value: 'n8n (self-hosted via Docker), webhooks, REST APIs',
  },
  {
    label: 'CRM',
    value: 'GoHighLevel — inbound webhook trigger only (cheap sub-account, no REST API access)',
  },
  {
    label: 'Notifications',
    value: 'Telegram bots',
  },
  {
    label: 'Languages',
    value: 'TypeScript, JavaScript, Python, PowerShell',
  },
]

/**
 * Hero headline animation. Edit this ONE word to switch the homepage hero
 * effect — 'logo-draw' (the logo mark draws itself once above the H1),
 * 'wall-wash' (contained grime canvas on the H1) or 'splash' (water jets
 * in a header-height strip at the top of the hero). Engines live in
 * src/lib/; nothing else needs to change.
 */
export const HERO_ANIMATION: 'logo-draw' | 'wall-wash' | 'splash' = 'logo-draw'

export type LatestBuild = {
  eyebrow: string
  name: string
  pitch: string
  /** Small grey honesty pill: the demo-business disclaimer. Non-negotiable. */
  honestyPill: string
  proofChips: string[]
  liveUrl: string
  screenshot: {
    src: string
    alt: string
    /** Address shown in the browser-frame chrome bar. */
    barUrl: string
    /** Natural pixel size: set to the real screenshot dimensions. */
    width: number
    height: number
  }
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

/**
 * "Latest Build" showcase (homepage section below the Hero). To feature the
 * next build: update this object, drop its full-page screenshot at
 * public/images/builds/<slug>.jpg, and set the width/height to the real
 * pixel size. No component changes needed.
 */
export const latestBuild: LatestBuild = {
  eyebrow: 'Featured build: spec demo',
  name: 'Sydney Jet Wash',
  pitch: 'A Sydney pressure washing site with an instant-quote calculator built in. Customers price their own job in under a minute, and the enquiry lands as a follow-up-ready lead instead of a missed call.',
  honestyPill: 'Spec demo · not a paying client · same stack I deploy for clients',
  proofChips: [
    'Instant quote calculator',
    'Follow-up that books the job',
    'Review requests on autopilot',
    '$0 hosting',
  ],
  liveUrl: 'https://sydney-jet-wash.pages.dev',
  screenshot: {
    src: '/images/builds/sydney-jet-wash.jpg',
    alt: 'Full-page screenshot of the Sydney Jet Wash demo website',
    barUrl: 'sydney-jet-wash.pages.dev',
    width: 1440,
    height: 9241,
  },
  primaryCta: { label: 'View Live Demo', href: 'https://sydney-jet-wash.pages.dev' },
  secondaryCta: { label: 'Get Yours', href: '/#calculator' },
}

export type DemoFleetItem = {
  name: string
  /** One-line niche label, e.g. "Trade services — pressure washing". */
  niche: string
  liveUrl: string
  screenshot: {
    src: string
    alt: string
    barUrl: string
    width: number
    height: number
  }
}

/**
 * Demo fleet row under the Latest Build section. Every card carries the
 * "Demo build — fictional business" pill; that label is non-negotiable.
 * Thumbnails are viewport screenshots (not full-page) at public/images/builds/.
 */
export const demoFleet: DemoFleetItem[] = [
  {
    name: 'Sydney Jet Wash',
    niche: 'Trade services — pressure washing',
    liveUrl: 'https://sydney-jet-wash.pages.dev',
    screenshot: {
      src: '/images/builds/sydney-jet-wash-thumb.jpg',
      alt: 'Screenshot of the Sydney Jet Wash demo website',
      barUrl: 'sydney-jet-wash.pages.dev',
      width: 1440,
      height: 960,
    },
  },
  {
    name: 'Gawler Place Dental',
    niche: 'Appointments — dental practice',
    liveUrl: 'https://gawler-dental-demo.pages.dev',
    screenshot: {
      src: '/images/builds/gawler-place-dental-thumb.jpg',
      alt: 'Screenshot of the Gawler Place Dental demo website',
      barUrl: 'gawler-dental-demo.pages.dev',
      width: 1440,
      height: 960,
    },
  },
]
