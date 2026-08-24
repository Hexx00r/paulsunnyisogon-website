import { Download } from 'lucide-react'
import { BrowserShot, Kicker } from '@/components/Shared'
import melbHero from '@/assets/melb-hero.png'
import melbBa from '@/assets/melb-ba.jpg'
import melbCalc2 from '@/assets/melb-calc2.png'
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
    <section id="case-study-melbourne" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kicker>Case study 02</Kicker>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          Same system, <span className="text-brand">different skin.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed">
          <strong className="text-ink">Melbourne High Pressure Cleaning</strong> - San Remo &amp;
          greater Melbourne. A complete rebrand and funnel build with a light cyan/blue aesthetic,
          proving the system works across markets and brand identities, not just one lucky design.
        </p>

        <ul className="mt-8 flex max-w-3xl flex-wrap gap-2.5">
          {TECH.map((t) => (
            <li
              key={t}
              className="rounded-full border border-aquadeep bg-white px-4 py-1.5 text-xs font-bold text-ink shadow-card"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <BrowserShot
            src={melbHero}
            alt="Melbourne High Pressure Cleaning - light cyan hero with trust checklist"
            url="quote.highpressurecleaning.melbourne"
          />
          <BrowserShot
            src={melbCalc2}
            alt="Melbourne High Pressure Cleaning - step 2 of the instant quote calculator with live estimate"
            url="quote.highpressurecleaning.melbourne#step2"
          />
        </div>
        <div className="mt-6">
          <BrowserShot
            src={melbBa}
            alt="Melbourne High Pressure Cleaning - before and after drag slider with real job photos"
            url="quote.highpressurecleaning.melbourne#results"
            className="lg:mx-auto lg:max-w-4xl"
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[18px] border border-aquadeep bg-white p-7 shadow-card md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">
              The funnel even generates the paperwork.
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed">
              Every submission produces a branded quote PDF - service breakdown, bundle discount,
              terms - plus an internal lead-intelligence page with UTM source and next action. Grab
              a real sample.
            </p>
          </div>
          <a
            href={quotePdf}
            download="Melbourne-HPC-Quote-Sample.pdf"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.03]"
          >
            <Download className="h-4 w-4" />
            Download Quote PDF
          </a>
        </div>
      </div>
    </section>
  )
}
