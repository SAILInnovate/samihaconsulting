import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { submitEnquiry, isSupabaseConfigured } from '../lib/supabase.js'

const projectTypes = [
  'PDF / sketch to DWG',
  '2D mechanical drafting',
  'Architectural layout',
  'Civil site plan',
  'Revision / markup',
  'Other',
]

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    try {
      const fd = new FormData(e.currentTarget)
      await submitEnquiry({
        name: fd.get('name'),
        email: fd.get('email'),
        company: fd.get('company'),
        projectType: fd.get('projectType'),
        message: fd.get('message'),
        file: fd.get('file'),
      })
      setStatus('success')
      e.target.reset()
      setFileName('')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please email directly.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-beige/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Client portal</span>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Send me your first overflow task
            </h2>
            <p className="mt-4 max-w-md text-balance text-base leading-relaxed text-charcoal/70">
              Drop your messy PDF or hand sketch below. I will reply within one working
              day with a fixed project price and a start date — no obligation until you
              approve the quote.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { label: 'Response time', value: 'Within 1 working day' },
                { label: 'Payment terms', value: '50% deposit · 50% on completion' },
                { label: 'Revisions', value: 'Included until you are satisfied' },
                { label: 'Delivery format', value: '.dwg + .pdf, layered to standard' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-charcoal/10 pb-3 text-sm">
                  <span className="text-charcoal/60">{row.label}</span>
                  <span className="font-medium text-navy">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-charcoal/60">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-green" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="5" width="16" height="14" rx="2" />
                <path d="M4 7 L12 13 L20 7" />
              </svg>
              hello@samihaconsulting.com
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="bg-white shadow-card rounded-3xl p-6 sm:p-8">
              {status === 'success' ? (
                <div className="grid place-items-center py-12 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full border border-sage/40 bg-sage/10">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-navy" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12 L10 17 L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy">Brief received.</h3>
                  <p className="mt-2 max-w-sm text-sm text-charcoal/70">
                    Your file is on its way. I will reply within one working day with a
                    fixed quote and start date.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-ghost mt-6">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" name="name" required placeholder="Jane Architect" />
                    <Field label="Email" name="email" type="email" required placeholder="jane@studio.com" />
                  </div>
                  <Field label="Company" name="company" placeholder="Studio name (optional)" />

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-charcoal/60">
                      Project type
                    </label>
                    <select
                      name="projectType"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-charcoal/10 bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-navy/50"
                    >
                      <option value="" disabled>Select a service…</option>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-charcoal/60">
                      Brief description
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="A batch of old hand-drawn floor plans needing digitising into layered DWG…"
                      className="w-full resize-none rounded-xl border border-charcoal/10 bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-navy/50"
                    />
                  </div>

                  {/* drag & drop upload */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragOver(false)
                      const f = e.dataTransfer.files?.[0]
                      if (f) {
                        setFileName(f.name)
                        if (fileRef.current) {
                          const dt = new DataTransfer()
                          dt.items.add(f)
                          fileRef.current.files = dt.files
                        }
                      }
                    }}
                    onClick={() => fileRef.current?.click()}
                    className={`group cursor-pointer rounded-xl border border-dashed px-4 py-6 text-center transition-colors ${
                      dragOver
                        ? 'border-navy/60 bg-navy/5'
                        : 'border-charcoal/15 bg-transparent hover:border-navy/30 hover:bg-beige/30'
                    }`}
                  >
                    <input ref={fileRef} type="file" name="file" className="hidden" accept=".pdf,.dwg,.png,.jpg,.jpeg,.tif,.tiff" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                    <svg viewBox="0 0 24 24" className="mx-auto h-7 w-7 text-navy/70 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 16 L12 4 M7 9 L12 4 L17 9" />
                      <path d="M5 20 L19 20" />
                    </svg>
                    <p className="mt-3 text-sm text-charcoal/70">
                      {fileName ? (
                        <span className="font-medium text-navy">{fileName}</span>
                      ) : (
                        <>Drop your PDF or sketch here, or <span className="text-navy">browse</span></>
                      )}
                    </p>
                    <p className="mt-1 text-[11px] text-charcoal/40">PDF, DWG, PNG, JPG, TIFF — up to 25MB</p>
                  </div>

                  {error && (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full justify-center disabled:opacity-60">
                    {status === 'submitting' ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 3 a9 9 0 1 0 9 9" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send brief & request quote
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12 L19 12 M13 6 L19 12 L13 18" />
                        </svg>
                      </>
                    )}
                  </button>

                  {!isSupabaseConfigured && (
                    <p className="text-center text-[11px] text-charcoal/40">
                      Demo mode — add VITE_SUPABASE_URL &amp; VITE_SUPABASE_ANON_KEY to enable live submissions.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-charcoal/60">
        {label} {required && <span className="text-green">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-charcoal/10 bg-transparent px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-navy/50"
      />
    </div>
  )
}
