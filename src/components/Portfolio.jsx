import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../lib/projects.js'
import { SectionHeading } from './Services.jsx'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { id: 'all', label: 'All work' },
  { id: 'mechanical', label: 'Mechanical' },
  { id: 'architectural', label: 'Architectural' },
  { id: 'civil', label: 'Civil' },
]

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const visible = projects.filter((p) => filter === 'all' || p.discipline === filter)

  useGSAP(() => {
    gsap.fromTo(gridRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        }
      }
    )
  }, { scope: sectionRef })

  // Fade in on filter change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      )
    }
  }, [filter])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 bg-beige border-t-2 border-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Before & After"
          title="FROM MESSY SKETCH TO CLEAN DWG"
          subtitle="See how we transform rough concepts and old PDFs into strict, layered CAD drawings."
        />

        {/* filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`pb-2 text-[12px] font-bold uppercase tracking-widest transition-all duration-200 border-b-2 font-mono hover:-translate-y-0.5 active:scale-95 ${
                filter === c.id
                  ? 'border-navy text-navy'
                  : 'border-transparent text-charcoal/50 hover:text-navy hover:border-charcoal/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <div ref={gridRef} className="mt-12 grid gap-8 sm:grid-cols-2">
          {visible.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group relative flex flex-col text-left border-2 border-navy bg-white transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] active:scale-[0.98]"
            >
              <div className="relative overflow-hidden h-[300px] w-full bg-charcoal/5 border-b-2 border-navy">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-green font-mono">
                      // {p.category}
                    </div>
                    <h3 className="mt-2 font-sans text-2xl font-bold text-navy uppercase">{p.title}</h3>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-transparent border-2 border-navy transition-all group-hover:bg-navy text-navy group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M7 17 L17 7 M9 7 L17 7 L17 15" />
                    </svg>
                  </span>
                </div>
                <p className="mt-4 line-clamp-2 text-sm text-charcoal/80 font-medium max-w-sm">{p.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.specs.map((s) => (
                    <span key={s} className="bg-charcoal/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-navy font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] grid place-items-center bg-navy/95 p-4 backdrop-blur-sm transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-white flex flex-col md:flex-row border-2 border-navy"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-white border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <path d="M6 6 L18 18 M18 6 L6 18" />
              </svg>
            </button>

            <div className="w-full md:w-[55%] h-64 md:h-[600px] flex flex-row bg-charcoal/5 border-b-2 md:border-b-0 md:border-r-2 border-navy">
              {/* Before image placeholder */}
              <div className="flex-1 border-r-2 border-navy relative bg-charcoal/10 flex items-center justify-center overflow-hidden">
                <span className="font-mono text-[10px] font-bold text-navy/40 uppercase tracking-widest absolute text-center px-4">[Before Image Pending]</span>
                <div className="absolute top-4 left-4 bg-navy text-white font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                  BEFORE
                </div>
              </div>
              
              {/* After image */}
              <div className="flex-1 relative overflow-hidden">
                <img src={active.image} alt={active.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-green text-navy font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                  AFTER
                </div>
              </div>
            </div>

            <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-white">
              <div className="text-[12px] font-bold uppercase tracking-widest text-green font-mono">
                // {active.category}
              </div>
              <h3 className="mt-3 font-sans text-3xl font-extrabold text-navy uppercase">{active.title}</h3>
              <p className="mt-6 text-base leading-relaxed text-charcoal/90 font-medium">{active.detail}</p>

              <div className="mt-10 border-t-2 border-charcoal/10 pt-8">
                <div className="flex flex-col gap-3">
                  {active.specs.map((s) => (
                    <span key={s} className="text-[11px] font-bold uppercase tracking-widest text-navy font-mono">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <a href="#contact" onClick={() => setActive(null)} className="btn-primary w-full text-[14px]">
                  Request a similar project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
