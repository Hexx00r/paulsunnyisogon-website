import { LOGO_BRACKET_LEFT, LOGO_BRACKET_RIGHT, LOGO_BUBBLE_PATH } from '@/components/Logo'

/**
 * Hero signature animation: the logo builds itself once on load.
 *   1. bubble outline draws (stroke-dashoffset)
 *   2. < > brackets slide in from the sides
 *   3. cyan sun rises (scale + fade), then one soft glow pulse
 *
 * Pure CSS (classes live in index.css under "logo-draw"): no JS, so it runs
 * straight from the prerendered HTML and always ends on the full logo. Only
 * transform, opacity and stroke-dashoffset are animated. Reduced-motion users
 * get the final frame with no motion. The box has a fixed size: no layout shift.
 */
export default function LogoDraw({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={`logo-draw ${className}`}
      role="img"
      aria-label="paulsunny.dev logo: a chat bubble with code brackets and a sun"
    >
      {/* glow sits behind the sun; blur is static, only opacity animates */}
      <circle className="ld-glow" cx="32" cy="28" r="11" fill="#00D4FF" />
      <path
        className="ld-bubble"
        d={LOGO_BUBBLE_PATH}
        pathLength={1}
        stroke="#F5F5F7"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <polyline
        className="ld-bracket ld-bracket-l"
        points={LOGO_BRACKET_LEFT}
        stroke="#F5F5F7"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        className="ld-bracket ld-bracket-r"
        points={LOGO_BRACKET_RIGHT}
        stroke="#F5F5F7"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="ld-sun" cx="32" cy="28" r="6.5" fill="#00D4FF" />
    </svg>
  )
}
