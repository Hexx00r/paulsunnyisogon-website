// scripts/verify.mjs — verifies the built money page (dist/pressure-cleaning-
// website-design.html) against the agreed spec: SEO tags, schema, structure,
// word count, calculator parity with the homepage demo, internal links, and
// sitemap inclusion. Run after `npm run build`.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
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

// --- 12. guide #3: gohighlevel-for-tradies-australia ------------------------
const guidePath = join(dist, 'guides', 'gohighlevel-for-tradies-australia.html')
console.log('\nverify: dist/guides/gohighlevel-for-tradies-australia.html')
if (!existsSync(guidePath)) {
  fail('guide exists in dist')
} else {
  const g = readFileSync(guidePath, 'utf8')
  const gTitle = (g.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    gTitle === 'GoHighLevel for Tradies Australia (2026 Guide) | paulsunnydev',
    `got "${gTitle}"`
  )
  const gDesc = (g.match(/<meta name="description" content="([^"]*)">/) || [])[1] || ''
  check('meta description: keyword', /gohighlevel/i.test(gDesc))
  check('meta description: AU signal', /australia/i.test(gDesc))
  check('meta description: cost signal', /\$\d|\{\{ghl/.test(gDesc))
  check(
    'canonical',
    g.includes('<link rel="canonical" href="https://paulsunnydev.com/guides/gohighlevel-for-tradies-australia.html">')
  )

  const gBlocks = [...g.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !gBlocks.find((b) => b.__parseError))
  const article = gBlocks.find((b) => b['@type'] === 'Article')
  check('Article schema present', Boolean(article))
  check(
    'Article author is Paul Isogon',
    Boolean(article && /paul isogon/i.test(JSON.stringify(article.author || '')))
  )
  check(
    'Article datePublished is a real date',
    Boolean(article && /^\d{4}-\d{2}-\d{2}$/.test(article.datePublished || '')),
    article && article.datePublished
  )
  const gFaq = gBlocks.find((b) => b['@type'] === 'FAQPage')
  const gFaqQs = gFaq && Array.isArray(gFaq.mainEntity) ? gFaq.mainEntity : []
  check('FAQPage schema present', Boolean(gFaq))
  check('FAQPage has 5 questions', gFaqQs.length === 5, `${gFaqQs.length}`)

  const gMain = g.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const gText = gMain ? norm(strip(gMain[1])) : ''
  const gWords = gText ? gText.split(' ') : []
  check('word count 1,200–1,600', gWords.length >= 1200 && gWords.length <= 1600, `${gWords.length} words`)
  const gFirst100 = gWords.slice(0, 100).join(' ')
  check(
    'first 100 words: direct answer + monthly cost',
    /gohighlevel/i.test(gFirst100) && /month/i.test(gFirst100) && /ghl_monthly_aud|\$\d/.test(gFirst100)
  )

  check('links to money page', g.includes('href="/pressure-cleaning-website-design.html"'))
  check('links to cost guide', g.includes('href="/guides/pressure-washing-website-cost-australia.html"'))
  check('links to hub', g.includes('href="/guides/"'))

  const gH2s = [...g.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => norm(strip(m[1])))
  const gH3s = [...g.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const gVisible = [...gH2s, ...gH3s].map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const gKeyOf = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const gMissing = gFaqQs.filter(
    (q) => !gVisible.some((v) => v.includes(gKeyOf(q.name)) || gKeyOf(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    gMissing.length === 0,
    gMissing.map((q) => q.name).join('; ')
  )

  for (const img of ['wf-quote.webp', 'wf-followup.webp', 'wf-review.webp']) {
    check(`screenshot ${img} in dist`, existsSync(join(dist, 'guides', 'img', img)))
  }
  check('no stale /#quote anchors', !g.includes('/#quote'))
  const gTokens = [...new Set([...g.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  console.log(`  INFO  guide tokens to fill: ${gTokens.map((t) => `{{${t}}}`).join(', ')}`)
  check('tokens listed in HTML comment', g.includes('TODO(Paul)'))
}

// --- 13. hub lists guide #3 ---------------------------------------------------
const hubPath = join(dist, 'guides', 'index.html')
if (!existsSync(hubPath)) {
  fail('hub exists in dist')
} else {
  const hub = readFileSync(hubPath, 'utf8')
  check('hub links to guide #3', hub.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
}

// --- 14. guide #4: pressure-washing-seo-australia ----------------------------
const seoPath = join(dist, 'guides', 'pressure-washing-seo-australia.html')
console.log('\nverify: dist/guides/pressure-washing-seo-australia.html')
if (!existsSync(seoPath)) {
  fail('guide #4 exists in dist')
} else {
  const s = readFileSync(seoPath, 'utf8')
  const sTitle = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    sTitle === 'Pressure Washing SEO in Australia (2026): The Local Guide That Actually Applies Here | paulsunnydev',
    `got "${sTitle}"`
  )
  check(
    'og:image is the real portrait URL',
    s.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('portrait.jpg copied to dist', existsSync(join(dist, 'images', 'portrait.jpg')))
  check('no /#quote anchors', !s.includes('/#quote'))
  check('money-page link at ROOT path', s.includes('href="/pressure-cleaning-website-design.html"'))
  check('no wrong-path money-page link', !s.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', s.includes('href="/guides/"'))
  check('links to cost guide', s.includes('href="/guides/pressure-washing-website-cost-australia.html"'))
  check('links to GHL guide', s.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
  check('links to homepage calculator anchor', s.includes('/#calculator'))

  const sBlocks = [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !sBlocks.find((b) => b.__parseError))
  check('Article schema present', sBlocks.some((b) => b['@type'] === 'Article'))
  const sFaq = sBlocks.find((b) => b['@type'] === 'FAQPage')
  const sFaqQs = sFaq && Array.isArray(sFaq.mainEntity) ? sFaq.mainEntity : []
  check('FAQPage schema with 4 questions', sFaqQs.length === 4, `${sFaqQs.length}`)
  const sH3s = [...s.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const sVisible = sH3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const sKeyOf = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const sMissing = sFaqQs.filter(
    (q) => !sVisible.some((v) => v.includes(sKeyOf(q.name)) || sKeyOf(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    sMissing.length === 0,
    sMissing.map((q) => q.name).join('; ')
  )

  const hub4 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #4', hub4.includes('href="/guides/pressure-washing-seo-australia.html"'))
}

// --- 15. dist-wide hygiene: no stale anchors or wrong paths -------------------
const htmlFiles = []
;(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.html')) htmlFiles.push(p)
  }
})(dist)
const offenders = []
for (const f of htmlFiles) {
  const c = readFileSync(f, 'utf8')
  if (c.includes('/#quote')) offenders.push(`${relative(dist, f)}: /#quote`)
  if (c.includes('/guides/pressure-cleaning-website-design')) offenders.push(`${relative(dist, f)}: wrong money-page path`)
}
check('dist-wide: no /#quote or wrong money-page paths', offenders.length === 0, offenders.join('; '))

console.log(failures ? `\nverify: ${failures} check(s) FAILED` : '\nverify: all checks passed')
process.exit(failures ? 1 : 0)
