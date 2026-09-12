import { Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'
import melbHero from '@/assets/melb-hero.webp'
import quotePdf from '@/assets/quote-sample.pdf'

export default function CaseStudyMelbourne() {
  return (
    <section
      id="case-study-melbourne"
      className="relative scroll-mt-16 overflow-hidden bg-apple-surface"
    >
      {/* Full-bleed case-study hero */}
      <img
        src={melbHero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Darken the shot to 40% brightness so the copy stays crisp */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/60" />
      {/* Fade the image into the page background at the bottom edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-[#0a0a0a]"
      />

      <div className="relative mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <Reveal>
          <Kicker light>Case study 02</Kicker>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-apple-ink">
            Same system, <span className="text-apple-blue">different skin.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-[1.5] text-apple-sub">
            <strong className="font-semibold text-apple-ink">Melbourne High Pressure Cleaning</strong> -
            San Remo &amp; greater Melbourne. A complete rebrand and funnel build with a light
            cyan/blue aesthetic, proving the system works across markets and brand identities, not
            just one lucky design.
          </p>
        </Reveal>

        <Reveal delay={300}>
          {/* Styled like Shared's LinkArrow, but as a plain anchor so the
              download attribute and filename are preserved */}
          <a
            href={quotePdf}
            download="Melbourne-HPC-Quote-Sample.pdf"
            className="group mt-9 inline-flex items-center gap-1.5 text-[19px] text-apple-blue transition-colors hover:text-apple-blueDark"
          >
            Download the sample quote
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="h-3 w-3 fill-current transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M4.5 1.5 9 6l-4.5 4.5-1-1L7 6 3.5 2.5z" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
