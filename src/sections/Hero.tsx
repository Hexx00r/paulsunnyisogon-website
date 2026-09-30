import { useEffect, useRef, type ReactNode } from 'react'
import { MapPin } from 'lucide-react'
import { DEMO_CHAT_PREFILL, DEMO_MAILTO, YOUTUBE } from '@/components/Shared'
import { VideoModal } from '@/lib/video-modal'
import { initLogoDraw } from '@/lib/logo-draw'
import { HERO_ANIMATION } from '@/site.config'
import Reveal from '@/components/Reveal'

const LOGO_DRAW = HERO_ANIMATION === 'logo-draw'

/** Hero block wrapper. In 'logo-draw' mode it is a plain div with a CSS fade-up
 * (visible without JS, no IntersectionObserver); other modes keep Reveal. */
function HeroItem({
  delay,
  step,
  still = false,
  children,
}: {
  delay: number
  step: number
  /** No entrance animation (the H1: must paint on the first frame) */
  still?: boolean
  children: ReactNode
}) {
  if (!LOGO_DRAW) return <Reveal delay={delay}>{children}</Reveal>
  if (still) return <div>{children}</div>
  return (
    <div className="ld-up" style={{ animationDelay: `${150 + step * 60}ms` }}>
      {children}
    </div>
  )
}

const BUBBLE =
  'M14 10 H50 A8 8 0 0 1 58 18 V38 A8 8 0 0 1 50 46 H30 L18 55 V46 H14 A8 8 0 0 1 6 38 V18 A8 8 0 0 1 14 10 Z'

/** The mark, drawn in place. Sized explicitly so nothing shifts. */
function HeroMark() {
  return (
    <div className="relative mx-auto mt-8 h-[104px] w-[104px]" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="104" height="104" className="ld-glow absolute inset-0" fill="none">
        <circle cx="32" cy="28" r="7" fill="#00D4FF" />
      </svg>
      <svg viewBox="0 0 64 64" width="104" height="104" className="absolute inset-0" fill="none">
        <path
          className="ld-bubble ld-anim"
          d={BUBBLE}
          pathLength={1}
          stroke="#F5F5F7"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <polyline
          className="ld-br-l ld-anim"
          points="21,20 14,28 21,36"
          stroke="#F5F5F7"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          className="ld-br-r ld-anim"
          points="43,20 50,28 43,36"
          stroke="#F5F5F7"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="ld-sun ld-anim" cx="32" cy="28" r="7" fill="#00D4FF" />
      </svg>
    </div>
  )
}

// Modal video ID — derived from the YOUTUBE link in components/Shared.tsx so
// the no-JS fallback href and the modal player can never drift apart.
// (Change the video in one place: the YOUTUBE constant.)
const DEMO_VIDEO_ID = YOUTUBE.match(/youtu\.be\/([\w-]+)/)?.[1] ?? ''

// Both H1 branches below render this text; only one mounts per mode, so the
// page always has exactly one H1.
const HEADLINE = 'Websites and AI chatbots that turn enquiries into booked jobs'

// Proof strip: verifiable facts only. No invented stats, ratings or logos.
const PROOF = [
  'Melbourne High Pressure Cleaning: full rebrand + lead funnel',
  'DJ Property & Cleaning: complete GoHighLevel system, open-sourced',
  'quote-relay: leads to GHL + Telegram in real time, on the free tier',
]

