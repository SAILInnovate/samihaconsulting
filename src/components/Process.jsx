import { motion } from 'framer-motion'
import { SectionHeading } from './Services.jsx'

const steps = [
  {
    n: '01',
    title: 'You send the messy file',
    body: 'Upload a hand sketch, scanned PDF, or marked-up old drawing. No need to tidy it — that is my job.',
  },
  {
    n: '02',
    title: 'I scope & quote',
    body: 'Within one working day you receive a fixed project price. 50% deposit secures your slot, the balance is only due on final approval.',
  },
  {
    n: '03',
    title: 'Drafting begins',
    body: 'Your drawing is built to scale with strict coordinates, dimensional limits and AIA-standard layering ready for handoff to the wider team.',
  },
  {
    n: '04',
    title: 'You receive a layered DWG',
    body: 'A clean, fully layered .dwg lands in your inbox — typically within 48 hours. Revisions are included until you are satisfied.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From sketch to layered DWG in four steps"
          subtitle="A simple, low-risk workflow designed for busy small practices. Start with one small overflow task — no retainer, no lock-in."
        />

        <div className="relative mt-14">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-charcoal/10 md:block" />
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative z-10 mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-sage/40 bg-white font-mono text-lg font-bold text-navy shadow-sm">
                  {s.n}
                </div>
                <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
