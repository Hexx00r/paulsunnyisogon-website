import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

/**
 * Sun/moon theme toggle for the header.
 *
 * This is a pure client-side render (Vite SPA, no SSR), so next-themes has
 * already resolved the theme from localStorage on the very first render —
 * no mounted/hydration guard needed. next-themes persists the choice
 * (localStorage key "theme"); while the stored value is "system" the toggle
 * follows the OS preference.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-apple-ink transition-colors hover:bg-apple-gray"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
