import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../lib/projects.js'
import { SectionHeading } from './Services.jsx'

const categories = [
  { id: 'all', label: 'All work' },
  { id: 'mechanical', label: 'Mechanical' },
  { id: 'architectural', label: 'Architectural' },
  { id: 'civil', label: 'Civil' },
]

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const visible = projects.filter((p) => filter === 'all' || p.discipline === filter)

  return (
    <section id="portfolio" className="relative py-24 bg-beige/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Technical portfolio"
          title="Drawings that prevent problems before construction"
          subtitle="Every drawing below is built on exact coordinates, dimensional limits and clean layering. Hover to inspect — click to open the full sheet."
        />

        {/* filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                filter === c.id
                  ? 'border border-sage/50 bg-sage text-navy'
                  : 'border border-charcoal/10 bg-white text-charcoal/60 hover:text-navy'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              return (
                <motion.button
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setActive(p)}
                  className="bg-white shadow-soft rounded-2xl group relative overflow-hidden p-3 text-left transition-transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden rounded-2xl h-48 bg-charcoal/5">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="flex items-start justify-between gap-4 px-4 pb-2 pt-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-green">
                        {p.category}
                      </div>
                      <h3 className="mt-1 text-lg font-bold text-navy">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-charcoal/70">{p.summary}</p>
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-charcoal/10 transition-all group-hover:border-sage group-hover:bg-sage/20">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-charcoal/60 transition-transform group-hover:rotate-45 group-hover:text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 L17 7 M9 7 L17 7 L17 15" />
                      </svg>
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5 px-4 pb-4">
                    {p.specs.map((s) => (
                      <span key={s} className="rounded-md border border-charcoal/5 bg-charcoal/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-charcoal/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-navy/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-card"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-charcoal/10 bg-white/50 text-charcoal/70 transition-colors hover:text-navy"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6 L18 18 M18 6 L6 18" />
                </svg>
              </button>

              <div className="p-4">
                <div className="w-full h-64 rounded-2xl overflow-hidden">
                   <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="px-6 pb-7 pt-2">
                <div className="text-xs font-medium uppercase tracking-wider text-green">
                  {active.category}
                </div>
                <h3 className="mt-1 text-2xl font-bold text-navy">{active.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{active.detail}</p>

                <div className="mt-5 flex items-start gap-3 rounded-xl border border-sage/40 bg-sage/10 p-4">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-navy" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 L12 21 M5 12 L12 21 L19 12" />
                  </svg>
                  <p className="text-sm text-charcoal/90">{active.value}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {active.specs.map((s) => (
                      <span key={s} className="rounded-md border border-charcoal/10 bg-charcoal/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-charcoal/70">
                        {s}
                      </span>
                    ))}
                  </div>
                  <a href="#contact" onClick={() => setActive(null)} className="btn-primary px-5 py-2.5 text-sm">
                    Brief a similar drawing
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
