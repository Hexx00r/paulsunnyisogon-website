import type { CSSProperties } from 'react'
import portrait from '@/assets/portrait.jpg'
import { Kicker } from '@/components/Shared'
import { TechIcon } from '@/components/TechIcons'
import { TECH_ICONS } from '@/lib/tech-icons'
import Reveal from '@/components/Reveal'

const GITHUB_URL = 'https://github.com/Hexx00r'

/** "Tools I build with" — icon from Simple Icons, or a text badge when no icon exists. */
const TOOLS: { name: string; label: string; badge?: string }[] = [
  { name: 'JavaScript', label: 'JavaScript' },
  { name: 'TypeScript', label: 'TypeScript' },
  { name: 'Python', label: 'Python' },
  { name: 'React', label: 'React' },
  { name: 'Node.js', label: 'Node.js' },
  { name: 'n8n', label: 'n8n' },
  { name: 'Cloudflare', label: 'Cloudflare' },
  { name: 'Make', label: 'Make' },
  // Not on Simple Icons — rendered as a text badge.
  { name: 'GoHighLevel', label: 'GoHighLevel', badge: 'GHL' },
]

function ToolItem({ name, label, badge }: { name: string; label: string; badge?: string }) {
  const icon = TECH_ICONS[name]
  return (
    <li
      className="group flex w-[68px] flex-col items-center gap-1.5 text-center"
      style={{ '--brand': `#${icon?.hex ?? '6e6e73'}` } as CSSProperties}
    >
      {icon && !badge ? (
        <TechIcon
          name={name}
          className="h-7 w-7 text-apple-sub transition-colors duration-200 group-hover:text-[color:var(--brand)]"
        />
      ) : (
        <span className="flex h-7 items-center rounded-md border border-apple-hairline px-1.5 text-[9px] font-semibold uppercase tracking-wide text-apple-sub transition-colors duration-200 group-hover:border-apple-blueMist group-hover:text-apple-blue">
          {badge ?? label}
        </span>
      )}
      <span className="text-[11px] leading-tight text-apple-sub">{label}</span>
    </li>
  )
}

export default function WhyMe() {
  return (
    <section id="about" className="scroll-mt-16 bg-apple-gray py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <img
            src={portrait}
            alt="Paul Sunny Isogon Jr"
            loading="lazy"
            className="w-full rounded-[32px] object-cover shadow-card-hover"
          />
          <span className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full bg-apple-invert px-5 py-2 text-sm font-medium text-white">
            Tradie brain. Developer hands.
          </span>
        </Reveal>

        <div>
          <Reveal>
            <Kicker>Why me</Kicker>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-apple-ink md:text-5xl">
              Built for my own family first. <span className="text-apple-blue">Then for yours.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-apple-sub">
              I&apos;m <strong className="font-semibold text-apple-ink">Paul Sunny Isogon Jr</strong>. I
              built the complete GHL automation system for my own family&apos;s property &amp; cleaning
              services business - DJ Property &amp; Cleaning Services, Albury–Wodonga, Australia. I know
              what it&apos;s like to miss a call because you&apos;re on the truck. That&apos;s why I design
              systems that work when you can&apos;t.
            </p>
            <p className="mt-4 leading-relaxed text-apple-sub">
              I&apos;m a full-stack developer - I build what template builders can&apos;t:
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-sm font-semibold text-apple-ink">Tools I build with</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-5">
              {TOOLS.map((tool) => (
                <ToolItem key={tool.name} {...tool} />
              ))}
            </ul>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-apple-blueSolid px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-apple-blueDark"
            >
              <TechIcon name="GitHub" className="h-4 w-4" />
              See my open-source blueprints
            </a>
            <p className="mt-6 leading-relaxed text-apple-sub">
              I don&apos;t just set up GHL. I design the entire lead-to-revenue flow - frontend funnel +
              backend automation + pipeline logic. And I learned it by building it for my own family
              first.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
