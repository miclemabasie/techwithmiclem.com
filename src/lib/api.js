import { supabase, isSupabaseConfigured } from './supabase'

export const PAGE_SIZE = 9

function guard() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Copy .env.example to .env and add your project URL and anon key.'
    )
  }
}

/* ---------- Journal ---------- */

export async function fetchPosts({ page = 1, category = 'all', search = '' } = {}) {
  guard()
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let q = supabase
    .from('posts')
    .select(
      'id, title, slug, excerpt, cover_url, read_minutes, published_at, tags, categories!inner(name, slug)',
      { count: 'exact' }
    )
    .eq('published', true)
    .order('published_at', { ascending: false })
    .range(from, to)

  if (category !== 'all') q = q.eq('categories.slug', category)
  if (search.trim()) {
    const s = search.trim().replace(/[%,]/g, '')
    q = q.or(`title.ilike.%${s}%,excerpt.ilike.%${s}%`)
  }

  const { data, error, count } = await q
  if (error) throw error
  return { posts: data ?? [], total: count ?? 0 }
}

export async function fetchRecentPosts(limit = 5) {
  guard()
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, cover_url, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export async function fetchPost(slug) {
  guard()
  const { data, error } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function fetchCategories() {
  guard()
  const { data, error } = await supabase
    .from('category_counts')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function fetchPopularTopics() {
  guard()
  const { data, error } = await supabase.from('topics').select('name').order('sort_order')
  if (error) throw error
  return (data ?? []).map((t) => t.name)
}

/* ---------- Home ---------- */

export async function fetchHome() {
  guard()
  const [focus, skills, proofs, projects, roadmap] = await Promise.all([
    supabase.from('focus_items').select('*').order('sort_order'),
    supabase.from('skills').select('*').order('sort_order'),
    supabase.from('tech_proof').select('*').order('sort_order'),
    supabase.from('projects').select('*').eq('featured', true).order('sort_order'),
    supabase.from('roadmap').select('*').order('sort_order'),
  ])
  for (const r of [focus, skills, proofs, projects, roadmap]) if (r.error) throw r.error
  return {
    focus: focus.data,
    skills: skills.data,
    proofs: proofs.data,
    projects: projects.data,
    roadmap: roadmap.data,
  }
}

/* ---------- Forms ---------- */

export async function subscribe(email) {
  guard()
  const { error } = await supabase.from('subscribers').insert({ email })
  if (error) {
    if (error.code === '23505') return { already: true }
    throw error
  }
  return { already: false }
}

export async function sendMessage({ name, email, message }) {
  guard()
  const { error } = await supabase.from('messages').insert({ name, email, message })
  if (error) throw error
}
