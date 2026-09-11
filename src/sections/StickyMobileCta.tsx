import { Mail } from 'lucide-react'
import { BOOKING, MAILTO } from '@/components/Shared'

/** Sticky bottom CTA bar - mobile only (tradies check phones on job sites) */
export default function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-apple-borderSoft bg-apple-glass px-4 py-3 shadow-sticky backdrop-blur-xl backdrop-saturate-150 md:hidden">
      <div className="flex items-center gap-3">
        <a
          href={MAILTO}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-apple-blue bg-apple-surface px-4 py-3 text-sm font-medium text-apple-blue"
        >
          <Mail className="h-4 w-4" />
          Email Paul
        </a>
        <a
          href={BOOKING}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-full bg-apple-blueSolid px-4 py-3 text-sm font-medium text-white"
        >
          Free Funnel Audit
        </a>
      </div>
    </div>
  )
}
