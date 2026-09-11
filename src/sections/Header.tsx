import { useEffect, useState } from 'react'
import { Droplet, Mail, Menu, X } from 'lucide-react'
import { BOOKING } from '@/components/Shared'
import ThemeToggle from '@/components/ThemeToggle'

const NAV = [
  { label: 'What I Build', href: '#build' },
  { label: 'Case Studies', href: '#case-study-dj' },
  { label: 'Automations', href: '#automations' },
  { label: 'About', href: '#about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-apple-glassLine bg-apple-glass backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2 text-apple-ink" aria-label="Home">
            <Droplet className="h-5 w-5 text-apple-blue" strokeWidth={2.5} />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Paul Isogon
            </span>
          </a>

          {/* Desktop nav — small, centered */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-normal text-apple-inkSoft transition-colors hover:text-apple-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 text-xs font-normal text-apple-inkSoft transition-colors hover:text-apple-ink md:inline-flex"
              aria-label="Book a free funnel audit"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={BOOKING}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-apple-blueSolid px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-apple-blueDark md:inline-flex"
            >
              Free Funnel Audit
            </a>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center text-apple-ink md:hidden"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — sibling of header (not inside the backdrop-filter
          context, which would trap position:fixed to the header's box) */}
      <div
        className={`fixed inset-x-0 top-12 bottom-0 z-40 bg-apple-glassStrong backdrop-blur-xl backdrop-saturate-150 transition-[opacity,transform] duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pt-6" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-apple-borderSoft py-4 text-2xl font-semibold tracking-tight text-apple-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={BOOKING}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-apple-blueSolid px-6 py-3 text-base font-medium text-white"
          >
            Book a Free Funnel Audit
          </a>
        </nav>
      </div>
    </>
  )
}
