import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../lib/projects.js'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el)
  }

  useGSAP(() => {
    gsap.fromTo(cardsRef.current, 
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="PLANNING & CAD DRAFTING"
          subtitle="Specialized in accurate, clean, and fully editable AutoCAD floor plans. Whether you're building from the ground up and need planning permission, or converting sketches and PDFs—we provide the scaled drawings you need to get approved."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.id}
              ref={addToCards}
              className="group relative flex flex-col p-6 sm:p-8 bg-white border-2 border-charcoal/10 transition-all duration-200 hover:border-navy hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#0A66C2] active:scale-[0.98] cursor-pointer"
            >
              <div className="mb-4 text-green font-mono text-[12px] font-bold tracking-widest uppercase">
                // 0{i + 1}
              </div>
              <h3 className="text-lg font-bold font-sans text-navy uppercase tracking-tight leading-snug">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80 font-medium">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="section-label">{eyebrow}</span>
      <h2 className="mt-6 text-balance font-sans text-3xl font-extrabold tracking-tight text-navy sm:text-4xl uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-balance text-lg leading-relaxed text-charcoal/80 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  )
}
