import { Droplet, Mail } from 'lucide-react'
import { BOOKING } from '@/components/Shared'

const NAV = [
  { label: 'What I Build', href: '#build' },
  { label: 'Case Studies', href: '#case-study-dj' },
  { label: 'Automations', href: '#automations' },
  { label: 'About', href: '#about' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-ink text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand shadow-cta">
            <Droplet className="h-6 w-6 text-white" strokeWidth={2.5} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[10px] font-bold tracking-[0.2em] text-brand md:text-[11px]">
              GHL FUNNEL ARCHITECT
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BOOKING}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-white shadow-cta transition-transform hover:scale-[1.03] sm:flex"
          >
            <Mail className="h-4 w-4" />
            Free Funnel Audit
          </a>
        </div>
      </div>
    </header>
  )
}
