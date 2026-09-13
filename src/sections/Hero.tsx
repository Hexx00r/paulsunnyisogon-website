import { MapPin } from 'lucide-react'
import { BOOKING, YOUTUBE } from '@/components/Shared'
import Reveal from '@/components/Reveal'

export default function Hero() {
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
              Book a Free Funnel Audit
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
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
