import portrait from '@/assets/portrait.jpg'
import { Kicker } from '@/components/Shared'

const STACK = ['JavaScript', 'Python', 'Java', 'REST APIs', 'Webhooks', 'Make', 'GoHighLevel', 'HTML/CSS']

export default function WhyMe() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[28px] border-2 border-brand/40"
          />
          <img
            src={portrait}
            alt="Paul Sunny Isogon Jr"
            loading="lazy"
            className="relative w-full rounded-[24px] object-cover shadow-card-hover"
          />
          <span className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-brand px-5 py-2 font-display text-sm font-bold text-white shadow-cta">
            Tradie brain. Developer hands.
          </span>
        </div>

        <div>
          <Kicker>Why me</Kicker>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            Built for my own family first. <span className="text-brand">Then for yours.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed">
            I&apos;m <strong className="text-ink">Paul Sunny Isogon Jr</strong>. I built the
            complete GHL automation system for my own family&apos;s property &amp; cleaning services
            business - DJ Property &amp; Cleaning Services, Albury–Wodonga, Australia. I know what
            it&apos;s like to miss a call because you&apos;re on the truck. That&apos;s why I design
            systems that work when you can&apos;t.
          </p>
          <p className="mt-4 leading-relaxed">
            I&apos;m a full-stack developer - I build what template builders can&apos;t:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {STACK.map((s) => (
              <li
                key={s}
                className="rounded-full border border-aquadeep bg-aqua/60 px-4 py-1.5 font-display text-xs font-bold text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed">
            I don&apos;t just set up GHL. I design the entire lead-to-revenue flow - frontend funnel
            + backend automation + pipeline logic. And I learned it by building it for my own family
            first.
          </p>


        </div>
      </div>
    </section>
  )
}
