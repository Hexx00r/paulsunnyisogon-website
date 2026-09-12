import { MapPin } from 'lucide-react'
import portrait from '@/assets/portrait.jpg'
import { BOOKING, LinkArrow, YOUTUBE } from '@/components/Shared'
import Reveal from '@/components/Reveal'
import { techStack } from '@/site.config'

export default function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-apple-surface">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 text-center md:pt-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-apple-gray px-4 py-1.5 text-xs font-medium text-apple-sub">
            <MapPin className="h-3.5 w-3.5 text-apple-blue" />
            Philippines-based · Serving AU · US · UK remotely
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-apple-ink">
            Your website should work harder than your pressure washer.
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
              className="rounded-full bg-apple-blueSolid px-7 py-3 text-base font-medium text-white transition-colors hover:bg-apple-blueDark"
            >
              Book a Free Funnel Audit
            </a>
            <LinkArrow href={YOUTUBE} className="text-lg">
              Watch the demo
            </LinkArrow>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mx-auto mt-14 max-w-sm">
            <img
              src={portrait}
              alt="Paul Sunny Isogon Jr — GoHighLevel specialist"
              className="w-full rounded-3xl object-cover shadow-card-hover"
            />
            <span className="mt-4 block rounded-full bg-apple-invert px-5 py-2 text-center text-sm font-medium text-white">
              Paul Isogon · Full-Stack Web Developer / GHL Specialist
            </span>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-apple-ink md:text-3xl">
              Tech Stack
            </h2>
            <dl className="mt-6 grid gap-4 text-left sm:grid-cols-2">
              {techStack.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] bg-apple-gray p-6 transition-colors duration-300 hover:bg-apple-grayHover"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-apple-blue">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-apple-ink md:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