export default function Hero() {
  // Enhance the "Watch the Demo" link client-side only: with JS, clicks open
  // the modal; without JS (or before hydration) the plain YouTube href in the
  // prerendered HTML still works. Instantiated once per homepage mount and
  // fully torn down on unmount — no double-instantiation across remounts,
  // and nothing here runs during the SSR/prerender pass.
  useEffect(() => {
    const modal = new VideoModal({
      videoId: DEMO_VIDEO_ID,
      triggerSelector: 'a[data-video-modal]',
      // Respect reduced motion: no autoplay for those users.
      autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
    return () => modal.destroy()
  }, [])

  // Hero headline animation, selected by the HERO_ANIMATION constant in
  // site.config.ts. Exactly one engine mounts:
  //   'wall-wash' — grime canvas contained to the H1 box (src/lib/wall-wash.ts)
  //   'splash'    — water jets in a header-height strip at the top of the hero
  //                 (src/lib/splash.ts, restored from git history)
  // Engines are dynamically imported per mode so the inactive one stays out
  // of the bundle. Reduced-motion users get neither: the canvas is hidden
  // and never started, leaving a fully static hero.
  const heroRef = useRef<HTMLElement>(null)
  const washRef = useRef<HTMLCanvasElement>(null)
  const splashRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (LOGO_DRAW) return heroRef.current ? initLogoDraw(heroRef.current) : undefined
    const cv = HERO_ANIMATION === 'wall-wash' ? washRef.current : splashRef.current
    if (!cv) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cv.style.display = 'none'
      return
    }
    let destroy: (() => void) | undefined
    let cancelled = false
    const loaded =
      HERO_ANIMATION === 'wall-wash'
        ? import('@/lib/wall-wash').then((m) => m.initWallWash(cv).destroy)
        : import('@/lib/splash').then((m) => m.initSplash(cv).destroy)
    loaded.then((d) => {
      if (cancelled) d() // unmounted while the chunk was loading
      else destroy = d
    })
    return () => {
      cancelled = true
      destroy?.()
    }
  }, [])

  return (
    <section
      id="top"
      ref={heroRef}
      className={`relative overflow-hidden bg-apple-surface${LOGO_DRAW ? ' ld' : ''}`}
    >
      {HERO_ANIMATION === 'splash' && (
        /* Header-height strip at the very top of the hero, directly beneath
            the transparent sticky header — the same zone the splash occupied
            before the wall-wash swap. Canvas is decorative: no pointer events. */
        <div className="absolute inset-x-0 top-0 h-12 overflow-hidden" aria-hidden="true">
          <canvas
            ref={splashRef}
            className="pointer-events-none absolute inset-0 block h-full w-full"
          />
        </div>
      )}

      {/* Subtle radial glow behind the headline, fading to black at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 32%, rgb(0 212 255 / 0.07), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-20 text-center md:pt-32">
        <HeroItem delay={0} step={0}>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.05em] text-apple-sub">
            <MapPin className="h-3.5 w-3.5 text-apple-blue" />
            Philippines-based · Serving AU · US · UK
          </p>
        </HeroItem>

        {LOGO_DRAW && <HeroMark />}

        {/* H1 is never animated in logo-draw mode: it paints on the first frame */}
        <HeroItem delay={100} step={0} still>
          {HERO_ANIMATION === 'wall-wash' ? (
            /* Sizing classes moved from the h1 to this wrapper so the
               wall-wash canvas (absolute inset-0) covers exactly the same
               box as the headline. Computed layout is unchanged. */
            <div className="relative mx-auto mt-8 max-w-5xl">
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-apple-ink">
                {HEADLINE}
              </h1>
              <canvas ref={washRef} aria-hidden="true" className="wall-wash-canvas" />
            </div>
          ) : (
            <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-apple-ink">
              {HEADLINE}
            </h1>
          )}
        </HeroItem>

        <HeroItem delay={200} step={1}>
          <p className="mx-auto mt-8 max-w-2xl text-[19px] leading-[1.5] text-apple-sub md:text-xl">
            For Australian cleaning, trade and dental businesses. I build the fast website, the AI
            chat assistant that qualifies leads at 11pm, and the GoHighLevel follow-up that books them.
          </p>
        </HeroItem>

        <HeroItem delay={300} step={2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DEMO_MAILTO}
              data-pdc-chat={DEMO_CHAT_PREFILL}
              className={`btn-primary${LOGO_DRAW ? ' ld-shine' : ''}`}
            >
              Get a free demo rebuild
            </a>
            <a href="#latest-build" className="btn-secondary">
              See the dental rebuild
            </a>
          </div>
          {/* Quiet fallbacks: email for anyone who'd rather not chat, and the
              demo video (keeps the video modal's trigger on the page) */}
          <p className="mt-5 text-sm text-apple-sub">
            or{' '}
            <a
              href={DEMO_MAILTO}
              className="underline underline-offset-4 transition-colors hover:text-apple-ink"
            >
              email me
            </a>
            {' · '}
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              data-video-modal
              className="underline underline-offset-4 transition-colors hover:text-apple-ink"
            >
              watch the demo video
            </a>
          </p>
        </HeroItem>

        <HeroItem delay={400} step={3}>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs text-apple-sub">
            {PROOF.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </HeroItem>
      </div>
    </section>
  )
}
