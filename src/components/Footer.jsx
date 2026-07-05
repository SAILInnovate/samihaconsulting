export default function Footer() {
  return (
    <footer className="relative border-t-2 border-navy py-12 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src="/projects/samihaconsulting.png" alt="Samiha Consulting Logo" className="h-10 w-10 object-contain" />
            <div className="leading-none">
              <div className="font-sans text-[18px] font-extrabold tracking-tight text-navy uppercase">Samiha Consulting</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/50 font-mono mt-0.5">CAD Drafting</div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest text-navy/60 font-mono">
            <a href="#services" className="hover:text-navy hover:underline underline-offset-4">Services</a>
            <a href="#portfolio" className="hover:text-navy hover:underline underline-offset-4">Portfolio</a>
            <a href="#process" className="hover:text-navy hover:underline underline-offset-4">Process</a>
            <a href="#pricing" className="hover:text-navy hover:underline underline-offset-4">Pricing</a>
            <a href="#contact" className="hover:text-navy hover:underline underline-offset-4">Contact</a>
            <a href="https://www.linkedin.com/in/samiha-ali-491618243/" target="_blank" rel="noopener noreferrer" className="hover:text-navy hover:underline underline-offset-4">LinkedIn</a>
          </nav>

          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal/40">
            © {new Date().getFullYear()} Samiha Consulting. Built precise.
          </div>
        </div>

        <div className="mt-8 h-[2px] bg-charcoal/10" />
        <p className="mt-6 text-center text-[12px] font-mono uppercase tracking-widest leading-relaxed text-charcoal/40 font-bold">
          A small design error can result in major structural or mechanical problems.<br className="hidden sm:block" />
          The precise application of coordinates and dimensions guarantees safe and
          flawless project execution.
        </p>
      </div>
    </footer>
  )
}
