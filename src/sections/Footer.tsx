import { Droplet } from 'lucide-react'
import { BOOKING, EMAIL, MAILTO, YOUTUBE } from '@/components/Shared'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'What I Build', href: '#build' },
      { label: 'Case Study: DJ Property', href: '#case-study-dj' },
      { label: 'Case Study: Melbourne HPC', href: '#case-study-melbourne' },
      { label: 'The Automation Engine', href: '#automations' },
    ],
  },
  {
    title: 'Work with me',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services & Availability', href: '#services' },
      { label: 'Book a Free Funnel Audit', href: BOOKING },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: EMAIL, href: MAILTO },
      { label: 'Watch the demo', href: YOUTUBE },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-apple-gray pb-28 pt-14 md:pb-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2 text-apple-ink">
          <Droplet className="h-5 w-5 text-apple-blue" strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight">Paul Isogon</span>
        </div>

        <nav className="mt-10 grid gap-8 border-b border-apple-hairline pb-10 sm:grid-cols-3" aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-apple-ink">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-xs text-apple-sub transition-colors hover:text-apple-ink hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-apple-sub md:flex-row md:items-center">
          <p>
            Copyright © 2026 Paul Sunny Isogon Jr · Philippines · Serving Australia, US &amp; UK
            remotely
          </p>
          <p>Instant-quote funnels + GHL automations for pressure cleaning &amp; trade businesses</p>
        </div>
      </div>
    </footer>
  )
}
