import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anon)

export const supabase = isSupabaseConfigured
  ? createClient(url, anon, {
      auth: { persistSession: false },
    })
  : null

export async function submitEnquiry({ name, email, company, projectType, message, file }) {
  if (!isSupabaseConfigured) {
    // Graceful fallback when env not yet configured — simulate success for demos.
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, demo: true }
  }

  let filePath = null
  if (file) {
    const ext = file.name.split('.').pop()
    const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    filePath = `enquiries/${safe}`
    const { error: upErr } = await supabase.storage
      .from('client-uploads')
      .upload(filePath, file, { upsert: false })
    if (upErr) throw upErr
  }

  const { error } = await supabase.from('enquiries').insert({
    name,
    email,
    company,
    project_type: projectType,
    message,
    file_path: filePath,
  })
  if (error) throw error
  return { ok: true }
}
