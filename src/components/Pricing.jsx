import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from './Services.jsx'

gsap.registerPlugin(ScrollTrigger)

const tiers = [
  {
    name: 'PER PROJECT',
    tag: 'One-off tasks',
    price: '£90',
    unit: 'BASE PRICE',
    desc: 'Fixed-price quote based on file complexity. Ideal for offloading a single messy PDF or sketch.',
    features: ['PDF to DWG conversion', 'BS 1192 compliant', 'Scaled & dimensioned', '1 round of revisions', '48h typical turnaround'],
    cta: 'Get a fixed quote',
    highlight: false,
  },
  {
    name: 'DAY RATE',
    tag: 'Batch conversions',
    price: '£180',
    unit: 'PER DAY',
    desc: 'A full day of dedicated drafting. Perfect for practices that need to clear a backlog of old paper plans.',
    features: ['Up to 8 standard drawings', 'Same-day progress updates', 'Priority booking queue', 'Cost-effective for bulk', 'Direct communication'],
    cta: 'Reserve drafting day',
    highlight: true,
  },
  {
    name: 'RETAINER',
    tag: 'Growing practices',
    price: 'CUSTOM',
    unit: 'MONTHLY',
    desc: 'Your outsourced CAD Manager. Guarantees priority drafting hours and complete document control.',
    features: ['Guaranteed overflow hours', 'Workspace standardisation', 'Master .dwt management', 'Centralised block library', 'Zero time searching files'],
    cta: 'Discuss retainer',
    highlight: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)
  const tiersRef = useRef([])

  const addToTiers = (el) => {
    if (el && !tiersRef.current.includes(el)) tiersRef.current.push(el)
  }

  useGSAP(() => {
    gsap.fromTo(tiersRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: {
          trigger: tiersRef.current[0],
          start: 'top 85%',
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="pricing" ref={sectionRef} className="relative py-24 bg-white border-t-2 border-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="TRANSPARENT, FIXED FEES"
          subtitle="No unpredictable hourly bills. Pay for the exact outcome you need. 50% deposit secures your slot, balance due on approval."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              ref={addToTiers}
              className={`relative flex flex-col p-8 border-2 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#0A66C2] active:scale-[0.98] ${
                t.highlight ? 'border-navy bg-navy text-white' : 'border-charcoal/10 bg-white hover:border-navy text-navy'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3.5 left-8 border-2 border-navy bg-green px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white font-mono">
                  // MOST POPULAR
                </span>
              )}
              <div className={`text-[12px] font-bold uppercase tracking-widest font-mono ${t.highlight ? 'text-white/60' : 'text-charcoal/50'}`}>
                {t.tag}
              </div>
              <h3 className={`mt-2 font-sans text-3xl font-extrabold tracking-tight ${t.highlight ? 'text-white' : 'text-navy'}`}>{t.name}</h3>

              <div className="mt-6 flex flex-col gap-0 border-b-2 border-current pb-4">
                <span className={`font-mono text-5xl font-bold ${t.highlight ? 'text-white' : 'text-navy'}`}>{t.price}</span>
                <span className={`mt-2 text-[12px] font-bold uppercase tracking-widest font-mono ${t.highlight ? 'text-white/70' : 'text-charcoal/60'}`}>{t.unit}</span>
              </div>
              <p className={`mt-6 text-sm leading-relaxed font-medium ${t.highlight ? 'text-white/90' : 'text-charcoal/90'}`}>{t.desc}</p>

              <ul className="mt-8 flex-1 space-y-4">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 text-sm font-bold ${t.highlight ? 'text-white/80' : 'text-charcoal/80'}`}>
                    <svg viewBox="0 0 24 24" className={`mt-0.5 h-4 w-4 shrink-0 ${t.highlight ? 'text-green' : 'text-navy'}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-10 justify-center w-full ${t.highlight ? 'btn-ghost border-white text-white hover:bg-white hover:text-navy' : 'btn-primary'}`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
