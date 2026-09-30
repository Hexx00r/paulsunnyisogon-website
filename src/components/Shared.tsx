import type { ReactNode } from 'react'

export const EMAIL = 'paulsunnyisogon@gmail.com'
export const MAILTO = `mailto:${EMAIL}?subject=Free%20Funnel%20Website%20Audit%20Request`
/** Free spec-demo offer. Links carry DEMO_CHAT_PREFILL in data-pdc-chat so public/chat.js
 * opens the chat pre-filled; DEMO_MAILTO is the href used without JS and as the email fallback. */
export const DEMO_CHAT_PREFILL = "I'd like a free demo rebuild of my website: [your site URL]"
export const DEMO_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Free demo rebuild request')}&body=${encodeURIComponent('My current website: \nMy business and suburb: \n')}`
export const YOUTUBE = 'https://youtu.be/BoxC1hGvrZo?si=PS-OS4KbCIEolAGV'
export const BOOKING = 'https://api.leadconnectorhq.com/widget/booking/3VFHT95QH0s3uIZ7ED9H'
// Old filename (Paul-Sunny-Isogon-Resume.pdf) is kept in public/ as a copy so existing links still work.
export const RESUME = 'Paul-Sunny-Isogon-Jr-Resume.pdf'

/**
 * Section label — all-caps, 12px, wide tracking, muted gray.
 * ("WHAT I BUILD", "CASE STUDY 01", "TRY THE CALCULATOR")
 */
export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.05em] ${
        light ? 'text-white/60' : 'text-apple-sub'
      }`}
    >
      {children}
    </p>
  )
}

/** Cyan text link with an arrow that nudges right on hover */
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
      className={`group inline-flex items-center gap-1.5 text-apple-blue transition-colors hover:text-apple-blueDark ${className}`}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="h-3 w-3 fill-current transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M4.5 1.5 9 6l-4.5 4.5-1-1L7 6 3.5 2.5z" />
      </svg>
    </a>
  )
}

/** Screenshot framed as a sleek dark device bezel (browser-style) */
export function BrowserShot({
  src,
  alt,
  url,
  width,
  height,
  className = '',
  imgClassName = '',
}: {
  src: string
  alt: string
  url?: string
  /** Natural pixel size — recommended (prevents layout shift) but optional. */
  width?: number
  height?: number
  className?: string
  /** Optional extra classes for the img itself (e.g. fixed-height object-cover crop). */
  imgClassName?: string
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[18px] border border-apple-hairline bg-black shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-apple-borderSoft bg-apple-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-apple-trafficRed" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-apple-trafficYellow" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-apple-trafficGreen" aria-hidden="true" />
        {url && (
          <span className="ml-3 truncate rounded-full bg-apple-gray px-3 py-0.5 text-[11px] font-medium text-apple-sub">
            {url}
          </span>
        )}
      </div>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className={`block h-auto w-full ${imgClassName}`} />
    </figure>
  )
}

/** "Code in the chat" mark. Solid variant fills the bubble (for use on the cyan chat button). */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M14 10 H50 A8 8 0 0 1 58 18 V38 A8 8 0 0 1 50 46 H30 L18 55 V46 H14 A8 8 0 0 1 6 38 V18 A8 8 0 0 1 14 10 Z"
        stroke="#F5F5F7"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <polyline points="21,20 14,28 21,36" stroke="#F5F5F7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="43,20 50,28 43,36" stroke="#F5F5F7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="28" r="7" fill="#00D4FF" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="text-[15px] font-semibold" style={{ letterSpacing: '-0.5px' }}>
      <span style={{ color: '#F5F5F7' }}>paulsunny</span>
      <span style={{ color: '#00D4FF' }}>.dev</span>
    </span>
  )
}
