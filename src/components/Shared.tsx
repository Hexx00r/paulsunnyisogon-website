import type { ReactNode } from 'react'

export const EMAIL = 'paulsunnyisogon@gmail.com'
export const MAILTO = `mailto:${EMAIL}?subject=Free%20Funnel%20Audit%20Request`
export const YOUTUBE = 'https://youtu.be/BoxC1hGvrZo?si=PS-OS4KbCIEolAGV'
export const BOOKING = 'https://api.leadconnectorhq.com/widget/booking/3VFHT95QH0s3uIZ7ED9H'
export const RESUME = 'Paul-Sunny-Isogon-Resume.pdf'

/** Apple-style eyebrow label */
export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] md:text-sm ${
        light ? 'text-apple-blueAlt' : 'text-apple-blue'
      }`}
    >
      {children}
    </p>
  )
}

/** Apple-style "Learn more >" link */
export function LinkArrow({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1 text-apple-blue hover:underline ${className}`}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="h-3 w-3 fill-current transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path d="M4.5 1.5 9 6l-4.5 4.5-1-1L7 6 3.5 2.5z" />
      </svg>
    </a>
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
      className={`overflow-hidden rounded-2xl border border-apple-hairline bg-apple-surface shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-apple-gray bg-apple-gray px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-apple-trafficRed" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-apple-trafficYellow" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-apple-trafficGreen" aria-hidden="true" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-apple-surface px-3 py-0.5 text-[11px] font-medium text-apple-sub">
            {url}
          </span>
        )}
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </figure>
  )
}
