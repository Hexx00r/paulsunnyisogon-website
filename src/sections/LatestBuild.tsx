import { ArrowUpRight, Info } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { BrowserShot } from '@/components/Shared'
import { latestBuild } from '@/site.config'

/**
 * "Latest Build" showcase — sits directly below the Hero on the homepage.
 * All content comes from the `latestBuild` object in site.config.ts; this
 * component never hardcodes project-specific copy.
 */
export default function LatestBuild() {
  const build = latestBuild

  return (
    <section id="latest-build" className="relative scroll-mt-16 overflow-hidden bg-apple-surface">
      {/* Faint cyan glow echoing the hero's radial, anchored on the screenshot side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 28% 50%, rgb(0 212 255 / 0.06), transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:min-h-screen lg:grid-cols-2 lg:gap-20 lg:py-28">
        {/* LEFT — real full-page screenshot in the CSS browser frame, cyan glow */}
        <Reveal>
          <a
            href={build.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative block"
            aria-label={`Open the ${build.name} live demo`}
          >
            {/* Glow ring sits behind the frame (BrowserShot is relative) */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-[22px] border border-[rgb(0_212_255/0.25)] shadow-[0_0_80px_rgb(0_212_255/0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_110px_rgb(0_212_255/0.25)]"
            />
            <BrowserShot
              src={build.screenshot.src}
              alt={build.screenshot.alt}
              url={build.screenshot.barUrl}
              width={build.screenshot.width}
              height={build.screenshot.height}
              className="relative max-h-[65vh]"
            />
          </a>
        </Reveal>

        {/* RIGHT — eyebrow, headline, honesty pill, proof chips, CTAs */}
        <div>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-apple-blue">
              {build.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-apple-ink">
              {build.name}
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-5 max-w-lg text-[19px] leading-[1.5] text-apple-sub">{build.pitch}</p>
          </Reveal>

          <Reveal delay={200}>
            {/* Honesty pill — the demo is a fictional business; the label stays. */}
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-apple-sub">
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {build.honestyPill}
            </p>
          </Reveal>

          <Reveal delay={250}>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {build.proofChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-[rgb(0_212_255/0.35)] px-3.5 py-1.5 text-sm font-medium text-apple-blue"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={build.primaryCta.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                {build.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={build.secondaryCta.href} className="btn-secondary">
                {build.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
