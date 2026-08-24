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
  const [selected, setSelected] = useState<Record<string, boolean>>({ driveway: true })
  const [areas, setAreas] = useState<Record<string, string>>({ driveway: '100' })
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
    <div className="overflow-hidden rounded-[18px] border border-aquadeep bg-white shadow-card-hover">
      <div className="border-b border-aqua px-6 py-5 md:px-8">
        <h3 className="font-display text-xl font-extrabold text-ink md:text-2xl">
          Try the calculator - <span className="text-brand">live demo</span>
        </h3>
        <p className="mt-1 text-sm">
          Same pricing logic I wire into client funnels. Tick services, type an area, watch the
          estimate update.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-aqua px-4 py-1.5 text-xs font-bold text-brand">
          ⏱ Booking up fast - spring wash season is our busiest time
        </p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
        {/* service picker */}
        <div className="p-6 md:p-8">
          <p className="font-display text-sm font-bold text-ink">
            What needs doing? <span className="font-normal text-slatebody">(tick all that apply)</span>
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const on = Boolean(selected[s.id])
              return (
                <div
                  key={s.id}
                  className={`rounded-[14px] border-2 p-4 transition-colors ${
                    on ? 'border-brand bg-aqua/60' : 'border-aquadeep bg-white hover:border-brand/50'
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => setSelected((p) => ({ ...p, [s.id]: e.target.checked }))}
                      className="mt-1 h-4 w-4 accent-[#00AEEF]"
                    />
                    <span>
                      <span className="block font-display text-sm font-bold text-ink">
                        {s.emoji} {s.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-slatebody">{s.hint}</span>
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
                      className="mt-3 w-full rounded-lg border border-aquadeep bg-white px-3 py-2 text-sm text-ink placeholder:text-slatebody/60 focus:border-brand"
                      aria-label={`${s.name} area in ${s.unit}`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <p className="mt-6 font-display text-sm font-bold text-ink">How dirty is it?</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(['Normal build-up', 'Heavy staining'] as const).map((label, i) => {
              const active = heavy === (i === 1)
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setHeavy(i === 1)}
                  className={`rounded-full border-2 px-4 py-2.5 font-display text-sm font-bold transition-colors ${
                    active
                      ? 'border-brand bg-aqua text-brand'
                      : 'border-aquadeep bg-white text-slatebody hover:border-brand/50'
                  }`}
                  aria-pressed={active}
                >
                  {label}
                  {i === 1 && <span className="ml-1 text-xs font-semibold">(+20%)</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* instant estimate panel */}
        <div className="flex flex-col bg-ink p-6 text-white md:p-8">
          <p className="font-display text-xs font-bold tracking-[0.25em] text-brand">
            INSTANT ESTIMATE
          </p>
          <p className="mt-2 font-display text-5xl font-extrabold">
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
                <span className="font-display font-bold">{l.tbc ? 'TBC' : money(l.total)}</span>
              </li>
            ))}
            {heavy && calc.lines.length > 0 && (
              <li className="flex items-baseline justify-between gap-3 text-white/60">
                <span>Heavy staining (+20%)</span>
                <span className="font-display font-bold">+{money(calc.heavyAdj)}</span>
              </li>
            )}
            {calc.bundle > 0 && (
              <li className="flex items-baseline justify-between gap-3 text-brand">
                <span>Bundle discount (2+ services, −20%)</span>
                <span className="font-display font-bold">−{money(calc.bundle)}</span>
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
    <section id="build" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kicker>What I build</Kicker>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          The complete <span className="text-brand">lead-to-job</span> machine.
        </h2>
        <p className="mt-4 max-w-2xl text-lg">
          Not a landing page and a prayer - a full system: front-end funnel, pricing logic, CRM
          pipeline, follow-up, booking, and reviews.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUILD_ITEMS.map((item) => (
            <article
              key={item.title}
              className="group rounded-[18px] border border-aquadeep bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-aqua text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <QuoteCalculator />
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm font-semibold text-slatebody">
            On a client site, this form fires a webhook into GoHighLevel the second they hit
            &ldquo;Get My Free Quote&rdquo;
            <ArrowRight className="h-4 w-4 text-brand" />
          </p>
        </div>
      </div>
    </section>
  )
}
