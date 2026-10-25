import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import PostCard from '../components/PostCard'
import Newsletter from '../components/Newsletter'
import { Loading, ErrorBox } from '../components/Status'
import { useAsync, formatDate } from '../lib/useAsync'
import { CATEGORY_ICONS } from '../lib/icons'
import {
  fetchPosts, fetchCategories, fetchRecentPosts, fetchPopularTopics, PAGE_SIZE,
} from '../lib/api'

export default function Journal() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const page = Math.max(1, parseInt(params.get('page') || '1', 10))
  const q = params.get('q') || ''
  const [searchInput, setSearchInput] = useState(q)

  useEffect(() => setSearchInput(q), [q])

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next)
  }

  const posts = useAsync(() => fetchPosts({ page, category, search: q }), [page, category, q])
  const cats = useAsync(fetchCategories, [])
  const recent = useAsync(() => fetchRecentPosts(5), [])
  const topics = useAsync(fetchPopularTopics, [])

  const total = posts.data?.total ?? 0
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const totalAll = (cats.data ?? []).reduce((n, c) => n + (c.post_count || 0), 0)
  const shownFrom = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const shownTo = Math.min(page * PAGE_SIZE, total)

  const pageNumbers = () => {
    if (pages <= 6) return Array.from({ length: pages }, (_, i) => i + 1)
    const set = new Set([1, 2, 3, pages, page - 1, page, page + 1])
    const list = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)
    return list.flatMap((n, i) => (i && n - list[i - 1] > 1 ? ['…', n] : [n]))
  }

  return (
    <>
      <section className="hero hero-journal">
        <div className="container">
          <p className="eyebrow">Engineering Journal</p>
          <h1>
            Ideas, Experiments, <span className="accent">Lessons.</span>
          </h1>
          <p className="lede">
            This is where I document what I'm learning, building, breaking and figuring out. From deep dives into C++ and
            computer architecture to hands-on embedded experiments and real-world systems.
          </p>
        </div>
      </section>

      <div className="container journal-layout">
        <div>
          <div className="chips" role="tablist" aria-label="Filter by category">
            <button className={`chip ${category === 'all' ? 'on' : ''}`} onClick={() => update({ category: '', page: '' })}>All</button>
            {(cats.data ?? []).map((c) => (
              <button key={c.id} className={`chip ${category === c.slug ? 'on' : ''}`} onClick={() => update({ category: c.slug, page: '' })}>
                {c.name}
              </button>
            ))}
          </div>

          {q && (
            <p className="muted search-note">
              Results for “{q}” · <button className="link-btn" onClick={() => update({ q: '', page: '' })}>clear</button>
            </p>
          )}

          {posts.loading && <Loading label="Loading posts…" />}
          {posts.error && <ErrorBox error={posts.error} />}
          {posts.data && posts.data.posts.length === 0 && <p className="status">No posts found.</p>}

          {posts.data && posts.data.posts.length > 0 && (
            <>
              <div className="post-grid">
                {posts.data.posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>

              <div className="pager-row">
                <span className="muted small">
                  Showing {shownFrom} – {shownTo} of {total} posts
                </span>
                {pages > 1 && (
                  <nav className="pager" aria-label="Pagination">
                    <button disabled={page <= 1} onClick={() => update({ page: String(page - 1) })} aria-label="Previous page"><ChevronLeft size={14} /></button>
                    {pageNumbers().map((n, i) =>
                      n === '…' ? (
                        <span key={`e${i}`}>…</span>
                      ) : (
                        <button key={n} className={n === page ? 'on' : ''} onClick={() => update({ page: String(n) })}>{n}</button>
                      )
                    )}
                    <button disabled={page >= pages} onClick={() => update({ page: String(page + 1) })} aria-label="Next page"><ChevronRight size={14} /></button>
                  </nav>
                )}
              </div>
            </>
          )}
        </div>

        <aside className="sidebar">
          <div className="card side-block">
            <h4>Search</h4>
            <form
              className="search-field"
              onSubmit={(e) => {
                e.preventDefault()
                update({ q: searchInput.trim(), page: '' })
              }}
            >
              <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search articles…" aria-label="Search articles" />
              <button aria-label="Search"><Search size={15} /></button>
            </form>
          </div>

          <div className="card side-block">
            <h4>Categories</h4>
            <ul className="cat-list">
              <li>
                <button className={category === 'all' ? 'on' : ''} onClick={() => update({ category: '', page: '' })}>
                  <CATEGORY_ICONS.all size={16} /> <span>All Posts</span> <em>{totalAll}</em>
                </button>
              </li>
              {(cats.data ?? []).map((c) => {
                const I = CATEGORY_ICONS[c.slug] || CATEGORY_ICONS.default
                return (
                  <li key={c.id}>
                    <button className={category === c.slug ? 'on' : ''} onClick={() => update({ category: c.slug, page: '' })}>
                      <I size={16} /> <span>{c.name}</span> <em>{c.post_count}</em>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="card side-block">
            <h4>Recent posts</h4>
            <ul className="recent">
              {(recent.data ?? []).map((p) => (
                <li key={p.id}>
                  <Link to={`/journal/${p.slug}`}>
                    <span className="thumb">{p.cover_url ? <img src={p.cover_url} alt="" /> : null}</span>
                    <span>
                      <strong>{p.title}</strong>
                      <small>{formatDate(p.published_at)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Newsletter />

          <div className="card side-block">
            <h4>Popular topics</h4>
            <div className="tags">
              {(topics.data ?? []).map((t) => (
                <button key={t} className="tag" onClick={() => update({ q: t, category: '', page: '' })}>{t}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
