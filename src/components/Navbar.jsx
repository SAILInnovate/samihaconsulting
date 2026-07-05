import { useEffect, useState } from 'react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-0' : 'py-5'
      }`}
    >
      <div className={`mx-auto max-w-7xl transition-all duration-300 ${scrolled ? 'px-0 sm:px-0' : 'px-5 sm:px-8'}`}>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'bg-white/95 backdrop-blur-md border-b-2 border-navy px-5 sm:px-8 py-4' : 'border border-transparent px-4 py-3 bg-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-3">
            <img src="/projects/samihaconsulting.png" alt="Samiha Consulting Logo" className="h-10 w-10 object-contain" />
            <span className="flex flex-col leading-none">
              <span className="font-sans text-[18px] font-extrabold tracking-tight text-navy uppercase">Samiha Consulting</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/50 font-mono mt-0.5">CAD Drafting</span>
            </span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-xs font-bold uppercase tracking-widest text-navy/60 transition-colors hover:text-navy group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-navy transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <div className="flex items-center gap-6 ml-2 border-l-2 border-navy/20 pl-6">
              <a href="#/admin" className="text-[10px] font-mono font-bold uppercase tracking-widest text-navy/50 hover:text-navy transition-colors group relative">
                Already work with us? <span className="text-green">Login //</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-green transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="btn-primary px-6 py-2.5 text-xs">
                Get a quote
              </a>
            </div>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border-2 border-navy text-navy md:hidden transition-all duration-200 hover:bg-navy hover:text-white active:scale-95"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              {open ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" />}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="mt-2 grid gap-1 border-2 border-navy bg-white p-3 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-navy border-b-2 border-charcoal/5 last:border-0 transition-colors hover:bg-navy hover:text-white active:bg-charcoal"
              >
                {l.label}
              </a>
            ))}
             <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 py-4 w-full text-xs">
              Get a quote
            </a>
            <a href="#/admin" onClick={() => setOpen(false)} className="mt-6 mb-2 block text-center text-[10px] font-mono font-bold uppercase tracking-widest text-navy/50 hover:text-navy transition-colors">
              Already work with us? <span className="text-green">Login //</span>
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
