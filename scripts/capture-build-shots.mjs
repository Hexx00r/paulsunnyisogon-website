// scripts/capture-build-shots.mjs — captures the real screenshots used by the
// "Latest Build" showcase and demo-fleet row. Re-run after any demo site
// changes so the frames stay truthful. Real screenshots only — never mockups.
//
// Run:  node scripts/capture-build-shots.mjs

import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const OUT_DIR = fileURLToPath(new URL('../public/images/builds', import.meta.url))
mkdirSync(OUT_DIR, { recursive: true })

// [url, fullPageFile|null, thumbFile, thumbHeight, blurBeforeAfter]
const TARGETS = [
  ['https://gawler-dental-demo.pages.dev', 'gawler-place-dental.jpg', 'gawler-place-dental-thumb.jpg', 960, true],
  ['https://sydney-jet-wash.pages.dev', null, 'sydney-jet-wash-thumb.jpg', 960, false],
]

// Patient before/after photos must never appear on paulsunnydev.com. Blur
// every image inside any section that carries Before/After slider labels.
function blurBeforeAfterPhotos() {
  for (const section of document.querySelectorAll('section')) {
    const text = section.textContent || ''
    if (!/\bbefore\b/i.test(text) || !/\bafter\b/i.test(text)) continue
    for (const el of section.querySelectorAll('img, picture, video, canvas, [style*="background-image"]')) {
      el.style.filter = 'blur(28px)'
    }
  }
}

const browser = await chromium.launch()
try {
  for (const [url, fullFile, thumbFile, thumbHeight, blurBeforeAfter] of TARGETS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } })
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(1500) // let hero/entrance animations settle
    if (blurBeforeAfter) await page.evaluate(blurBeforeAfterPhotos)

    if (fullFile) {
      await page.screenshot({ path: `${OUT_DIR}/${fullFile}`, type: 'jpeg', quality: 82, fullPage: true })
      console.log(`full-page -> ${fullFile}`)
    }

    await page.setViewportSize({ width: 1440, height: thumbHeight })
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT_DIR}/${thumbFile}`, type: 'jpeg', quality: 82 })
    console.log(`thumbnail -> ${thumbFile}`)
    await page.close()
  }
} finally {
  await browser.close()
}
