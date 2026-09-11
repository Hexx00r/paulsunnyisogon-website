import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarClock,
  GitBranch,
  KanbanSquare,
  MessageSquareText,
  Plug,
  Star,
} from 'lucide-react'
import { Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'

/* ------------------------------- What I Build ------------------------------ */

const BUILD_ITEMS = [
  {
    icon: GitBranch,
    title: 'Instant Quote Calculator Funnel',
    desc: 'Two-step form (services → contact) with live pricing. House wash, driveway, roof, brick, gutter - per-m² pricing logic built in.',
  },
  {
    icon: KanbanSquare,
    title: 'GHL Pipeline & CRM',
    desc: 'Leads drop straight into a pipeline with auto-tagging and stage management. Nothing falls through the cracks.',
  },
  {
    icon: MessageSquareText,
    title: 'SMS/Email Follow-Up Sequences',
    desc: 'Automated qualification, appointment reminders, and nurture campaigns that run while you\u2019re on the truck.',
  },
  {
    icon: CalendarClock,
    title: 'Smart Booking Calendar',
    desc: 'Integrated scheduling with confirmation and reminder automation - no more phone tag.',
  },
  {
    icon: Star,
    title: 'Review Request Automation',
    desc: 'Post-job SMS that brings in Google reviews on autopilot. Rinse and repeat reputation.',
  },
  {
    icon: Plug,
    title: 'Custom Integrations',
    desc: 'Webhooks, REST APIs, Make/Zapier - when native GHL isn\u2019t enough, I write the code that is.',
  },
]

/* ------------------------- Live calculator demo ---------------------------- */

type Service = {
  id: string
  emoji: string
  name: string
  hint: string
  rate: number
  unit?: string
}

const SERVICES: Service[] = [
  { id: 'house', emoji: '🏠', name: 'House wash', hint: 'Whole exterior, flat rate', rate: 350 },
  { id: 'driveway', emoji: '🚗', name: 'Driveway & concrete', hint: '$4.50 per m²', rate: 4.5, unit: 'm²' },
  { id: 'roof', emoji: '🏘️', name: 'Roof cleaning', hint: '$10 per m²', rate: 10, unit: 'm²' },
  { id: 'brick', emoji: '🧱', name: 'Brick & block cleaning', hint: '$6 per m² · eco acid-free', rate: 6, unit: 'm²' },
  { id: 'gutter', emoji: '🍂', name: 'Gutter cleaning', hint: '$4 per linear metre', rate: 4, unit: 'linear m' },
]

const money = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`

function QuoteCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [areas, setAreas] = useState<Record<string, string>>({})
  const [heavy, setHeavy] = useState(false)

  const calc = useMemo(() => {
    const lines = SERVICES.filter((s) => selected[s.id]).map((s) => {
      const qty = s.unit ? Math.max(0, Number(areas[s.id]) || 0) : 1
      return { ...s, qty, total: s.unit ? s.rate * qty : s.rate, tbc: Boolean(s.unit) && qty === 0 }
    })
    const subtotal = lines.reduce((sum, l) => sum + l.total, 0)
    const heavyAdj = heavy ? subtotal * 0.2 : 0
    const afterHeavy = subtotal + heavyAdj
    const validLines = lines.filter((l) => !l.tbc)
    const bundle = validLines.length >= 2 ? afterHeavy * 0.2 : 0
    const beforeMin = afterHeavy - bundle
    const minApplied = beforeMin > 0 && beforeMin < 150
    const total = minApplied ? 150 : beforeMin
    return { lines, subtotal, heavyAdj, bundle, total, minApplied }
  }, [selected, areas, heavy])

  return (
    <div className="overflow-hidden rounded-[28px] bg-apple-surface shadow-card-hover">
      <div className="border-b border-apple-gray px-6 py-6 md:px-10">
        <h3 className="text-xl font-semibold tracking-tight text-apple-ink md:text-2xl">
          Try the calculator - <span className="text-apple-blue">live demo</span>
        </h3>
        <p className="mt-1 text-sm text-apple-sub">
          Same pricing logic I wire into client funnels. Tick services, type an area, watch the
          estimate update.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-apple-gray px-4 py-1.5 text-xs font-medium text-apple-blue">
          ⏱ Booking up fast - spring wash season is our busiest time
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        {/* service picker */}
        <div className="p-6 md:p-10">
          <p className="text-sm font-semibold text-apple-ink">
            What needs doing? <span className="font-normal text-apple-sub">(tick all that apply)</span>
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const on = Boolean(selected[s.id])
              return (
                <div
                  key={s.id}
                  className={`rounded-2xl border p-4 transition-colors ${
                    on ? 'border-apple-blue bg-apple-blueSoft' : 'border-apple-hairline bg-apple-surface hover:border-apple-blueMist'
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => setSelected((p) => ({ ...p, [s.id]: e.target.checked }))}
                      className="mt-1 h-4 w-4 accent-apple-blue"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-apple-ink">
                        {s.emoji} {s.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-apple-sub">{s.hint}</span>
                    </span>
                  </label>
                  {on && s.unit && (
                    <input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      placeholder={`Approx. area (${s.unit})`}
                      value={areas[s.id] ?? ''}
                      onChange={(e) => setAreas((p) => ({ ...p, [s.id]: e.target.value }))}
                      className="mt-3 w-full rounded-xl border border-apple-hairline bg-apple-surface px-3 py-2 text-sm text-apple-ink placeholder:text-apple-sub focus:border-apple-blue focus:outline-none"
                      aria-label={`${s.name} area in ${s.unit}`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <p className="mt-6 text-sm font-semibold text-apple-ink">How dirty is it?</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(['Normal build-up', 'Heavy staining'] as const).map((label, i) => {
              const active = heavy === (i === 1)
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setHeavy(i === 1)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'border-apple-blue bg-apple-blueSoft text-apple-blue'
                      : 'border-apple-hairline bg-apple-surface text-apple-sub hover:border-apple-blueMist'
                  }`}
                  aria-pressed={active}
                >
                  {label}
                  {i === 1 && <span className="ml-1 text-xs font-medium">(+20%)</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* instant estimate panel */}
        <div className="flex flex-col bg-apple-invert p-6 text-white md:p-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-apple-blueAlt">
            INSTANT ESTIMATE
          </p>
          <p className="mt-2 text-5xl font-semibold tracking-tight">
            {calc.lines.length ? `${money(calc.total)}${calc.lines.some((l) => l.tbc) ? '+' : ''}` : '$0'}
          </p>

          <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6 text-sm">
            {calc.lines.length === 0 && (
              <li className="text-white/50">Pick a service to see the ballpark.</li>
            )}
            {calc.lines.map((l) => (
              <li key={l.id} className="flex items-baseline justify-between gap-3">
                <span className="text-white/80">
                  {l.name}
                  {l.unit ? ` (${l.qty} ${l.unit})` : ''}
                </span>
                <span className="font-semibold">{l.tbc ? 'TBC' : money(l.total)}</span>
              </li>
            ))}
            {heavy && calc.lines.length > 0 && (
              <li className="flex items-baseline justify-between gap-3 text-white/60">
                <span>Heavy staining (+20%)</span>
                <span className="font-semibold">+{money(calc.heavyAdj)}</span>
              </li>
            )}
            {calc.bundle > 0 && (
              <li className="flex items-baseline justify-between gap-3 text-apple-blueAlt">
                <span>Bundle discount (2+ services, −20%)</span>
                <span className="font-semibold">−{money(calc.bundle)}</span>
              </li>
            )}
            {calc.minApplied && (
              <li className="text-white/60">Minimum job $150 applied.</li>
            )}
          </ul>

          <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/50">
            Ballpark only - the fixed quote is confirmed within one business day. Bundle 2+ services
            and save 20%. Minimum job $150.
          </p>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- Section --------------------------------- */

export default function WhatIBuild() {
  return (
    <section id="build" className="scroll-mt-16 bg-apple-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>What I build</Kicker>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
            The complete <span className="text-apple-blue">lead-to-job</span> machine.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-apple-sub">
            Not a landing page and a prayer - a full system: front-end funnel, pricing logic, CRM
            pipeline, follow-up, booking, and reviews.
          </p>
        </Reveal>

        {/* Bento grid: 2 tall cards on top, 3 wide cards below; stacks on mobile */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {BUILD_ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              delay={(i % 3) * 100}
              className={`group flex h-full flex-col rounded-[28px] bg-apple-gray p-8 transition-colors duration-300 hover:bg-apple-grayHover ${
                i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-apple-surface text-apple-blue shadow-card transition-transform duration-300 group-hover:scale-105">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-apple-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-apple-sub">{item.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14" y={32}>
          <QuoteCalculator />
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-medium text-apple-sub">
            On a client site, this form fires a webhook into GoHighLevel the second they hit
            &ldquo;Get My Free Quote&rdquo;
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
