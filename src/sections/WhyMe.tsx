import portrait from '@/assets/portrait.jpg'
import { Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'

const STACK = ['JavaScript', 'Python', 'Java', 'REST APIs', 'Webhooks', 'Make', 'GoHighLevel', 'HTML/CSS']

export default function WhyMe() {
  return (
    <section id="about" className="scroll-mt-16 bg-apple-gray py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <img
            src={portrait}
            alt="Paul Sunny Isogon Jr"
            loading="lazy"
            className="w-full rounded-[32px] object-cover shadow-card-hover"
          />
          <span className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full bg-apple-ink px-5 py-2 text-sm font-medium text-white">
            Tradie brain. Developer hands.
          </span>
        </Reveal>

        <div>
          <Reveal>
            <Kicker>Why me</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
              Built for my own family first. <span className="text-apple-blue">Then for yours.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-apple-sub">
              I&apos;m <strong className="font-semibold text-apple-ink">Paul Sunny Isogon Jr</strong>. I
              built the complete GHL automation system for my own family&apos;s property &amp; cleaning
              services business - DJ Property &amp; Cleaning Services, Albury–Wodonga, Australia. I know
              what it&apos;s like to miss a call because you&apos;re on the truck. That&apos;s why I design
              systems that work when you can&apos;t.
            </p>
            <p className="mt-4 leading-relaxed text-apple-sub">
              I&apos;m a full-stack developer - I build what template builders can&apos;t:
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {STACK.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-apple-ink shadow-card"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-apple-sub">
              I don&apos;t just set up GHL. I design the entire lead-to-revenue flow - frontend funnel +
              backend automation + pipeline logic. And I learned it by building it for my own family
              first.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
