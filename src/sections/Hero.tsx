import { MapPin } from 'lucide-react'
import portrait from '@/assets/portrait.jpg'
import { BOOKING, LinkArrow, YOUTUBE } from '@/components/Shared'
import Reveal from '@/components/Reveal'

const STATS = [
  { value: '6+', label: 'GHL workflows, wired together' },
  { value: '2', label: 'Live funnel builds shipped' },
  { value: '24h', label: 'Fixed-quote turnaround baked in' },
]

export default function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 text-center md:pt-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-apple-gray px-4 py-1.5 text-xs font-medium text-apple-sub">
            <MapPin className="h-3.5 w-3.5 text-apple-blue" />
            Philippines-based · Serving AU · US · UK remotely
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-apple-ink">
            Your funnel should work harder than your pressure washer.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-apple-sub md:text-xl">
            I build complete GoHighLevel systems — instant-quote funnels, automated follow-up
            workflows, booking calendars, and review engines — so leads turn into jobs while
            you&apos;re on-site.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-apple-blue px-7 py-3 text-base font-medium text-white transition-colors hover:bg-apple-blueDark"
            >
              Book a Free Funnel Audit
            </a>
            <LinkArrow href={YOUTUBE} className="text-lg">
              Watch the demo
            </LinkArrow>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="relative mx-auto mt-14 max-w-sm">
            <img
              src={portrait}
              alt="Paul Sunny Isogon Jr — GoHighLevel specialist"
              className="w-full rounded-3xl object-cover shadow-card-hover"
            />
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-apple-ink px-5 py-2 text-sm font-medium text-white">
              Paul Isogon · GHL Funnel Architect
            </span>
          </div>

          <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col px-2 py-4">
                <dd className="order-1 text-3xl font-semibold tracking-tight text-apple-ink md:text-4xl">
                  {s.value}
                </dd>
                <dt className="order-2 mt-1 block text-xs leading-snug text-apple-sub md:text-sm">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
