import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

/** SSR entry for scripts/prerender.mjs — renders the / route to an HTML string. */
export function render(): string {
  return renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>,
  )
}
