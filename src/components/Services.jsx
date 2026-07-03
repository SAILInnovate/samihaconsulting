import { motion } from 'framer-motion'
import { services, valueProps } from '../lib/projects.js'

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
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I do"
          title="Overflow drafting, taken off your desk"
          subtitle="Your senior staff are expensive. When they spend hours converting PDFs or tweaking site plans, that is your margin walking out the door. Outsource the tedious work — keep the design talent on design."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card group relative flex flex-col p-7"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-sage/30 bg-sage/10">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-navy" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {icons[s.icon]}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">{s.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-charcoal/5 pt-4">
                <span className="text-xs font-medium uppercase tracking-wider text-green">
                  {s.deliverable}
                </span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-charcoal/40 transition-all group-hover:translate-x-1 group-hover:text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12 L19 12 M13 6 L19 12 L13 18" />
                </svg>
              </div>
            </motion.article>
          ))}
        </div>

        {/* value props */}
        <div className="mt-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Why it matters
          </h3>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white shadow-soft md:grid-cols-3">
            {valueProps.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-transparent p-7 border-b md:border-b-0 md:border-r border-charcoal/5 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-sage/20 font-mono text-xs font-bold text-navy">
                    0{i + 1}
                  </span>
                  <h4 className="font-semibold text-navy">{v.title}</h4>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/80">{v.body}</p>
              </motion.div>
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
      <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-balance text-base leading-relaxed text-charcoal/70">
          {subtitle}
        </p>
      )}
    </div>
  )
}
