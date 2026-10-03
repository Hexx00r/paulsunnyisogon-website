import { BOOKING, BOOKING_LABEL } from '@/components/Shared'

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
  secondaryCta: { label: string; href: string; cal?: boolean }
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
  secondaryCta: { label: BOOKING_LABEL, href: BOOKING, cal: true },
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

export type PricingPlan = {
  name: string
  tagline: string
  prefix?: string
  price: string
  unit: string
  wasPrice?: string
  priceNote?: string
  badge?: string
  popular?: boolean
  features: string[]
}

/** Pricing cards (AUD). Keep in sync with the Offer JSON-LD in index.html and the FAQ answer. */
export const pricing: PricingPlan[] = [
  {
    name: 'Quote-to-Job System',
    tagline: 'The full lead-to-booked-job build.',
    prefix: 'From',
    price: 'AUD $697',
    unit: 'one-time',
    wasPrice: 'AUD $1,200',
    badge: 'Founding client rate · first 5 clients',
    features: [
      'Instant-quote funnel with per-m² pricing',
      'GHL pipeline and CRM',
      'SMS and email follow-up sequences',
      'Booking calendar',
      'Review request automation',
    ],
  },
  {
    name: 'Care Plan',
    tagline: 'Keep it running while you stay on the tools.',
    price: 'AUD $147',
    unit: '/mo',
    popular: true,
    features: ['Hosting and updates', 'Monthly lead report', 'Missed-call text-back'],
  },
  {
    name: 'After-hours AI assistant',
    tagline: 'Add-on for the Quote-to-Job System.',
    price: '+AUD $297',
    unit: 'setup',
    priceNote: '+ AUD $49/mo',
    features: ['Qualifies leads 24/7', 'Emergency and priority routing'],
  },
]

export type CaseStat = {
  label: string
  /** null = number not supplied yet. The stat row stays hidden until every value is set. */
  value: string | null
}

/**
 * DJ Property & Cleaning stat row (Case study 01).
 * TODO: Paul to supply real numbers. Never invent these. The row renders only when
 * every value below is non-null, so no placeholder ever reaches production.
 */
export const djStats: CaseStat[] = [
  { label: 'Average enquiry response time', value: null }, // TODO: e.g. "under 1 minute"
  { label: 'Leads per month', value: null }, // TODO
  { label: 'Google reviews gained', value: null }, // TODO
]

/** Flip to true only once the testimonials below are client-approved, with name. */
export const SHOW_TESTIMONIALS = false

export type Testimonial = { quote: string; name: string; business: string }

/** TODO: replace both with client-approved text and names before enabling SHOW_TESTIMONIALS. */
export const testimonials: Testimonial[] = [
  {
    quote: 'TODO: client-approved testimonial text goes here.',
    name: 'TODO: Client name',
    business: 'TODO: Business, suburb',
  },
  {
    quote: 'TODO: client-approved testimonial text goes here.',
    name: 'TODO: Client name',
    business: 'TODO: Business, suburb',
  },
]
