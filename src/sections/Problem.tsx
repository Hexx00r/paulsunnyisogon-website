import { Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'

const PAINS = [
  {
    quote: 'You ran a Facebook ad. 20 people clicked. Zero booked. Where\u2019d they go?',
    fix: 'They hit a page with no instant answer - and bounced to the next tradie on the list.',
  },
  {
    quote: 'You\u2019re quoting on the phone while covered in grime. Leads go cold in 10 minutes.',
    fix: 'By the time you call back, they\u2019ve already booked the competitor who answered first.',
  },
  {
    quote: 'Your competitor\u2019s website gives instant prices. Yours says \u201cCall for a quote.\u201d',
    fix: 'Instant ballpark + automated follow-up wins the job before you\u2019ve even seen the lead.',
  },
]

export default function Problem() {
  return (
    <section className="bg-apple-gray py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>The leaky funnel</Kicker>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
            Leads don&apos;t disappear. <span className="text-apple-blue">They leak.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-apple-sub">
            Every one of these has happened to a real cleaning business - mine included.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal
              key={p.quote}
              delay={i * 100}
              as="article"
              className="flex h-full flex-col rounded-[28px] bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <span className="text-4xl font-semibold tracking-tight text-apple-hairline">
                0{i + 1}
              </span>
              <p className="mt-4 text-lg font-semibold leading-snug text-apple-ink">
                &ldquo;{p.quote}&rdquo;
              </p>
              <p className="mt-4 border-t border-apple-gray pt-4 text-sm leading-relaxed text-apple-sub">
                {p.fix}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
