import { ClipboardCheck, Hammer, Link2, TrendingUp } from 'lucide-react'
import { Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'

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
    <section className="bg-apple-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>How it works</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
            From first call to <span className="text-apple-blue">fully booked</span> - four steps.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.num}
              as="li"
              delay={i * 100}
              className="relative h-full rounded-[28px] bg-apple-gray p-8 transition-colors duration-300 hover:bg-apple-grayHover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-apple-surface text-apple-blue shadow-card">
                <step.icon className="h-5 w-5" />
              </span>
              <span className="mt-5 block text-xs font-semibold tracking-widest text-apple-blue">
                STEP {step.num}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-apple-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-apple-sub">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
