/** quote-relay Cloudflare Worker endpoint that receives calculator quote submissions. */
export const QUOTE_RELAY_ENDPOINT =
  'https://quote-relay.paulsunny.workers.dev/quote/paulsunnydev'

export type TechStackItem = {
  label: string
  value: string
}
/** Tech Stack section content (rendered in Hero). */
export const techStack: TechStackItem[] = [
  {
    label: 'Frontend',
    value: 'TypeScript static sites (no frameworks), deployed via GitHub Actions',
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
    value: 'JavaScript, Python, PowerShell',
  },
]

/**
 * Hero headline animation. Edit this ONE word to switch the homepage hero
 * effect — 'wall-wash' (contained grime canvas on the H1) or 'splash'
 * (water jets in a header-height strip at the top of the hero). Both
 * engines live in src/lib/; nothing else needs to change.
 */
export const HERO_ANIMATION: 'wall-wash' | 'splash' = 'wall-wash'

export type LatestBuild = {
  eyebrow: string
  name: string
  pitch: string
  /** Small grey honesty pill — the demo-business disclaimer. Non-negotiable. */
  honestyPill: string
  proofChips: string[]
  liveUrl: string
  repoUrl: string
  screenshot: {
    src: string
    alt: string
    /** Address shown in the browser-frame chrome bar. */
    barUrl: string
    /** Natural pixel size — set to the real screenshot dimensions. */
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
  eyebrow: 'Just shipped — demo build',
  name: 'Sydney Jet Wash',
  pitch: 'A complete pressure cleaning website — instant estimates, before/after slider, quote funnel — running on zero-cost Cloudflare infrastructure.',
  honestyPill: 'Fictional business · real system · same stack I deploy for clients',
  proofChips: [
    '30-second instant estimate',
    'Drag before/after slider',
    'Fixed-quote funnel',
    'Hand-coded · $0/month hosting',
  ],
  liveUrl: 'https://sydney-jet-wash.pages.dev',
  repoUrl: 'https://github.com/Hexx00r/website-business',
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
