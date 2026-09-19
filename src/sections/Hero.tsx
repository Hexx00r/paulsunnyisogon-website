import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'
import { BOOKING, YOUTUBE } from '@/components/Shared'
import { VideoModal } from '@/lib/video-modal'
import { HERO_ANIMATION } from '@/site.config'
import Reveal from '@/components/Reveal'

// Modal video ID — derived from the YOUTUBE link in components/Shared.tsx so
// the no-JS fallback href and the modal player can never drift apart.
// (Change the video in one place: the YOUTUBE constant.)
const DEMO_VIDEO_ID = YOUTUBE.match(/youtu\.be\/([\w-]+)/)?.[1] ?? ''

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
  const washRef = useRef<HTMLCanvasElement>(null)
  const splashRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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
    <section id="top" className="relative overflow-hidden bg-apple-surface">
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
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.05em] text-apple-sub">
            <MapPin className="h-3.5 w-3.5 text-apple-blue" />
            Philippines-based · Serving AU · US · UK
          </p>
        </Reveal>

        <Reveal delay={100}>
          {HERO_ANIMATION === 'wall-wash' ? (
            /* Sizing classes moved from the h1 to this wrapper so the
               wall-wash canvas (absolute inset-0) covers exactly the same
               box as the headline. Computed layout is unchanged. */
            <div className="relative mx-auto mt-8 max-w-5xl">
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-apple-ink">
                Your website should work harder than your pressure washer.
              </h1>
              <canvas ref={washRef} aria-hidden="true" className="wall-wash-canvas" />
            </div>
          ) : (
            <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-apple-ink">
              Your website should work harder than your pressure washer.
            </h1>
          )}
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-2xl text-[19px] leading-[1.5] text-apple-sub md:text-xl">
            Complete GoHighLevel systems, plus the custom code, webhooks,
            <br className="hidden md:block" /> and technical SEO most GHL freelancers can&apos;t touch.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={BOOKING} target="_blank" rel="noreferrer" className="btn-primary">
              Book a Free Funnel Website Audit
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              data-video-modal
              className="btn-secondary"
            >
              Watch the Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
