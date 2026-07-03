import { motion } from 'framer-motion'
import { SectionHeading } from './Services.jsx'

const tiers = [
  {
    name: 'Per project',
    tag: 'Best for one-off conversions',
    price: 'From £90',
    unit: 'per drawing',
    desc: 'Fixed-price quote based on complexity. Ideal for digitising a single PDF or sketch into a layered DWG.',
    features: ['PDF / sketch to DWG', 'AIA-standard layering', 'Scaled & dimensioned', '1 round of revisions', '48-hour typical turnaround'],
    cta: 'Get a fixed quote',
    highlight: false,
  },
  {
    name: 'Hourly',
    tag: 'Best for flexible overflow',
    price: '£25',
    unit: 'per hour',
    desc: 'For ad-hoc revisions, redrafting old plans, or batch conversions where scope shifts as you go.',
    features: ['Everything in Per project', 'Revisions & markups', 'Batch PDF conversion', 'Site plan amendments', 'Tracked hours, weekly invoice'],
    cta: 'Book overflow hours',
    highlight: true,
  },
  {
    name: 'Day rate',
    tag: 'Best for busy firms',
    price: '£180',
    unit: 'per day',
    desc: 'A full day of dedicated drafting for practices with a steady backlog of residential or small commercial work.',
    features: ['Everything in Hourly', 'Dedicated drafting day', 'Up to 8 drawings / day', 'Priority queue', 'Same-day updates'],
    cta: 'Reserve a drafting day',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent UK freelance rates"
          subtitle="No hidden fees. Every quote includes a 15% buffer for client revisions, and you only pay the final balance when you are happy with the drawing."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`glass-card relative flex flex-col p-7 ${
                t.highlight ? 'border-navy shadow-card' : ''
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 rounded-full border border-navy bg-navy px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Most popular
                </span>
              )}
              <div className="text-xs font-medium uppercase tracking-wider text-charcoal/50">{t.tag}</div>
              <h3 className="mt-1 text-xl font-bold text-navy">{t.name}</h3>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-extrabold text-green">{t.price}</span>
                <span className="mb-1 text-sm text-charcoal/60">{t.unit}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{t.desc}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-charcoal/90">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-sage" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-7 ${t.highlight ? 'btn-primary' : 'btn-ghost'} justify-center`}
              >
                {t.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-charcoal/50">
          Rates reflect UK entry- to mid-weight AutoCAD contractor standards (£18–£35/hr, £140–£250/day). 50% deposit to begin, 50% on completion.
        </p>
      </div>
    </section>
  )
}
