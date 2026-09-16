// scripts/verify.mjs — verifies the built money page (dist/guides/pressure-
// cleaning-website-design.html) against the agreed spec: SEO tags, schema, structure,
// word count, calculator parity with the homepage demo, internal links, and
// sitemap inclusion. Run after `npm run build`.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const pagePath = join(dist, 'guides', 'pressure-cleaning-website-design.html')

let failures = 0
const ok = (label) => console.log(`  PASS  ${label}`)
const fail = (label, detail) => {
  failures++
  console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`)
}
const check = (label, cond, detail) => (cond ? ok(label) : fail(label, detail))

console.log('verify: dist/guides/pressure-cleaning-website-design.html')

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
  html.includes('<link rel="canonical" href="https://paulsunnydev.com/guides/pressure-cleaning-website-design.html">')
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
  check('sitemap lists money page', readFileSync(smPath, 'utf8').includes('https://paulsunnydev.com/guides/pressure-cleaning-website-design.html'))
  check('sitemap excludes root stub', !readFileSync(smPath, 'utf8').includes('https://paulsunnydev.com/pressure-cleaning-website-design.html'))
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

  check('links to money page', g.includes('href="/guides/pressure-cleaning-website-design.html"'))
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
  check('money-page link at /guides/ path', s.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('no stale root money-page link', !s.includes('href="/pressure-cleaning-website-design.html"'))
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

// --- 15. guide #5: get-more-pressure-washing-jobs-without-hipages -------------
const jobsPath = join(dist, 'guides', 'get-more-pressure-washing-jobs-without-hipages.html')
console.log('\nverify: dist/guides/get-more-pressure-washing-jobs-without-hipages.html')
if (!existsSync(jobsPath)) {
  fail('guide #5 exists in dist')
} else {
  const j = readFileSync(jobsPath, 'utf8')
  const jTitle = (j.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    jTitle === 'How to Get More Pressure Washing Jobs Without hipages (2026) | paulsunnydev',
    `got "${jTitle}"`
  )
  check(
    'og:image is the real portrait URL',
    j.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !j.includes('/#quote'))
  check('money-page link at /guides/ path', j.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', j.includes('href="/guides/"'))
  check('links to SEO guide', j.includes('href="/guides/pressure-washing-seo-australia.html"'))
  check('links to cost guide', j.includes('href="/guides/pressure-washing-website-cost-australia.html"'))
  check('links to homepage calculator anchor', j.includes('/#calculator'))

  const jBlocks = [...j.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !jBlocks.find((b) => b.__parseError))
  check('Article schema present', jBlocks.some((b) => b['@type'] === 'Article'))
  const jFaq = jBlocks.find((b) => b['@type'] === 'FAQPage')
  const jFaqQs = jFaq && Array.isArray(jFaq.mainEntity) ? jFaq.mainEntity : []
  check('FAQPage schema with 4 questions', jFaqQs.length === 4, `${jFaqQs.length}`)
  const jH3s = [...j.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const jVisible = jH3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const jKeyOf = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const jMissing = jFaqQs.filter(
    (q) => !jVisible.some((v) => v.includes(jKeyOf(q.name)) || jKeyOf(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    jMissing.length === 0,
    jMissing.map((q) => q.name).join('; ')
  )
  check('unverified GHL range is tokenized', j.includes('{{ghl_all_in_aud}}') && !j.includes('$150–$250'))

  const hub5 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #5', hub5.includes('href="/guides/get-more-pressure-washing-jobs-without-hipages.html"'))
  const jTokens = [...new Set([...j.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  console.log(`  INFO  guide tokens to fill: ${jTokens.map((t) => `{{${t}}}`).join(', ')}`)
  check('tokens listed in HTML comment', j.includes('TODO(Paul)'))
}

// --- 16. guide #6: what-should-a-pressure-washing-website-include -------------
const incPath = join(dist, 'guides', 'what-should-a-pressure-washing-website-include.html')
console.log('\nverify: dist/guides/what-should-a-pressure-washing-website-include.html')
if (!existsSync(incPath)) {
  fail('guide #6 exists in dist')
} else {
  const i6 = readFileSync(incPath, 'utf8')
  const i6Title = (i6.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    i6Title === 'What Should a Pressure Washing Website Include? The 9-Point Checklist (2026) | paulsunnydev',
    `got "${i6Title}"`
  )
  check(
    'og:image is the real portrait URL',
    i6.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !i6.includes('/#quote'))
  check('money-page link at /guides/ path', i6.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('no stale root money-page link', !i6.includes('href="/pressure-cleaning-website-design.html"'))
  check('links to hub', i6.includes('href="/guides/"'))
  check('links to cost guide', i6.includes('href="/guides/pressure-washing-website-cost-australia.html"'))
  check('links to homepage calculator anchor', i6.includes('/#calculator'))

  const i6Blocks = [...i6.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !i6Blocks.find((b) => b.__parseError))
  check('Article schema present', i6Blocks.some((b) => b['@type'] === 'Article'))
  const i6Faq = i6Blocks.find((b) => b['@type'] === 'FAQPage')
  const i6FaqQs = i6Faq && Array.isArray(i6Faq.mainEntity) ? i6Faq.mainEntity : []
  check('FAQPage schema with 4 questions', i6FaqQs.length === 4, `${i6FaqQs.length}`)
  const i6List = i6Blocks.find((b) => b['@type'] === 'ItemList')
  const i6Items = i6List && Array.isArray(i6List.itemListElement) ? i6List.itemListElement : []
  check('ItemList schema with 9 items', i6Items.length === 9, `${i6Items.length}`)

  const i6H2s = [...i6.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => norm(strip(m[1])))
  const i6H3s = [...i6.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const i6Visible = [...i6H2s, ...i6H3s].map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const i6KeyOf = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const i6Missing = i6FaqQs.filter(
    (q) => !i6Visible.some((v) => v.includes(i6KeyOf(q.name)) || i6KeyOf(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    i6Missing.length === 0,
    i6Missing.map((q) => q.name).join('; ')
  )
  const i6MissingItems = i6Items.filter(
    (it) => !i6H3s.some((h) => h.toLowerCase().includes((it.name || '').toLowerCase()))
  )
  check(
    'every ItemList item matches a visible checklist heading',
    i6MissingItems.length === 0,
    i6MissingItems.map((it) => it.name).join('; ')
  )

  const hub6 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #6', hub6.includes('href="/guides/what-should-a-pressure-washing-website-include.html"'))
  check(
    'hub ItemList JSON-LD includes guide #6',
    hub6.includes('"position": 5') && hub6.includes('what-should-a-pressure-washing-website-include.html')
  )
  const sm6 = existsSync(smPath) ? readFileSync(smPath, 'utf8') : ''
  check(
    'sitemap lists guide #6',
    sm6.includes('https://paulsunnydev.com/guides/what-should-a-pressure-washing-website-include.html')
  )
}

// --- 17. guide #7: is-gohighlevel-worth-it-small-business -------------------
const w7Path = join(dist, 'guides', 'is-gohighlevel-worth-it-small-business.html')
console.log('\nverify: dist/guides/is-gohighlevel-worth-it-small-business.html')
if (!existsSync(w7Path)) {
  fail('guide #7 exists in dist')
} else {
  const w7 = readFileSync(w7Path, 'utf8')
  const w7Title = (w7.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w7Title === 'Is GoHighLevel Worth It for a Small Business? An Honest Tradie Review (2026) | paulsunnydev',
    `got "${w7Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w7.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w7.includes('/#quote'))
  check('no em dashes', !w7.includes('—'))
  check('money-page link at /guides/ path', w7.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', w7.includes('href="/guides/"'))
  check('links to pricing guide', w7.includes('href="/guides/gohighlevel-pricing-australia.html"'))
  check('links to GHL tradies guide', w7.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
  check('links to homepage calculator anchor', w7.includes('/#calculator'))
  const w7Blocks = [...w7.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w7Blocks.find((b) => b.__parseError))
  check('Article schema present', w7Blocks.some((b) => b['@type'] === 'Article'))
  const w7Faq = w7Blocks.find((b) => b['@type'] === 'FAQPage')
  const w7FaqQs = w7Faq && Array.isArray(w7Faq.mainEntity) ? w7Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w7FaqQs.length === 5, `${w7FaqQs.length}`)
  const w7H3s = [...w7.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w7Vis = w7H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w7Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w7Missing = w7FaqQs.filter(
    (q) => !w7Vis.some((v) => v.includes(w7Key(q.name)) || w7Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w7Missing.length === 0,
    w7Missing.map((q) => q.name).join('; ')
  )
  const w7Main = w7.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w7Text = w7Main ? norm(strip(w7Main[1])) : ''
  const w7Words = w7Text ? w7Text.split(' ').length : 0
  check('word count 1,200–1,600', w7Words >= 1200 && w7Words <= 1600, `${w7Words} words`)
  const hub7 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #7', hub7.includes('href="/guides/is-gohighlevel-worth-it-small-business.html"'))
}

// --- 18. guide #8: gohighlevel-pricing-australia ----------------------------
const w8Path = join(dist, 'guides', 'gohighlevel-pricing-australia.html')
console.log('\nverify: dist/guides/gohighlevel-pricing-australia.html')
if (!existsSync(w8Path)) {
  fail('guide #8 exists in dist')
} else {
  const w8 = readFileSync(w8Path, 'utf8')
  const w8Title = (w8.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w8Title === 'GoHighLevel Pricing Australia (2026): The Real Cost in AUD | paulsunnydev',
    `got "${w8Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w8.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w8.includes('/#quote'))
  check('no em dashes', !w8.includes('—'))
  check('money-page link at /guides/ path', w8.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', w8.includes('href="/guides/"'))
  check('links to worth-it guide', w8.includes('href="/guides/is-gohighlevel-worth-it-small-business.html"'))
  check('links to GHL tradies guide', w8.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
  check('links to homepage calculator anchor', w8.includes('/#calculator'))
  const w8Blocks = [...w8.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w8Blocks.find((b) => b.__parseError))
  check('Article schema present', w8Blocks.some((b) => b['@type'] === 'Article'))
  const w8Faq = w8Blocks.find((b) => b['@type'] === 'FAQPage')
  const w8FaqQs = w8Faq && Array.isArray(w8Faq.mainEntity) ? w8Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w8FaqQs.length === 5, `${w8FaqQs.length}`)
  const w8H3s = [...w8.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w8Vis = w8H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w8Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w8Missing = w8FaqQs.filter(
    (q) => !w8Vis.some((v) => v.includes(w8Key(q.name)) || w8Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w8Missing.length === 0,
    w8Missing.map((q) => q.name).join('; ')
  )
  const w8Main = w8.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w8Text = w8Main ? norm(strip(w8Main[1])) : ''
  const w8Words = w8Text ? w8Text.split(' ').length : 0
  check('word count 1,200–1,600', w8Words >= 1200 && w8Words <= 1600, `${w8Words} words`)
  const hub8 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #8', hub8.includes('href="/guides/gohighlevel-pricing-australia.html"'))
}

// --- 19. guide #9: how-to-get-more-google-reviews-pressure-washing -----------
const w9Path = join(dist, 'guides', 'how-to-get-more-google-reviews-pressure-washing.html')
console.log('\nverify: dist/guides/how-to-get-more-google-reviews-pressure-washing.html')
if (!existsSync(w9Path)) {
  fail('guide #9 exists in dist')
} else {
  const w9 = readFileSync(w9Path, 'utf8')
  const w9Title = (w9.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w9Title === 'How to Get More Google Reviews for Your Pressure Washing Business (2026) | paulsunnydev',
    `got "${w9Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w9.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w9.includes('/#quote'))
  check('no em dashes', !w9.includes('—'))
  check('money-page link at /guides/ path', w9.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', w9.includes('href="/guides/"'))
  check('links to SEO guide', w9.includes('href="/guides/pressure-washing-seo-australia.html"'))
  check('links to checklist guide', w9.includes('href="/guides/what-should-a-pressure-washing-website-include.html"'))
  check('links to GHL tradies guide', w9.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
  check('links to homepage calculator anchor', w9.includes('/#calculator'))
  const w9Blocks = [...w9.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w9Blocks.find((b) => b.__parseError))
  check('Article schema present', w9Blocks.some((b) => b['@type'] === 'Article'))
  const w9Faq = w9Blocks.find((b) => b['@type'] === 'FAQPage')
  const w9FaqQs = w9Faq && Array.isArray(w9Faq.mainEntity) ? w9Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w9FaqQs.length === 5, `${w9FaqQs.length}`)
  const w9H3s = [...w9.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w9Vis = w9H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w9Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w9Missing = w9FaqQs.filter(
    (q) => !w9Vis.some((v) => v.includes(w9Key(q.name)) || w9Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w9Missing.length === 0,
    w9Missing.map((q) => q.name).join('; ')
  )
  const w9Main = w9.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w9Text = w9Main ? norm(strip(w9Main[1])) : ''
  const w9Words = w9Text ? w9Text.split(' ').length : 0
  check('word count 1,200–1,600', w9Words >= 1200 && w9Words <= 1600, `${w9Words} words`)
  const hub9 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #9', hub9.includes('href="/guides/how-to-get-more-google-reviews-pressure-washing.html"'))
}

// --- 20. guide #10: missed-call-text-back-for-tradies -----------------------
const w10Path = join(dist, 'guides', 'missed-call-text-back-for-tradies.html')
console.log('\nverify: dist/guides/missed-call-text-back-for-tradies.html')
if (!existsSync(w10Path)) {
  fail('guide #10 exists in dist')
} else {
  const w10 = readFileSync(w10Path, 'utf8')
  const w10Title = (w10.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w10Title === 'Missed Call Text Back for Tradies: How It Works and What It Costs (2026) | paulsunnydev',
    `got "${w10Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w10.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w10.includes('/#quote'))
  check('no em dashes', !w10.includes('—'))
  check('money-page link at /guides/ path', w10.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', w10.includes('href="/guides/"'))
  check('links to GHL tradies guide', w10.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
  check('links to pricing guide', w10.includes('href="/guides/gohighlevel-pricing-australia.html"'))
  check('links to homepage calculator anchor', w10.includes('/#calculator'))
  const w10Blocks = [...w10.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w10Blocks.find((b) => b.__parseError))
  check('Article schema present', w10Blocks.some((b) => b['@type'] === 'Article'))
  const w10Faq = w10Blocks.find((b) => b['@type'] === 'FAQPage')
  const w10FaqQs = w10Faq && Array.isArray(w10Faq.mainEntity) ? w10Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w10FaqQs.length === 5, `${w10FaqQs.length}`)
  const w10H3s = [...w10.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w10Vis = w10H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w10Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w10Missing = w10FaqQs.filter(
    (q) => !w10Vis.some((v) => v.includes(w10Key(q.name)) || w10Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w10Missing.length === 0,
    w10Missing.map((q) => q.name).join('; ')
  )
  const w10Main = w10.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w10Text = w10Main ? norm(strip(w10Main[1])) : ''
  const w10Words = w10Text ? w10Text.split(' ').length : 0
  check('word count 1,200–1,600', w10Words >= 1200 && w10Words <= 1600, `${w10Words} words`)
  const hub10 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #10', hub10.includes('href="/guides/missed-call-text-back-for-tradies.html"'))
}

// --- 21. guide #11: why-is-my-pressure-washing-website-not-showing-up-on-google
const w11Path = join(dist, 'guides', 'why-is-my-pressure-washing-website-not-showing-up-on-google.html')
console.log('\nverify: dist/guides/why-is-my-pressure-washing-website-not-showing-up-on-google.html')
if (!existsSync(w11Path)) {
  fail('guide #11 exists in dist')
} else {
  const w11 = readFileSync(w11Path, 'utf8')
  const w11Title = (w11.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w11Title === "Why Isn't My Pressure Washing Website Showing Up on Google? 7 Causes (2026) | paulsunnydev",
    `got "${w11Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w11.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w11.includes('/#quote'))
  check('no em dashes', !w11.includes('—'))
  check('money-page link at /guides/ path', w11.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', w11.includes('href="/guides/"'))
  check('links to SEO guide', w11.includes('href="/guides/pressure-washing-seo-australia.html"'))
  check('links to checklist guide', w11.includes('href="/guides/what-should-a-pressure-washing-website-include.html"'))
  check('links to homepage calculator anchor', w11.includes('/#calculator'))
  const w11Blocks = [...w11.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w11Blocks.find((b) => b.__parseError))
  check('Article schema present', w11Blocks.some((b) => b['@type'] === 'Article'))
  const w11Faq = w11Blocks.find((b) => b['@type'] === 'FAQPage')
  const w11FaqQs = w11Faq && Array.isArray(w11Faq.mainEntity) ? w11Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w11FaqQs.length === 5, `${w11FaqQs.length}`)
  const w11H3s = [...w11.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w11Vis = w11H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w11Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w11Missing = w11FaqQs.filter(
    (q) => !w11Vis.some((v) => v.includes(w11Key(q.name)) || w11Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w11Missing.length === 0,
    w11Missing.map((q) => q.name).join('; ')
  )
  const w11Main = w11.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w11Text = w11Main ? norm(strip(w11Main[1])) : ''
  const w11Words = w11Text ? w11Text.split(' ').length : 0
  check('word count 1,200–1,600', w11Words >= 1200 && w11Words <= 1600, `${w11Words} words`)
  const hub11 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #11', hub11.includes('href="/guides/why-is-my-pressure-washing-website-not-showing-up-on-google.html"'))
}

// --- 22. guide #12: pressure-cleaning-websites-that-book-jobs -----------------
const wbPath = join(dist, 'guides', 'pressure-cleaning-websites-that-book-jobs.html')
console.log('\nverify: dist/guides/pressure-cleaning-websites-that-book-jobs.html')
if (!existsSync(wbPath)) {
  fail('guide exists in dist')
} else {
  const wb = readFileSync(wbPath, 'utf8')
  const wbTitle = (wb.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    wbTitle === 'Pressure Cleaning Websites That Book Jobs: 7 Real Examples (and Why They Convert) (2026) | paulsunnydev',
    `got "${wbTitle}"`
  )
  check(
    'og:image is the real portrait URL',
    wb.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !wb.includes('/#quote'))
  check('no em dashes', !wb.includes('—'))
  check('money-page link at /guides/ path', wb.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('no stale root money-page link', !wb.includes('href="/pressure-cleaning-website-design.html"'))
  check('links to hub', wb.includes('href="/guides/"'))
  check('links to checklist guide', wb.includes('href="/guides/what-should-a-pressure-washing-website-include.html"'))
  check('links to cost guide', wb.includes('href="/guides/pressure-washing-website-cost-australia.html"'))
  check('links to homepage calculator anchor', wb.includes('/#calculator'))
  const wbBlocks = [...wb.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !wbBlocks.find((b) => b.__parseError))
  check('Article schema present', wbBlocks.some((b) => b['@type'] === 'Article'))
  const wbFaq = wbBlocks.find((b) => b['@type'] === 'FAQPage')
  const wbFaqQs = wbFaq && Array.isArray(wbFaq.mainEntity) ? wbFaq.mainEntity : []
  check('FAQPage schema with 4 questions', wbFaqQs.length === 4, `${wbFaqQs.length}`)
  const wbH3s = [...wb.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const wbVis = wbH3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const wbKey = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const wbMissing = wbFaqQs.filter(
    (q) => !wbVis.some((v) => v.includes(wbKey(q.name)) || wbKey(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    wbMissing.length === 0,
    wbMissing.map((q) => q.name).join('; ')
  )
  const wbMain = wb.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const wbText = wbMain ? norm(strip(wbMain[1])) : ''
  const wbWords = wbText ? wbText.split(' ').length : 0
  check('word count 1,200–1,600', wbWords >= 1200 && wbWords <= 1600, `${wbWords} words`)
  const hubWb = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #12', hubWb.includes('href="/guides/pressure-cleaning-websites-that-book-jobs.html"'))
  const smWb = existsSync(smPath) ? readFileSync(smPath, 'utf8') : ''
  check(
    'sitemap lists guide #12',
    smWb.includes('https://paulsunnydev.com/guides/pressure-cleaning-websites-that-book-jobs.html')
  )
  check(
    'checklist guide links back',
    existsSync(incPath) && readFileSync(incPath, 'utf8').includes('href="/guides/pressure-cleaning-websites-that-book-jobs.html"')
  )
  check(
    'money page links back',
    existsSync(pagePath) && readFileSync(pagePath, 'utf8').includes('href="/guides/pressure-cleaning-websites-that-book-jobs.html"')
  )
}

// --- 23. guide #13: how-to-start-a-pressure-washing-business-australia ------
const w13Path = join(dist, 'guides', 'how-to-start-a-pressure-washing-business-australia.html')
console.log('\nverify: dist/guides/how-to-start-a-pressure-washing-business-australia.html')
if (!existsSync(w13Path)) {
  fail('guide #13 exists in dist')
} else {
  const w13 = readFileSync(w13Path, 'utf8')
  const w13Title = (w13.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w13Title === 'How to Start a Pressure Washing Business in Australia (2026): Licences, Costs and Your First 10 Customers | paulsunnydev',
    `got "${w13Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w13.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w13.includes('/#quote'))
  check('no em dashes', !w13.includes('—'))
  check('money-page link at /guides/ path', w13.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('no stale root money-page link', !w13.includes('href="/pressure-cleaning-website-design.html"'))
  check('links to hub', w13.includes('href="/guides/"'))
  check('links to leads guide', w13.includes('href="/guides/pressure-washing-leads-australia.html"'))
  check('links to missed-call guide', w13.includes('href="/guides/missed-call-text-back-pressure-washing.html"'))
  check('links to homepage calculator anchor', w13.includes('/#calculator'))
  const w13Blocks = [...w13.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w13Blocks.find((b) => b.__parseError))
  check('Article schema present', w13Blocks.some((b) => b['@type'] === 'Article'))
  const w13Faq = w13Blocks.find((b) => b['@type'] === 'FAQPage')
  const w13FaqQs = w13Faq && Array.isArray(w13Faq.mainEntity) ? w13Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w13FaqQs.length === 5, `${w13FaqQs.length}`)
  const w13H3s = [...w13.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w13Vis = w13H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w13Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w13Missing = w13FaqQs.filter(
    (q) => !w13Vis.some((v) => v.includes(w13Key(q.name)) || w13Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w13Missing.length === 0,
    w13Missing.map((q) => q.name).join('; ')
  )
  const w13Main = w13.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w13Text = w13Main ? norm(strip(w13Main[1])) : ''
  const w13Words = w13Text ? w13Text.split(' ').length : 0
  check('word count 1,200–1,600', w13Words >= 1200 && w13Words <= 1600, `${w13Words} words`)
  const hub13 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #13', hub13.includes('href="/guides/how-to-start-a-pressure-washing-business-australia.html"'))
  check(
    'hub ItemList JSON-LD includes guide #13',
    hub13.includes('"position": 13') && hub13.includes('how-to-start-a-pressure-washing-business-australia.html')
  )
  const sm13 = existsSync(smPath) ? readFileSync(smPath, 'utf8') : ''
  check(
    'sitemap lists guide #13',
    sm13.includes('https://paulsunnydev.com/guides/how-to-start-a-pressure-washing-business-australia.html')
  )
  const w13Tokens = [...new Set([...w13.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  console.log(`  INFO  guide tokens to fill: ${w13Tokens.map((t) => `{{${t}}}`).join(', ')}`)
  check('tokens listed in HTML comment (or all filled)', w13Tokens.length === 0 || w13.includes('TODO(Paul)'))
}

// --- 24. guide #14: missed-call-text-back-pressure-washing -------------------
const w14Path = join(dist, 'guides', 'missed-call-text-back-pressure-washing.html')
console.log('\nverify: dist/guides/missed-call-text-back-pressure-washing.html')
if (!existsSync(w14Path)) {
  fail('guide #14 exists in dist')
} else {
  const w14 = readFileSync(w14Path, 'utf8')
  const w14Title = (w14.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w14Title === 'Missed Call Text Back for Pressure Washing: How It Works and the Real Monthly Cost (2026) | paulsunnydev',
    `got "${w14Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w14.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w14.includes('/#quote'))
  check('no em dashes', !w14.includes('—'))
  check('loss math is tokenized, no hardcoded monthly figure', !w14.includes('$3,840'))
  check('money-page link at /guides/ path', w14.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('links to hub', w14.includes('href="/guides/"'))
  check('links to tradies missed-call guide', w14.includes('href="/guides/missed-call-text-back-for-tradies.html"'))
  check('links to pricing guide', w14.includes('href="/guides/gohighlevel-pricing-australia.html"'))
  check('links to CRM guide', w14.includes('href="/guides/best-crm-pressure-washing-australia.html"'))
  check('links to homepage calculator anchor', w14.includes('/#calculator'))
  const w14Blocks = [...w14.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w14Blocks.find((b) => b.__parseError))
  check('Article schema present', w14Blocks.some((b) => b['@type'] === 'Article'))
  const w14Faq = w14Blocks.find((b) => b['@type'] === 'FAQPage')
  const w14FaqQs = w14Faq && Array.isArray(w14Faq.mainEntity) ? w14Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w14FaqQs.length === 5, `${w14FaqQs.length}`)
  const w14H3s = [...w14.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w14Vis = w14H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w14Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w14Missing = w14FaqQs.filter(
    (q) => !w14Vis.some((v) => v.includes(w14Key(q.name)) || w14Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w14Missing.length === 0,
    w14Missing.map((q) => q.name).join('; ')
  )
  const w14Main = w14.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w14Text = w14Main ? norm(strip(w14Main[1])) : ''
  const w14Words = w14Text ? w14Text.split(' ').length : 0
  check('word count 1,200–1,600', w14Words >= 1200 && w14Words <= 1600, `${w14Words} words`)
  const hub14 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #14', hub14.includes('href="/guides/missed-call-text-back-pressure-washing.html"'))
  check(
    'hub ItemList JSON-LD includes guide #14',
    hub14.includes('"position": 14') && hub14.includes('missed-call-text-back-pressure-washing.html')
  )
  const sm14 = existsSync(smPath) ? readFileSync(smPath, 'utf8') : ''
  check(
    'sitemap lists guide #14',
    sm14.includes('https://paulsunnydev.com/guides/missed-call-text-back-pressure-washing.html')
  )
  const w14Tokens = [...new Set([...w14.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  console.log(`  INFO  guide tokens to fill: ${w14Tokens.map((t) => `{{${t}}}`).join(', ')}`)
  check('tokens listed in HTML comment (or all filled)', w14Tokens.length === 0 || w14.includes('TODO(Paul)'))
}

// --- 25. guide #15: best-crm-pressure-washing-australia ----------------------
const w15Path = join(dist, 'guides', 'best-crm-pressure-washing-australia.html')
console.log('\nverify: dist/guides/best-crm-pressure-washing-australia.html')
if (!existsSync(w15Path)) {
  fail('guide #15 exists in dist')
} else {
  const w15 = readFileSync(w15Path, 'utf8')
  const w15Title = (w15.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w15Title === 'Best CRM for Pressure Washing in Australia (2026): GHL vs Jobber vs ServiceM8 vs Housecall Pro | paulsunnydev',
    `got "${w15Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w15.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w15.includes('/#quote'))
  check('no em dashes', !w15.includes('—'))
  check('money-page link at /guides/ path', w15.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('no stale root money-page link', !w15.includes('href="/pressure-cleaning-website-design.html"'))
  check('links to hub', w15.includes('href="/guides/"'))
  check('links to pricing guide', w15.includes('href="/guides/gohighlevel-pricing-australia.html"'))
  check('links to GHL tradies guide', w15.includes('href="/guides/gohighlevel-for-tradies-australia.html"'))
  check('links to worth-it guide', w15.includes('href="/guides/is-gohighlevel-worth-it-small-business.html"'))
  check('links to missed-call pressure washing guide', w15.includes('href="/guides/missed-call-text-back-pressure-washing.html"'))
  check('links to homepage calculator anchor', w15.includes('/#calculator'))
  const w15Blocks = [...w15.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w15Blocks.find((b) => b.__parseError))
  check('Article schema present', w15Blocks.some((b) => b['@type'] === 'Article'))
  const w15Faq = w15Blocks.find((b) => b['@type'] === 'FAQPage')
  const w15FaqQs = w15Faq && Array.isArray(w15Faq.mainEntity) ? w15Faq.mainEntity : []
  check('FAQPage schema with 5 questions', w15FaqQs.length === 5, `${w15FaqQs.length}`)
  const w15H3s = [...w15.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w15Vis = w15H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w15Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w15Missing = w15FaqQs.filter(
    (q) => !w15Vis.some((v) => v.includes(w15Key(q.name)) || w15Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w15Missing.length === 0,
    w15Missing.map((q) => q.name).join('; ')
  )
  const w15Main = w15.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w15Text = w15Main ? norm(strip(w15Main[1])) : ''
  const w15Words = w15Text ? w15Text.split(' ').length : 0
  check('word count 1,200–1,600', w15Words >= 1200 && w15Words <= 1600, `${w15Words} words`)
  const hub15 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #15', hub15.includes('href="/guides/best-crm-pressure-washing-australia.html"'))
  check(
    'hub ItemList JSON-LD includes guide #15',
    hub15.includes('"position": 15') && hub15.includes('best-crm-pressure-washing-australia.html')
  )
  const sm15 = existsSync(smPath) ? readFileSync(smPath, 'utf8') : ''
  check(
    'sitemap lists guide #15',
    sm15.includes('https://paulsunnydev.com/guides/best-crm-pressure-washing-australia.html')
  )
  const w15Tokens = [...new Set([...w15.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  console.log(`  INFO  guide tokens to fill: ${w15Tokens.map((t) => `{{${t}}}`).join(', ')}`)
  check('tokens listed in HTML comment (or all filled)', w15Tokens.length === 0 || w15.includes('TODO(Paul)'))
}

// --- 26. guide #16: pressure-washing-leads-australia --------------------------
const w16Path = join(dist, 'guides', 'pressure-washing-leads-australia.html')
console.log('\nverify: dist/guides/pressure-washing-leads-australia.html')
if (!existsSync(w16Path)) {
  fail('guide #16 exists in dist')
} else {
  const w16 = readFileSync(w16Path, 'utf8')
  const w16Title = (w16.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
  check(
    'exact <title>',
    w16Title === 'Pressure Washing Leads Australia (2026): Every Channel Ranked by Cost per Booked Job | paulsunnydev',
    `got "${w16Title}"`
  )
  check(
    'og:image is the real portrait URL',
    w16.includes('property="og:image" content="https://paulsunnydev.com/images/portrait.jpg"')
  )
  check('no /#quote anchors', !w16.includes('/#quote'))
  check('no em dashes', !w16.includes('—'))
  check('money-page link at /guides/ path', w16.includes('href="/guides/pressure-cleaning-website-design.html"'))
  check('no stale root money-page link', !w16.includes('href="/pressure-cleaning-website-design.html"'))
  check('links to hub', w16.includes('href="/guides/"'))
  check('links to without-hipages guide', w16.includes('href="/guides/get-more-pressure-washing-jobs-without-hipages.html"'))
  check('links to SEO guide', w16.includes('href="/guides/pressure-washing-seo-australia.html"'))
  check('links to missed-call guide', w16.includes('href="/guides/missed-call-text-back-pressure-washing.html"'))
  check('links to start-a-business guide', w16.includes('href="/guides/how-to-start-a-pressure-washing-business-australia.html"'))
  check('links to homepage calculator anchor', w16.includes('/#calculator'))
  const w16Blocks = [...w16.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      try {
        return JSON.parse(m[1])
      } catch (e) {
        return { __parseError: e.message }
      }
    }
  )
  check('all JSON-LD blocks parse', !w16Blocks.find((b) => b.__parseError))
  const w16Service = w16Blocks.find((b) => b['@type'] === 'Service')
  check('Service schema present (no Article)', Boolean(w16Service) && !w16Blocks.some((b) => b['@type'] === 'Article'))
  check(
    'Service schema: areaServed Australia',
    Boolean(w16Service && /australia/i.test(JSON.stringify(w16Service['areaServed'] || '')))
  )
  const w16Faq = w16Blocks.find((b) => b['@type'] === 'FAQPage')
  const w16FaqQs = w16Faq && Array.isArray(w16Faq.mainEntity) ? w16Faq.mainEntity : []
  check('FAQPage schema with 4 questions', w16FaqQs.length === 4, `${w16FaqQs.length}`)
  const w16H3s = [...w16.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => norm(strip(m[1])))
  const w16Vis = w16H3s.map((q) => q.toLowerCase().replace(/[?.]/g, '').trim())
  const w16Key = (q) => (q || '').toLowerCase().replace(/[?.]/g, '').trim()
  const w16Missing = w16FaqQs.filter(
    (q) => !w16Vis.some((v) => v.includes(w16Key(q.name)) || w16Key(q.name).includes(v))
  )
  check(
    'every FAQPage question is visible on the page',
    w16Missing.length === 0,
    w16Missing.map((q) => q.name).join('; ')
  )
  const w16Main = w16.match(/<main[^>]*>([\s\S]*?)<\/main>/)
  const w16Text = w16Main ? norm(strip(w16Main[1])) : ''
  const w16Words = w16Text ? w16Text.split(' ').length : 0
  check('word count 1,200–1,600', w16Words >= 1200 && w16Words <= 1600, `${w16Words} words`)
  const hub16 = existsSync(hubPath) ? readFileSync(hubPath, 'utf8') : ''
  check('hub links to guide #16', hub16.includes('href="/guides/pressure-washing-leads-australia.html"'))
  check(
    'hub ItemList JSON-LD includes guide #16',
    hub16.includes('"position": 16') && hub16.includes('pressure-washing-leads-australia.html')
  )
  const sm16 = existsSync(smPath) ? readFileSync(smPath, 'utf8') : ''
  check(
    'sitemap lists guide #16',
    sm16.includes('https://paulsunnydev.com/guides/pressure-washing-leads-australia.html')
  )
  const w16Tokens = [...new Set([...w16.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  console.log(`  INFO  guide tokens to fill: ${w16Tokens.map((t) => `{{${t}}}`).join(', ')}`)
  check('tokens listed in HTML comment (or all filled)', w16Tokens.length === 0 || w16.includes('TODO(Paul)'))
}

// --- 27. dist-wide hygiene: no stale anchors or wrong paths -------------------
const css = readFileSync(join(dist, 'guides', 'guides.css'), 'utf8')
check('btn-primary text is black', /\.btn-primary\s*\{[^}]*color:\s*#000000/.test(css))
check('prose link color excludes .btn', css.includes('.prose a:not(.btn)'))

const htmlFiles = []
;(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.html')) htmlFiles.push(p)
  }
})(dist)
const stubPath = join(dist, 'pressure-cleaning-website-design.html')
check('root stub exists', existsSync(stubPath))
const offenders = []
for (const f of htmlFiles) {
  const rel = relative(dist, f)
  const c = readFileSync(f, 'utf8')
  if (c.includes('/#quote')) offenders.push(`${rel}: /#quote`)
  if (rel === 'pressure-cleaning-website-design.html') {
    // root stub: must redirect to the /guides/ canonical URL and stay out of the index
    if (!c.includes('url=/guides/pressure-cleaning-website-design.html')) offenders.push(`${rel}: stub missing redirect`)
    if (!c.includes('noindex')) offenders.push(`${rel}: stub missing noindex`)
  } else if (c.includes('href="/pressure-cleaning-website-design.html"')) {
    offenders.push(`${rel}: stale root money-page link`)
  }
}
check('dist-wide: no /#quote, stub redirects, no stale money-page links', offenders.length === 0, offenders.join('; '))

console.log(failures ? `\nverify: ${failures} check(s) FAILED` : '\nverify: all checks passed')
process.exit(failures ? 1 : 0)
