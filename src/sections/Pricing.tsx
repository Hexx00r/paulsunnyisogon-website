import { Check } from 'lucide-react'
import { BOOKING, BOOKING_LABEL, Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'
import { pricing } from '@/site.config'

/** Pricing: three cards, copy and numbers from `pricing` in site.config.ts. */
export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-apple-surface py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <Kicker>Pricing</Kicker>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.02em] text-apple-ink md:text-5xl">
            Simple pricing. <span className="text-apple-blue">No lock-in.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[19px] leading-[1.5] text-apple-sub">
            All prices in AUD. One setup fee, then an optional monthly plan to keep it running.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <Reveal
              key={plan.name}
              as="article"
              delay={i * 100}
              className={`card flex flex-col rounded-[28px] p-8 md:p-10 ${
                plan.popular
                  ? 'border border-[rgb(0_212_255/0.45)] shadow-[0_0_60px_rgb(0_212_255/0.12)]'
                  : ''
              }`}
            >
              <div className="flex min-h-[28px] flex-wrap items-center gap-2">
                {plan.popular && (
                  <span className="rounded-full bg-apple-blueSolid px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
                    Most popular
                  </span>
                )}
                {plan.badge && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-apple-sub">
                    {plan.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-apple-ink">{plan.name}</h3>
              <p className="mt-2 text-sm text-apple-sub">{plan.tagline}</p>

              <p className="mt-6 flex flex-wrap items-baseline gap-x-2 text-apple-ink">
                {plan.prefix && <span className="text-sm text-apple-sub">{plan.prefix}</span>}
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-sm text-apple-sub">{plan.unit}</span>
              </p>
              {plan.wasPrice && (
                <p className="mt-1 text-sm text-apple-sub">
                  Normally <s>{plan.wasPrice}</s>
                </p>
              )}
              {plan.priceNote && <p className="mt-1 text-sm text-apple-sub">{plan.priceNote}</p>}

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-apple-sub">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-apple-blue" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 justify-center ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                {BOOKING_LABEL}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
