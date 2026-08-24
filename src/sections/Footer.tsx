import { Droplet, Mail } from 'lucide-react'
import { EMAIL, MAILTO } from '@/components/Shared'

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-14 text-white md:pb-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand">
              <Droplet className="h-6 w-6 text-white" strokeWidth={2.5} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[10px] font-bold tracking-[0.2em] text-brand">
                GHL FUNNEL ARCHITECT
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={MAILTO}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-white transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" />
              {EMAIL}
            </a>

          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <p>© 2026 Paul Sunny Isogon Jr · Philippines · Serving Australia, US &amp; UK remotely</p>
          <p>Instant-quote funnels + GHL automations for pressure cleaning &amp; trade businesses</p>
        </div>
      </div>
    </footer>
  )
}
