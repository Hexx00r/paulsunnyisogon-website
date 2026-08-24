import { ClipboardCheck, Hammer, Link2, TrendingUp } from 'lucide-react'
import { Kicker } from '@/components/Shared'

const STEPS = [
  {
    icon: ClipboardCheck,
    num: '01',
    title: 'Audit',
    desc: 'I review your current ads, landing page, and GHL setup. Find the leaks.',
  },
  {
    icon: Hammer,
    num: '02',
    title: 'Build',
    desc: 'I construct your custom instant-quote funnel, GHL workflows, and pipelines.',
  },
  {
    icon: Link2,
    num: '03',
    title: 'Connect',
    desc: 'Wire your ads, calendar, SMS/email, and payment tools into one seamless system.',
  },
  {
    icon: TrendingUp,
    num: '04',
    title: 'Optimize',
    desc: 'Track conversion rates, tweak follow-up sequences, scale what works.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kicker>How it works</Kicker>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          From first call to <span className="text-brand">fully booked</span> - four steps.
        </h2>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="relative rounded-[18px] border border-aquadeep bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover"
            >
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-4 top-1/2 hidden h-[2px] w-8 -translate-y-1/2 bg-aquadeep lg:block"
                />
              )}
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand text-white shadow-cta">
                <step.icon className="h-6 w-6" />
              </span>
              <span className="mt-5 block font-display text-xs font-extrabold tracking-widest text-brand">
                STEP {step.num}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
