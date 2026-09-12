// scripts/verify.mjs — verifies the built money page (dist/pressure-cleaning-
// website-design.html) against the agreed spec: SEO tags, schema, structure,
// word count, calculator parity with the homepage demo, internal links, and
// sitemap inclusion. Run after `npm run build`.

import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const pagePath = join(dist, 'pressure-cleaning-website-design.html')

let failures = 0
const ok = (label) => console.log(`  PASS  ${label}`)
const fail = (label, detail) => {
  failures++
  console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`)
}
const check = (label, cond, detail) => (cond ? ok(label) : fail(label, detail))

console.log('verify: dist/pressure-cleaning-website-design.html')

if (!existsSync(pagePath)) {
  fail('page exists in dist (run npm run build first)')
  process.exit(1)
}
const html = readFileSync(pagePath, 'utf8')

// --- text helpers -----------------------------------------------------------
const strip = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
const norm = (s) => s.replace(/\s+/g, ' ').trim()
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)
const mainText = mainMatch ? norm(strip(mainMatch[1])) : ''
const words = mainText ? mainText.split(' ') : []

// --- 1. title & meta --------------------------------------------------------
const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
check(
  'exact <title>',
  title === 'Pressure Cleaning Website Design Australia | paulsunnydev',
  `got "${title}"`
)
const desc = (html.match(/<meta name="description" content="([^"]*)">/) || [])[1] || ''
check('meta description: keyword', /pressure cleaning website design/i.test(desc))
check('meta description: AU signal', /australia/i.test(desc))
check('meta description: pricing signal', /\$\d/.test(desc))
check(
  'canonical',
  html.includes('<link rel="canonical" href="https://paulsunnydev.com/pressure-cleaning-website-design.html">')
)
for (const prop of ['og:title', 'og:description', 'og:url', 'og:type']) {
  check(`${prop}`, html.includes(`property="${prop}"`))
}

// --- 2. JSON-LD -------------------------------------------------------------
const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
  (m) => {
    try {
      return JSON.parse(m[1])
    } catch (e) {
      return { __parseError: e.message }
    }
  }
)
const parseErr = blocks.find((b) => b.__parseError)
check('all JSON-LD blocks parse', !parseErr, parseErr && parseErr.__parseError)
const service = blocks.find((b) => b['@type'] === 'Service')
check('Service schema present', Boolean(service))
check(
  'Service schema: areaServed Australia',
  Boolean(service && /australia/i.test(JSON.stringify(service['areaServed'] || '')))
)
const faq = blocks.find((b) => b['@type'] === 'FAQPage')
const faqQs = faq && Array.isArray(faq.mainEntity) ? faq.mainEntity : []
check('FAQPage schema present', Boolean(faq))
check('FAQPage has 5+ questions', faqQs.length >= 5, `${faqQs.length}`)

// --- 3. H1 + first-100-words answer ----------------------------------------
const headingTexts = (tag) =>
  [...html.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) =>
    norm(strip(m[1]))
  )
const h1s = headingTexts('h1')
const h2s = headingTexts('h2')
const h3s = headingTexts('h3')
check('exactly one H1', h1s.length === 1, `${h1s.length}`)
check(
  'H1: keyword + AU signal',
  h1s.length === 1 && /pressure cleaning website design/i.test(h1s[0]) && /australia/i.test(h1s[0]),
  h1s[0]
)
const first100 = words.slice(0, 100).join(' ')
check('first 100 words: cost', /\$1,500/.test(first100))
check('first 100 words: turnaround', /7 days/i.test(first100))
check('first 100 words: inclusions', /includes/i.test(first100))

// --- 4. owner-question H2s ---------------------------------------------------
check('H2: ongoing/monthly costs question', h2s.some((h) => /each month|ongoing/i.test(h)))
check('H2: ownership question', h2s.some((h) => /own/i.test(h)))
check('H2: existing-site question', h2s.some((h) => /already have/i.test(h)))
check('H2: cancellation question', h2s.some((h) => /cancel/i.test(h)))

// --- 5. FAQ section mirrors FAQPage schema -----------------------------------
check('FAQ section (id="faq")', html.includes('id="faq"'))
check('5+ H3 questions in FAQ', h3s.length >= 5, `${h3s.length}`)
const visibleQs = [...h2s, ...h3s].map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
const keyOf = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
const missingOnPage = faqQs.filter(
  (q) => !visibleQs.some((v) => v.includes(keyOf(q.name)) || keyOf(q.name).includes(v))
)
check(
  'every FAQPage question is visible on the page',
  missingOnPage.length === 0,
  missingOnPage.map((q) => q.name).join('; ')
)

// --- 6. word count -----------------------------------------------------------
check('word count 1,200–1,800', words.length >= 1200 && words.length <= 1800, `${words.length} words`)

// --- 7. internal links -------------------------------------------------------
check('links to cost guide', html.includes('href="/guides/pressure-washing-website-cost-australia.html"'))
check('links to homepage', /href="\/"/.test(html) || html.includes('href="/#case-study'))
check('links to guides hub', html.includes('href="/guides/"'))

// --- 8. calculator parity with homepage demo ---------------------------------
for (const svc of [
  'House wash',
  'Driveway & concrete',
  'Roof cleaning',
  'Brick & block cleaning',
  'Gutter cleaning',
]) {
  check(`calculator service: ${svc}`, html.includes(svc))
}
check('calculator rates match homepage', ['rate: 4.5', 'rate: 350', 'rate: 10', 'rate: 6'].every((r) => html.includes(r)))
check('calculator rules: bundle −20% / min $150 / heavy +20%', /0\.2/.test(html) && html.includes('Minimum job $150') && html.includes('data-heavy="1"'))

// --- 9. hygiene ---------------------------------------------------------------
check('no stale /#quote anchors', !html.includes('/#quote'))
check('no localhost links', !/localhost|127\.0\.0\.1/.test(html))

// --- 10. placeholder tokens (report) ------------------------------------------
const tokens = [...new Set([...html.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
console.log(`  INFO  placeholder tokens to fill: ${tokens.map((t) => `{{${t}}}`).join(', ')}`)
check('tokens also listed in HTML comment', html.includes('TODO(Paul)'))

// --- 11. sitemap + assets -----------------------------------------------------
const smPath = join(dist, 'sitemap.xml')
check('sitemap.xml exists', existsSync(smPath))
if (existsSync(smPath)) {
  check('sitemap lists money page', readFileSync(smPath, 'utf8').includes('https://paulsunnydev.com/pressure-cleaning-website-design.html'))
}
check('guides.css present in dist', existsSync(join(dist, 'guides', 'guides.css')))

console.log(failures ? `\nverify: ${failures} check(s) FAILED` : '\nverify: all checks passed')
process.exit(failures ? 1 : 0)
