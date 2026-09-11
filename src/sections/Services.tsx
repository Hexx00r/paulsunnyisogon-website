import { CheckCircle2, Globe2 } from 'lucide-react'
import { BOOKING, Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'

const SERVICES = [
  'Part-time & project-based GHL funnel builds',
  'Instant quote calculator development (HTML/CSS/JS + GHL webhook integration)',
  'Complete workflow automation architecture (6+ workflow systems)',
  'Pipeline setup, tagging logic, opportunity management',
  'Ongoing CRM management and optimization',
]

const AVAILABILITY = [
  'Remote-first - works in your timezone overlap',
  'English-professional communication',
  'Serves AU / US / UK markets',
  'Fast async updates - you\u2019ll never chase me for a status',
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-apple-gray py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Services &amp; availability</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
            What you can <span className="text-apple-blue">hire me for.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal as="article" className="h-full rounded-[28px] bg-apple-surface p-8 shadow-card md:p-10">
            <h3 className="text-xl font-semibold tracking-tight text-apple-ink">The work</h3>
            <ul className="mt-5 space-y-3.5">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-apple-inkSoft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-apple-blue" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="article" delay={100} className="h-full rounded-[28px] bg-apple-surface p-8 shadow-card md:p-10">
            <h3 className="text-xl font-semibold tracking-tight text-apple-ink">The setup</h3>
            <ul className="mt-5 space-y-3.5">
              {AVAILABILITY.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-apple-inkSoft">
                  <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-apple-blue" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-14" y={32}>
          <div className="rounded-[32px] bg-apple-invert px-8 py-14 text-center md:px-16 md:py-20">
            <h3 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Ready to stop chasing leads?{' '}
              <span className="text-apple-blueAlt">Let&apos;s build your funnel.</span>
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              One email. I&apos;ll come back with a free audit of your current setup and a fixed price
              for the build.
            </p>
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center rounded-full bg-apple-blueSolid px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-apple-blueDark"
            >
              Book a Free Funnel Audit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
