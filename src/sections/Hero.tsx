import { ArrowRight, MapPin, Youtube } from 'lucide-react'
import portrait from '@/assets/portrait.jpg'
import { BOOKING, YOUTUBE } from '@/components/Shared'

const STATS = [
  { value: '6+', label: 'GHL workflows, wired together' },
  { value: '2', label: 'Live funnel builds shipped' },
  { value: '24h', label: 'Fixed-quote turnaround baked in' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle water-ring motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full border-[40px] border-white/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[-8%] h-[360px] w-[360px] rounded-full border-[30px] border-white/30"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 md:px-6 md:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-aquadeep bg-white px-4 py-1.5 text-xs font-bold tracking-wide text-slatebody shadow-card">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            Philippines-based · Serving AU · US · UK remotely
          </p>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-[3.4rem]">
            High-Pressure Cleaning Businesses:{' '}
            <span className="relative whitespace-nowrap text-brand">
              Your Funnel
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-2 left-0 w-full text-brand/50"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 C 40 2, 80 10, 110 6 S 180 2, 218 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            Should Work Harder Than Your Pressure Washer.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            I build complete GoHighLevel systems - instant-quote funnels, automated follow-up
            workflows, booking calendars, and review engines - so leads turn into jobs while you're
            on-site.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-display text-base font-bold text-white shadow-cta transition-transform hover:scale-[1.03]"
            >
              Book a Free Funnel Audit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white px-8 py-[14px] font-display text-base font-bold text-ink shadow-card transition-colors hover:border-brand hover:text-brand"
            >
              <Youtube className="h-5 w-5" />
              Watch the Demo
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col rounded-[18px] border border-aquadeep bg-white px-4 py-3 text-center shadow-card"
              >
                <dd className="order-1 font-display text-2xl font-extrabold text-brand">
                  {s.value}
                </dd>
                <dt className="order-2 mt-1 block text-[11px] font-semibold leading-snug text-slatebody">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[28px] border-2 border-brand/40"
          />
          <img
            src={portrait}
            alt="Paul Sunny Isogon Jr - GoHighLevel specialist"
            className="relative w-full rounded-[24px] object-cover shadow-card-hover"
          />
          <figcaption className="absolute -bottom-1 left-1/2 w-[100%] -translate-x-1/2 rounded-[14px] bg-ink px-5 py-3 text-center shadow-card-hover">
            <span className="font-display text-sm font-bold text-white">Paul Isogon</span>
            <span className="block text-xs text-white/70">
              GHL Specialist
            </span>
          </figcaption>
        </div>
      </div>

      {/* wave divider */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-10 w-full text-white md:h-14"
      >
        <path
          d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  )
}
