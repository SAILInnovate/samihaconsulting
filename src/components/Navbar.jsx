import { useEffect, useState } from 'react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Get a quote' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
            scrolled ? 'bg-white shadow-soft' : 'border border-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-sage bg-sage/10 text-navy">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19 L5 5 L19 5" />
                <path d="M9 15 L15 9" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-navy">Samiha Consulting</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-charcoal/70">CAD Drafting</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.slice(0, -1).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-charcoal/70 transition-colors hover:text-navy"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary ml-2 px-5 py-2.5 text-sm">
              Get a quote
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-charcoal/10 text-charcoal md:hidden"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" />}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="mt-2 grid gap-1 rounded-2xl bg-white shadow-card p-3 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal/80 hover:bg-beige"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
