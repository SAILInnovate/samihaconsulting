import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const container = useRef(null)
  const imageRef = useRef(null)
  const textRefs = useRef([])

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el)
    }
  }

  useGSAP(() => {
    gsap.fromTo(
      textRefs.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', delay: 0.05 }
    )

    gsap.fromTo(
      imageRef.current,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
  }, { scope: container })

  return (
    <section id="top" ref={container} className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="hero-grid" />
      <div className="absolute inset-0 bg-white/80 z-0" /> {/* Grid fade */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* copy */}
          <div>
            <div className="mt-8 overflow-hidden pb-2">
              <h1 ref={addToRefs} className="text-balance font-sans text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl uppercase">
                PROFESSIONAL CAD<br />
                <span className="text-navy/70">& FLOOR PLANS</span>
              </h1>
            </div>

            <div className="mt-8 overflow-hidden">
              <p ref={addToRefs} className="max-w-xl text-balance text-xl leading-relaxed text-charcoal font-medium">
                Expertly scaled floor plans and architectural drawings for ground-up builds and planning permission. We transform sketches and PDFs into accurate, fully editable AutoCAD DWG files.
              </p>
            </div>

            <div className="mt-10 overflow-hidden">
              <div ref={addToRefs} className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#contact" className="btn-primary group w-full sm:w-auto">
                  Get a Quote
                  <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12 L19 12 M13 6 L19 12 L13 18" />
                  </svg>
                </a>
                <a href="#process" className="btn-ghost w-full sm:w-auto">Upload Your Drawing</a>
              </div>
            </div>

            <div className="mt-12 overflow-hidden">
              <div ref={addToRefs} className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-widest text-charcoal/70 uppercase font-bold">
                {['Accurate Tracing', 'Clean Geometry', 'Editable DWG'].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-green" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* image viewport */}
          <div className="relative w-[75%] max-w-[280px] sm:max-w-[340px] aspect-square sm:aspect-[4/5] mx-auto lg:mr-0 lg:ml-auto overflow-hidden border-2 border-navy group self-center">
            <img 
              ref={imageRef}
              src="/projects/profilepicsamihamakesmaller.png" 
              alt="Samiha - Professional Consulting"
              fetchPriority="high"
              className="w-full h-full object-cover object-bottom grayscale group-hover:grayscale-0 transition-all duration-1000 block"
            />
            {/* Technical tag to make it feel intentional */}
            <div className="absolute top-0 right-0 bg-navy text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              ID:SC-01
            </div>
            <div className="absolute bottom-0 left-0 bg-green text-navy font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-widest border-t-2 border-r-2 border-navy">
              DRAFTER
            </div>
          </div>
        </div>

        {/* hook strip */}
        <div className="mt-24 grid gap-0 border-2 border-navy bg-white sm:grid-cols-3 rounded-sm transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#0A66C2]">
          {[
            { stat: '100%', label: 'Editable Geometry' },
            { stat: '48h', label: 'Typical Turnaround' },
            { stat: '1:1', label: 'True Scale Accuracy' },
          ].map((s) => (
            <div key={s.label} className="px-8 py-10 text-center sm:text-left border-b-2 sm:border-b-0 sm:border-r-2 border-navy last:border-0 relative overflow-hidden group hover:bg-navy transition-colors duration-200">
              <div className="font-mono text-5xl font-bold text-navy group-hover:text-green transition-colors duration-200">{s.stat}</div>
              <div className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal group-hover:text-white transition-colors duration-200">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
