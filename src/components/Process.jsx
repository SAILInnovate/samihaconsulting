import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from './Services.jsx'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    n: '01',
    title: 'SEND FILE',
    body: 'Upload a hand sketch, scanned PDF, or marked-up old drawing. No need to tidy it — that is my job.',
  },
  {
    n: '02',
    title: 'SCOPE & QUOTE',
    body: 'Within one working day you receive a fixed project price. 50% deposit secures your slot.',
  },
  {
    n: '03',
    title: 'DRAFTING',
    body: 'Your drawing is built to scale with strict coordinates, dimensional limits and BS 1192 compliant layering.',
  },
  {
    n: '04',
    title: 'DELIVERY',
    body: 'A clean, fully layered .dwg lands in your inbox — typically within 48 hours. Revisions included.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const stepsRef = useRef([])

  const addToSteps = (el) => {
    if (el && !stepsRef.current.includes(el)) stepsRef.current.push(el)
  }

  useGSAP(() => {
    gsap.fromTo(stepsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: {
          trigger: stepsRef.current[0],
          start: 'top 85%',
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="process" ref={sectionRef} className="relative py-24 bg-white border-t-2 border-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Workflow"
          title="FROM SKETCH TO DWG IN 4 STEPS"
          subtitle="A rigid, predictable workflow designed for busy practices. No retainers, no hourly billing surprises."
        />

        <div className="relative mt-20">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-[2px] bg-navy md:block" />
          <div className="grid gap-10 md:grid-cols-4 relative z-10">
            {steps.map((s, i) => (
              <div key={s.n} ref={addToSteps} className="relative group bg-white border-2 border-navy p-6 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#0A66C2] active:scale-[0.98] cursor-pointer">
                <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center border-2 border-navy bg-white font-mono text-[14px] font-bold tracking-widest text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  {s.n}
                </div>
                <h3 className="font-sans text-xl font-extrabold text-navy uppercase tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/90 font-medium">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
