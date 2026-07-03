import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* copy */}
          <div>
            <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
              <span className="section-label">
                <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                Freelance AutoCAD Drafting · UK
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl"
            >
              Your next construction project is going to be{' '}
              <span className="text-green">a disaster.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-charcoal/80"
            >
              That is the reality if your team builds from inaccurate plans. Fortunately,
              meticulous AutoCAD drafting eliminates those hidden errors before a single
              tool is lifted.
            </motion.p>

            <motion.p
              initial="hidden"
              animate="show"
              custom={3}
              variants={fadeUp}
              className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/70"
            >
              I convert messy PDFs, hand sketches and old drawings into precise, fully
              layered DWG files — so your senior team can stop redrafting and start
              designing.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={4}
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#contact" className="btn-primary group">
                Upload your project file
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12 L19 12 M13 6 L19 12 L13 18" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-ghost">View technical portfolio</a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              custom={5}
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-charcoal/60"
            >
              {['Layered DWG in 48 hours', '50% deposit · 50% on completion', 'BIM-aware layering'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-sage" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12 L10 17 L19 7" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* image viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="glass-card relative overflow-hidden rounded-3xl p-3">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" 
                alt="Professional reviewing drafting plans"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* hook strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white shadow-soft sm:grid-cols-3"
        >
          {[
            { stat: '1mm', label: 'Coordinate accuracy' },
            { stat: '48h', label: 'Typical DWG turnaround' },
            { stat: '100%', label: 'Layered to industry standard' },
          ].map((s) => (
            <div key={s.label} className="bg-transparent px-6 py-6 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-charcoal/10 last:border-0">
              <div className="text-3xl font-extrabold text-navy">{s.stat}</div>
              <div className="mt-1 text-sm text-charcoal/70">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
