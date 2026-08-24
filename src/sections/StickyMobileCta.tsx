import { Mail } from 'lucide-react'
import { BOOKING, MAILTO } from '@/components/Shared'

/** Sticky bottom CTA bar - mobile only (tradies check phones on job sites) */
export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-aquadeep bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <a
          href={MAILTO}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand bg-white px-4 py-3 font-display text-sm font-bold text-brand"
        >
          <Mail className="h-4 w-4" />
          Email Paul
        </a>
        <a
          href={BOOKING}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-full bg-brand px-4 py-3 font-display text-sm font-bold text-white shadow-cta"
        >
          Free Funnel Audit
        </a>
      </div>
    </div>
  )
}
