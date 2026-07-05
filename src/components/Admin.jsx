import { useState, useEffect } from 'react'
import { supabase, login, logout, getEnquiries, getFileUrl } from '../lib/supabase.js'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const [enquiries, setEnquiries] = useState([])
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      loadData()
    }
  }, [session])

  const loadData = async () => {
    setFetching(true)
    try {
      const data = await getEnquiries()
      setEnquiries(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (path) => {
    try {
      const url = await getFileUrl(path)
      if (url) {
        window.open(url, '_blank')
      }
    } catch (err) {
      alert('Failed to get download link')
    }
  }

  const renderDownloadButtons = (pathStr) => {
    if (!pathStr) return <span className="text-charcoal/30 font-mono text-[10px] uppercase tracking-widest">No file</span>
    
    let paths = []
    try {
      const parsed = JSON.parse(pathStr)
      if (Array.isArray(parsed)) paths = parsed
      else paths = [pathStr]
    } catch (e) {
      paths = [pathStr]
    }

    return (
      <div className="flex flex-col gap-2">
        {paths.map((p, idx) => {
          const ext = p.split('.').pop().toUpperCase()
          return (
            <button
              key={idx}
              onClick={() => handleDownload(p)}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-green border-2 border-green bg-green/10 px-3 py-1.5 hover:bg-green hover:text-navy transition-colors w-max"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              ↓ {ext}
            </button>
          )
        })}
      </div>
    )
  }

  if (loading && !session) {
    return <div className="min-h-screen grid place-items-center bg-beige text-navy font-bold font-mono uppercase">Loading System...</div>
  }

  if (!session) {
    return (
      <div className="min-h-screen grid place-items-center bg-beige px-5 py-20">
        <div className="w-full max-w-md bg-white border-2 border-navy p-8 sm:p-12 shadow-[8px_8px_0_0_#0A66C2]">
          <div className="mb-8">
            <span className="section-label bg-white">
              <span className="h-2 w-2 rounded-none bg-green" />
              SYSTEM ACCESS
            </span>
            <h1 className="mt-4 font-sans text-3xl font-extrabold text-navy uppercase">Admin Portal</h1>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-navy font-mono">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-none border-2 border-navy bg-white px-4 py-3 font-bold text-navy outline-none focus:border-green focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#0A66C2] transition-all duration-200"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-navy font-mono">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-none border-2 border-navy bg-white px-4 py-3 font-bold text-navy outline-none focus:border-green focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[4px_4px_0_0_#0A66C2] transition-all duration-200"
              />
            </div>
            {error && <p className="text-sm font-bold text-red-600 bg-red-50 p-3 border border-red-200">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full">
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t-2 border-navy/10 pt-6">
            <a href="#" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-navy/50 hover:text-navy transition-colors">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Take me back to the drafting board
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-beige">
      <header className="bg-white border-b-2 border-navy px-5 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-green border border-navy" />
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-navy">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-navy/50 hover:text-navy transition-colors border-r-2 border-navy/10 pr-4 sm:pr-6">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="hidden sm:inline">Back to drafting board</span>
            <span className="sm:hidden">Home</span>
          </a>
          <button onClick={logout} className="text-[11px] font-bold uppercase tracking-widest text-charcoal hover:text-navy hover:underline underline-offset-4">
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans text-3xl font-extrabold text-navy uppercase tracking-tight">Project Enquiries</h2>
          <button onClick={loadData} disabled={fetching} className="btn-ghost py-2 text-sm px-4">
            {fetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="border-2 border-navy bg-white overflow-hidden shadow-[8px_8px_0_0_#0A66C2]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy text-white font-mono uppercase tracking-widest text-[11px]">
                <tr>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Client</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Message</th>
                  <th className="px-6 py-4 font-bold">File</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-charcoal/10 font-medium text-navy">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-charcoal/50">No enquiries found.</td>
                  </tr>
                ) : (
                  enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-charcoal/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-[11px]">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{enq.name}</div>
                        <div className="text-charcoal/60 text-xs">{enq.email}</div>
                        {enq.company && <div className="text-charcoal/60 text-xs uppercase">{enq.company}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold uppercase">
                        {enq.project_type}
                      </td>
                      <td className="px-6 py-4 min-w-[300px]">
                        <p className="line-clamp-3 text-sm text-charcoal leading-relaxed">{enq.message}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderDownloadButtons(enq.file_path)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
