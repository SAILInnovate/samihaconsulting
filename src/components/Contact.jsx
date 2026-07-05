import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { submitEnquiry } from '../lib/supabase.js'

gsap.registerPlugin(ScrollTrigger)

const projectTypes = [
  'PDF / sketch to DWG',
  '2D mechanical drafting',
  'Architectural layout',
  'Civil site plan',
  'Revision / markup',
  'Other',
]

export default function Contact() {
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)
  
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const formRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(copyRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 0.5, delay: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
  }, { scope: sectionRef })

  const handleFiles = (incomingFiles) => {
    if (!incomingFiles || incomingFiles.length === 0) return
    let newFiles = []
    let hasError = false
    Array.from(incomingFiles).forEach(f => {
      if (f.size > 25 * 1024 * 1024) {
        setError('One or more files are too large. Maximum size is 25MB per file.')
        hasError = true
        return
      }
      const ext = f.name.split('.').pop().toLowerCase()
      const allowed = ['pdf', 'dwg', 'png', 'jpg', 'jpeg', 'tif', 'tiff']
      if (!allowed.includes(ext)) {
        setError(`Invalid file type for ${f.name}. Please upload PDF, DWG, PNG, or JPG.`)
        hasError = true
        return
      }
      // Check if file already exists
      if (!files.some(existing => existing.name === f.name)) {
        newFiles.push(f)
      }
    })
    
    if (!hasError) setError('')
    setFiles(prev => [...prev, ...newFiles])
    if (fileRef.current) fileRef.current.value = ''
  }

  const removeFile = (e, index) => {
    e.stopPropagation()
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      company: formData.get('company')?.trim(),
      projectType: formData.get('projectType')?.trim(),
      message: formData.get('message')?.trim(),
      files: files
    }

    try {
      await submitEnquiry(data)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Connection failed. Please try again or email me directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 bg-beige border-t-2 border-navy">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* copy */}
          <div ref={copyRef}>
            <span className="section-label bg-white text-navy font-mono border-navy border-2">// CLIENT PORTAL</span>
            <h2 className="mt-6 text-balance font-sans text-4xl font-extrabold tracking-tight text-navy sm:text-6xl uppercase">
              SEND YOUR FIRST OVERFLOW TASK
            </h2>
            <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-charcoal font-medium">
              Drop your messy PDF or hand sketch below. I will reply within one working
              day with a fixed project price and a start date — no obligation until you
              approve the quote.
            </p>

            <div className="mt-12 space-y-0 border-t-2 border-navy">
              {[
                { label: 'Response time', value: 'Within 1 working day' },
                { label: 'Payment terms', value: '50% deposit · 50% on completion' },
                { label: 'Revisions', value: 'Included until you are satisfied' },
                { label: 'Delivery format', value: '.dwg + .pdf, layered to standard' },
              ].map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-charcoal/10 py-5 text-sm">
                  <span className="font-mono text-charcoal/60 uppercase font-bold text-[11px] tracking-widest">{row.label}</span>
                  <span className="font-sans text-navy font-bold">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-4 font-mono font-bold text-xs uppercase tracking-widest">
              <div className="flex items-center gap-4 text-navy">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-green" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                  <rect x="4" y="5" width="16" height="14" />
                  <path d="M4 7 L12 13 L20 7" />
                </svg>
                <a href="mailto:samiha@samihaconsulting.com" className="hover:text-green transition-colors">samiha@samihaconsulting.com</a>
              </div>
              <div className="flex items-center gap-4 text-navy">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-green">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href="https://www.linkedin.com/in/samiha-ali-491618243/" target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">Connect on LinkedIn</a>
              </div>
            </div>
          </div>

          {/* form */}
          <div ref={formRef} className="relative">
            <div className="bg-white border-2 border-navy p-6 sm:p-12 min-h-[600px] flex flex-col justify-center">
              {success ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-20 w-20 border-2 border-navy bg-green text-navy grid place-items-center mb-8">
                    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-3xl font-extrabold text-navy uppercase tracking-tight">BRIEF RECEIVED</h3>
                  <p className="mt-4 text-charcoal font-medium text-lg">Your files have been uploaded securely. I will review them and send you a fixed quote within one working day.</p>
                  <button onClick={() => { setSuccess(false); setFiles([]) }} className="mt-10 btn-ghost border-navy text-navy hover:bg-navy hover:text-white">
                    Submit another task
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="border-2 border-red-500 bg-red-50 text-red-700 p-4 font-mono text-sm font-bold uppercase tracking-wider">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your name" name="name" required placeholder="Jane Architect" disabled={loading} />
                    <Field label="Email" name="email" type="email" required placeholder="jane@studio.com" disabled={loading} />
                  </div>
                  <Field label="Company" name="company" placeholder="Studio name (optional)" disabled={loading} />

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-navy font-mono">
                      Project type
                    </label>
                    <select
                      name="projectType"
                      required
                      defaultValue=""
                      disabled={loading}
                      className="w-full rounded-none border-2 border-navy bg-white px-5 py-4 text-base font-bold text-navy outline-none transition-all duration-200 focus:border-green focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#0A66C2] disabled:opacity-50"
                    >
                      <option value="" disabled>Select a service…</option>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-navy font-mono">
                      Brief description
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="A batch of old hand-drawn floor plans needing digitising into layered DWG…"
                      disabled={loading}
                      className="w-full resize-none rounded-none border-2 border-navy bg-white px-5 py-4 text-base font-bold text-navy outline-none transition-all duration-200 placeholder:text-navy/40 focus:border-green focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#0A66C2] disabled:opacity-50"
                    />
                  </div>

                  {/* drag & drop upload */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); if (!loading) setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (loading) return
                      setDragOver(false)
                      handleFiles(e.dataTransfer.files)
                    }}
                    onClick={() => !loading && fileRef.current?.click()}
                    className={`group cursor-pointer border-2 border-dashed px-4 py-12 text-center transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#0A66C2] active:scale-[0.98]'} ${
                      dragOver
                        ? 'border-green bg-green/10 shadow-[6px_6px_0_0_#0A66C2] -translate-y-1 -translate-x-1'
                        : 'border-navy bg-white hover:border-green hover:bg-green/5'
                    }`}
                  >
                    <input ref={fileRef} type="file" name="file" multiple className="hidden" accept=".pdf,.dwg,.png,.jpg,.jpeg,.tif,.tiff" onChange={(e) => handleFiles(e.target.files)} disabled={loading} />
                    <svg viewBox="0 0 24 24" className={`mx-auto h-8 w-8 text-navy transition-transform ${!loading && 'group-hover:-translate-y-1 group-hover:text-green'}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                      <path d="M12 16 L12 4 M7 9 L12 4 L17 9" />
                      <path d="M5 20 L19 20" />
                    </svg>
                    <p className="mt-5 text-sm text-navy font-bold uppercase tracking-wider font-mono">
                      Drop your PDFs or sketches here, or <span className="text-green">browse</span>
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-charcoal/60 font-mono">PDF, DWG, PNG, JPG — up to 25MB each</p>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 border-2 border-navy bg-white px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-navy transition-all hover:bg-red-50 hover:border-red-500 hover:text-red-700">
                          <span className="truncate max-w-[200px]">{f.name}</span>
                          <button type="button" onClick={(e) => removeFile(e, i)} className="grid h-4 w-4 place-items-center rounded-sm transition-colors" aria-label="Remove file">
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><path d="M6 6 L18 18 M18 6 L6 18" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-[14px] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                    {loading ? 'UPLOADING FILES & SENDING...' : 'SEND BRIEF & REQUEST QUOTE'}
                    {!loading && (
                      <svg viewBox="0 0 24 24" className="ml-2 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                        <path d="M5 12 L19 12 M13 6 L19 12 L13 18" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required, placeholder, disabled }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-navy font-mono">
        {label} {required && <span className="text-green">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-none border-2 border-navy bg-white px-5 py-4 text-base font-bold text-navy outline-none transition-all duration-200 placeholder:text-navy/40 focus:border-green focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#0A66C2] disabled:opacity-50"
      />
    </div>
  )
}
