// scripts/build.mjs — postbuild step: generate dist/sitemap.xml by scanning
// the built HTML pages. Base URL comes from public/CNAME. lastmod dates are
// real: the last git commit touching each page's source file, falling back to
// file mtime for files not yet committed.

import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const base = `https://${readFileSync(join(root, 'public', 'CNAME'), 'utf8').trim()}`

const htmlFiles = []
;(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.html')) htmlFiles.push(p)
  }
})(dist)

// Last git commit date (ISO) touching any of the given repo-relative paths,
// or null when the path is untracked or git is unavailable.
function gitDate(relPaths) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...relPaths], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || null
  } catch {
    return null
  }
}

// Pages whose canonical URL drops the .html extension — matches how the site
// refers to them (see the "Rename thank-you page to /booked" commit).
const CLEAN_ROUTES = { 'booked.html': '/booked' }

function toRoute(rel) {
  if (rel in CLEAN_ROUTES) return CLEAN_ROUTES[rel]
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`
  return `/${rel}`
}

function lastmodFor(rel, absDistPath) {
  const candidates =
    rel === 'index.html'
      ? ['index.html', 'src']
      : rel === 'guides/pressure-cleaning-website-design.html'
        ? [`public/${rel}`, 'public/pressure-cleaning-website-design.html']
        : [`public/${rel}`]
  const iso = gitDate(candidates)
  const date = iso ? new Date(iso) : statSync(absDistPath).mtime
  return date.toISOString().slice(0, 10)
}

const urls = htmlFiles
  .map((p) => relative(dist, p).split('\\').join('/')) // windows-safe rel paths
  .filter((rel) => rel !== '404.html' && rel !== 'pressure-cleaning-website-design.html')
  .map((rel) => ({
    loc: base + toRoute(rel),
    lastmod: lastmodFor(rel, join(dist, rel)),
    rel,
  }))
  .sort((a, b) =>
    a.rel === 'index.html' ? -1 : b.rel === 'index.html' ? 1 : a.rel.localeCompare(b.rel)
  )

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`

writeFileSync(join(dist, 'sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} URLs`)
for (const u of urls) console.log(`  ${u.lastmod}  ${u.loc}`)
