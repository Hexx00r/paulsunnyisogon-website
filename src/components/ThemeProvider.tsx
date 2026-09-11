import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

/**
 * Global theme provider.
 *
 * The attribute name and storage key are a contract shared with:
 *  - the blocking inline script in index.html (applies the theme before
 *    first paint, so there is no flash of the wrong theme), and
 *  - the [data-theme="dark"] token scopes in src/index.css.
 * Keep all three in sync.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      storageKey="theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
