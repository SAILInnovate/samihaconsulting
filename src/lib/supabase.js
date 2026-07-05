import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anon)

export const supabase = isSupabaseConfigured
  ? createClient(url, anon)
  : null

export async function submitEnquiry({ name, email, company, projectType, message, files }) {
  if (!isSupabaseConfigured) {
    // Graceful fallback when env not yet configured — simulate success for demos.
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true, demo: true }
  }

  let filePathArray = []
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (f) => {
      const ext = f.name.split('.').pop()
      const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const path = `enquiries/${safe}`
      const { error: upErr } = await supabase.storage
        .from('client-uploads')
        .upload(path, f, { upsert: false })
      if (upErr) throw upErr
      return path
    })
    filePathArray = await Promise.all(uploadPromises)
  }

  const { error } = await supabase.from('enquiries').insert({
    name,
    email,
    company,
    project_type: projectType,
    message,
    file_path: filePathArray.length > 0 ? JSON.stringify(filePathArray) : null,
  })
  if (error) throw error
  return { ok: true }
}

export async function login(email, password) {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function logout() {
  if (!supabase) return
  await supabase.auth.signOut()
}

export async function getEnquiries() {
  if (!supabase) return []
  const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getFileUrl(path) {
  if (!supabase || !path) return null
  const { data, error } = await supabase.storage.from('client-uploads').createSignedUrl(path, 3600)
  if (error) throw error
  return data.signedUrl
}
