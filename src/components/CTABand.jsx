import { motion } from 'framer-motion'

export default function CTABand() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-sage shadow-card p-10 text-center sm:p-14"
        >
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-navy/80">
              The reframe
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-2xl font-semibold leading-snug text-navy sm:text-3xl">
              Your senior staff are wasting your money — let them design.
              <br />
              <span className="text-white">I will handle the redrafting.</span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="btn-primary !bg-navy hover:!bg-navy-dark">Start with one drawing</a>
              <a href="#pricing" className="btn-ghost !border-navy !text-navy hover:!bg-navy/5">See pricing</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
