import { Download } from 'lucide-react'
import { BrowserShot, Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'
import melbHero from '@/assets/melb-hero.webp'
import melbBa from '@/assets/melb-ba.webp'
import melbCalc2 from '@/assets/melb-calc2.webp'
import quotePdf from '@/assets/quote-sample.pdf'

const TECH = [
  'HTML / CSS / JS front end',
  'GHL webhook integration',
  'Instant pricing with bundle discounts',
  'Mobile-responsive + sticky CTA',
  'Before/after drag slider',
  'Auto-generated quote PDF',
]

export default function CaseStudyMelbourne() {
  return (
    <section id="case-study-melbourne" className="scroll-mt-16 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Case study 02</Kicker>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
            Same system, <span className="text-apple-blue">different skin.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-apple-sub">
            <strong className="font-semibold text-apple-ink">Melbourne High Pressure Cleaning</strong> -
            San Remo &amp; greater Melbourne. A complete rebrand and funnel build with a light
            cyan/blue aesthetic, proving the system works across markets and brand identities, not
            just one lucky design.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-8 flex max-w-3xl flex-wrap gap-2.5">
            {TECH.map((t) => (
              <li
                key={t}
                className="rounded-full bg-apple-gray px-4 py-1.5 text-xs font-semibold text-apple-ink"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal as="div">
            <BrowserShot
              src={melbHero}
              alt="Melbourne High Pressure Cleaning - light cyan hero with trust checklist"
              url="quote.highpressurecleaning.melbourne"
            />
          </Reveal>
          <Reveal as="div" delay={100}>
            <BrowserShot
              src={melbCalc2}
              alt="Melbourne High Pressure Cleaning - step 2 of the instant quote calculator with live estimate"
              url="quote.highpressurecleaning.melbourne#step2"
            />
          </Reveal>
        </div>
        <Reveal className="mt-5">
          <BrowserShot
            src={melbBa}
            alt="Melbourne High Pressure Cleaning - before and after drag slider with real job photos"
            url="quote.highpressurecleaning.melbourne#results"
            className="lg:mx-auto lg:max-w-4xl"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-apple-gray p-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-apple-ink">
                The funnel even generates the paperwork.
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-apple-sub">
                Every submission produces a branded quote PDF - service breakdown, bundle discount,
                terms - plus an internal lead-intelligence page with UTM source and next action. Grab
                a real sample.
              </p>
            </div>
            <a
              href={quotePdf}
              download="Melbourne-HPC-Quote-Sample.pdf"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-apple-blueDark"
            >
              <Download className="h-4 w-4" />
              Download Quote PDF
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
