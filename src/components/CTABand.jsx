import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABand() {
  const ctaRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        }
      }
    )
  }, { scope: ctaRef })

  return (
    <section className="relative py-24 bg-white border-t-2 border-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ctaRef}
          className="relative overflow-hidden bg-navy p-12 text-center sm:p-20 border-2 border-navy"
        >
          <div className="relative">
            <p className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] text-green">
              // THE REFRAME
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-balance font-sans text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl uppercase">
              YOUR SENIOR STAFF ARE WASTING MONEY.<br />
              <span className="text-white/60">LET THEM DESIGN.</span>
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <a href="#contact" className="btn-primary !bg-white !text-navy hover:!bg-white/90">START WITH ONE DRAWING</a>
              <a href="#pricing" className="btn-ghost !border-white !text-white hover:!bg-white hover:!text-navy">SEE PRICING</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
