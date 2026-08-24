import { CheckCircle2, Globe2 } from 'lucide-react'
import { BOOKING, Kicker } from '@/components/Shared'

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
    <section id="services" className="scroll-mt-20 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kicker>Services &amp; availability</Kicker>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          What you can <span className="text-brand">hire me for.</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[18px] border border-aquadeep bg-aqua/50 p-8 shadow-card">
            <h3 className="font-display text-xl font-bold text-ink">The work</h3>
            <ul className="mt-5 space-y-3.5">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {s}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[18px] border border-aquadeep bg-aqua/50 p-8 shadow-card">
            <h3 className="font-display text-xl font-bold text-ink">The setup</h3>
            <ul className="mt-5 space-y-3.5">
              {AVAILABILITY.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                  <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {a}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-14 rounded-[24px] bg-ink px-8 py-12 text-center shadow-card-hover md:px-16">
          <h3 className="font-display text-2xl font-extrabold text-white md:text-4xl">
            Ready to stop chasing leads? <span className="text-brand">Let&apos;s build your funnel.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            One email. I&apos;ll come back with a free audit of your current setup and a fixed
            price for the build.
          </p>
          <a
            href={BOOKING}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-10 py-4 font-display text-base font-bold text-white shadow-cta transition-transform hover:scale-[1.03]"
          >
            Book a Free Funnel Audit
          </a>
        </div>
      </div>
    </section>
  )
}
