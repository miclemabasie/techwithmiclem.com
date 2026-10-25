import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && key)

// createClient throws on an empty URL, so only build it when configured.
export const supabase = isSupabaseConfigured ? createClient(url, key) : null
