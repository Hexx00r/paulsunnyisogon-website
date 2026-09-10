import { BadgeCheck } from 'lucide-react'
import { BrowserShot, Kicker } from '@/components/Shared'
import Reveal from '@/components/Reveal'
import djHero from '@/assets/dj-hero.webp'
import djFamily from '@/assets/dj-family.webp'
import djReviews from '@/assets/dj-reviews.webp'

const PROOF_POINTS = [
  'Dark green / gold brand identity - cream backgrounds, family-first copy',
  'Two-step quote calculator with per-m² service pricing',
  '\u201cHow it works\u201d 3-step section that kills phone-tag objections',
  'Family photo section: \u201cA real Albury–Wodonga family - not a call centre.\u201d',
  'Local reviews section + sticky \u201cGet My Free Quote\u201d CTA footer',
]

export default function CaseStudyDJ() {
  return (
    <section id="case-study-dj" className="scroll-mt-16 bg-apple-gray py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>Case study 01 · My family business</Kicker>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
            I didn&apos;t learn GHL from a course.{' '}
            <span className="text-apple-blue">
              I built this for my family&apos;s business.
            </span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-apple-sub">
            <strong className="font-semibold text-apple-ink">DJ Property &amp; Cleaning Services</strong>,
            Albury–Wodonga, NSW/VIC. My family&apos;s pressure cleaning business. I built the entire
            GHL system from scratch - funnel, workflows, pipelines, review automation - because I was
            tired of watching leads slip through the cracks while my parents were on the job.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {PROOF_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-apple-ink">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-apple-blue" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal as="div">
            <BrowserShot
              src={djHero}
              alt="DJ Property & Cleaning funnel hero - dark green design with two-step quote form"
              url="djcleaning.example/quote"
            />
          </Reveal>
          <Reveal as="div" delay={100}>
            <BrowserShot
              src={djFamily}
              alt="DJ Property & Cleaning - how it works and family photo section"
              url="djcleaning.example/quote#family"
            />
          </Reveal>
        </div>
        <Reveal className="mt-5">
          <BrowserShot
            src={djReviews}
            alt="DJ Property & Cleaning - reviews and final CTA footer"
            url="djcleaning.example/quote#reviews"
            className="lg:mx-auto lg:max-w-4xl"
          />
        </Reveal>

        <Reveal delay={100}>
          <blockquote className="mt-10 rounded-[28px] bg-white p-8 shadow-card">
            <p className="text-lg font-semibold leading-snug text-apple-ink md:text-xl">
              &ldquo;If it&apos;s got our name on it, it gets done right. That&apos;s the only way we
              work.&rdquo;
            </p>
            <footer className="mt-3 text-sm font-medium text-apple-sub">
              - The family behind DJ Property &amp; Cleaning (yes, those are my parents on the site)
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
