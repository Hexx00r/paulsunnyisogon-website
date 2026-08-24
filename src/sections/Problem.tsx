import { Kicker } from '@/components/Shared'

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
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kicker>The leaky funnel</Kicker>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          Leads don&apos;t disappear. <span className="text-brand">They leak.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg">
          Every one of these has happened to a real cleaning business - mine included.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <article
              key={p.quote}
              className="flex flex-col rounded-[18px] border border-aquadeep bg-aqua/50 p-7 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="font-display text-4xl font-extrabold text-brand/30">
                0{i + 1}
              </span>
              <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">
                &ldquo;{p.quote}&rdquo;
              </p>
              <p className="mt-4 border-t border-aquadeep pt-4 text-sm leading-relaxed">{p.fix}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
