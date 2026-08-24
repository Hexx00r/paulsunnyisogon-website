import type { ReactNode } from 'react'

export const EMAIL = 'paulsunnyisogon@gmail.com'
export const MAILTO = `mailto:${EMAIL}?subject=Free%20Funnel%20Audit%20Request`
export const YOUTUBE = 'https://youtu.be/BoxC1hGvrZo?si=PS-OS4KbCIEolAGV'
export const BOOKING = 'https://api.leadconnectorhq.com/widget/booking/3VFHT95QH0s3uIZ7ED9H'

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-display text-xs md:text-sm font-bold tracking-[0.25em] uppercase flex items-center gap-3 ${
        light ? 'text-brand' : 'text-brand'
      }`}
    >
      <span className="inline-block h-[2px] w-8 bg-brand rounded-full" aria-hidden="true" />
      {children}
    </p>
  )
}

/** Screenshot framed as a browser window */
export function BrowserShot({
  src,
  alt,
  url,
  className = '',
}: {
  src: string
  alt: string
  url?: string
  className?: string
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[18px] border border-aquadeep bg-white shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-aqua bg-[#F5FEFF] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-aqua px-3 py-0.5 text-[11px] font-semibold text-slatebody">
            {url}
          </span>
        )}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </figure>
  )
}
