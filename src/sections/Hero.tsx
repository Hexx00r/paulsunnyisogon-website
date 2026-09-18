import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { BOOKING, YOUTUBE } from '@/components/Shared'
import { VideoModal } from '@/lib/video-modal'
import Reveal from '@/components/Reveal'

// Modal video ID — derived from the YOUTUBE link in components/Shared.tsx so
// the no-JS fallback href and the modal player can never drift apart.
// (Change the video in one place: the YOUTUBE constant.)
const DEMO_VIDEO_ID = YOUTUBE.match(/youtu\.be\/([\w-]+)/)?.[1] ?? ''

export default function Hero() {
  // Enhance the "Watch the Demo" link client-side only: with JS, clicks open
  // the modal; without JS (or before hydration) the plain YouTube href in the
  // prerendered HTML still works. Instantiated once per homepage mount and
  // fully torn down on unmount — no double-instantiation under react-router
  // navigation, and nothing here runs during the SSR/prerender pass.
  useEffect(() => {
    const modal = new VideoModal({
      videoId: DEMO_VIDEO_ID,
      triggerSelector: 'a[data-video-modal]',
      // Respect reduced motion: no autoplay for those users.
      autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
    return () => modal.destroy()
  }, [])

  return (
    <section id="top" className="relative overflow-hidden bg-apple-surface">
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
          <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em] text-apple-ink">
            Your website should work harder than your pressure washer.
          </h1>
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
