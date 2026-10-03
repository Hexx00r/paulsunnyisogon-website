import { Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'
import { SHOW_TESTIMONIALS, testimonials } from '@/site.config'

/** Hidden in production until SHOW_TESTIMONIALS is true (client-approved text only). */
export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null
  return (
    <section id="testimonials" className="scroll-mt-16 bg-apple-surface py-[120px]">
      <div className="mx-auto max-w-[1000px] px-6">
        <Reveal>
          <Kicker>What clients say</Kicker>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={i} as="article" delay={i * 100} className="card rounded-[28px] p-8 md:p-10">
              <blockquote className="text-[17px] leading-relaxed text-apple-ink">
                “{t.quote}”
              </blockquote>
              <p className="mt-6 text-sm text-apple-sub">
                <span className="font-semibold text-apple-ink">{t.name}</span>, {t.business}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
