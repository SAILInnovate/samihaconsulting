export default function Footer() {
  return (
    <footer className="relative border-t border-charcoal/10 py-12 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-sage/40 bg-sage/10 text-navy">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19 L5 5 L19 5" />
                <path d="M9 15 L15 9" />
              </svg>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold text-navy">Samiha Consulting</div>
              <div className="text-[11px] text-charcoal/60">Freelance AutoCAD drafting · UK</div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-charcoal/60">
            <a href="#services" className="hover:text-navy">Services</a>
            <a href="#portfolio" className="hover:text-navy">Portfolio</a>
            <a href="#process" className="hover:text-navy">Process</a>
            <a href="#pricing" className="hover:text-navy">Pricing</a>
            <a href="#contact" className="hover:text-navy">Contact</a>
          </nav>

          <div className="text-xs text-charcoal/50">
            © {new Date().getFullYear()} Samiha Consulting. Built precise.
          </div>
        </div>

        <div className="mt-8 hairline" />
        <p className="mt-6 text-center text-[11px] leading-relaxed text-charcoal/50">
          A small design error can result in major structural or mechanical problems.
          The precise application of coordinates and dimensions guarantees safe and
          flawless project execution.
        </p>
      </div>
    </footer>
  )
}
