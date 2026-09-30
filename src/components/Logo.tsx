/** "Code in the chat" mark: chat bubble, < > brackets, cyan sun. viewBox 64×64. */
export const LOGO_BUBBLE_PATH =
  'M14 10H50A8 8 0 0 1 58 18V38A8 8 0 0 1 50 46H30L18 55V46H14A8 8 0 0 1 6 38V18A8 8 0 0 1 14 10Z'
export const LOGO_BRACKET_LEFT = '21,20 14,28 21,36'
export const LOGO_BRACKET_RIGHT = '43,20 50,28 43,36'

type MarkProps = {
  size?: number
  className?: string
  ink?: string
  sun?: string
  strokeWidth?: number
}

export function LogoMark({ size = 24, className, ink = '#F5F5F7', sun = '#00D4FF', strokeWidth = 5 }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={LOGO_BUBBLE_PATH} stroke={ink} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polyline points={LOGO_BRACKET_LEFT} stroke={ink} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={LOGO_BRACKET_RIGHT} stroke={ink} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="28" r="7" fill={sun} />
    </svg>
  )
}

/** Mark + "paulsunny.dev" wordmark. Wordmark hides below `sm`. */
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark size={size} />
      <span className="hidden text-sm font-semibold tracking-[-0.02em] text-apple-ink sm:block">
        paulsunny<span className="text-apple-blue">.dev</span>
      </span>
    </span>
  )
}
