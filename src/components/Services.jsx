import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services, valueProps } from '../lib/projects.js'

gsap.registerPlugin(ScrollTrigger)

const icons = {
  convert: (
    <path d="M4 8 L9 8 M9 8 L9 4 M9 8 L4 4 M20 16 L15 16 M15 16 L15 20 M15 16 L20 20" />
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12 M5 5 L7 7 M17 17 L19 19 M19 5 L17 7 M7 17 L5 19" />
    </>
  ),
  plan: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M4 9 L20 9 M9 9 L9 20" />
    </>
  ),
}

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const propsRef = useRef([])

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el)
  }
  const addToProps = (el) => {
    if (el && !propsRef.current.includes(el)) propsRef.current.push(el)
  }

  useGSAP(() => {
    gsap.fromTo(cardsRef.current, 
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        }
      }
    )

    gsap.fromTo(propsRef.current, 
      { opacity: 0 },
      {
        opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: {
          trigger: propsRef.current[0],
          start: 'top 90%',
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="OVERFLOW DRAFTING, OFF YOUR DESK"
          subtitle="When senior staff spend hours converting PDFs or tweaking site plans, that is margin walking out the door. Outsource the tedious drafting — keep the talent on design."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.id}
              ref={addToCards}
              className="group relative flex flex-col p-8 bg-white border-2 border-charcoal/10 transition-all duration-200 hover:border-navy hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#0A66C2] active:scale-[0.98] cursor-pointer"
            >
              <div className="mb-6 grid h-12 w-12 place-items-center bg-navy text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  {icons[s.icon]}
                </svg>
              </div>
              <h3 className="text-xl font-bold font-sans text-navy uppercase tracking-tight">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80 font-medium">{s.description}</p>
              <div className="mt-8 flex items-center justify-between border-t-2 border-charcoal/10 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-navy font-mono">
                  {s.deliverable}
                </span>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-charcoal/30 transition-all group-hover:translate-x-2 group-hover:text-green" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12 L19 12 M13 6 L19 12 L13 18" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        {/* value props */}
        <div className="mt-24">
          <div className="mt-8 grid gap-0 border-2 border-charcoal/10 bg-white md:grid-cols-3 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] hover:border-navy group/props">
            {valueProps.map((v, i) => (
              <div
                key={v.title}
                ref={addToProps}
                className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-charcoal/10 group-hover/props:border-navy last:border-0 transition-colors duration-200 hover:bg-charcoal/5"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-[12px] font-bold tracking-widest text-green font-mono uppercase">
                    0{i + 1} //
                  </span>
                  <h4 className="font-sans font-bold text-navy uppercase text-lg">{v.title}</h4>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70 font-medium">{v.body}</p>
              </div>
            ))}
          </div>
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
