import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Moon, Sun, Menu, X } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  ['Home', '/'],
  ['The Engineer', '/engineer'],
  ['The Lab', '/lab'],
  ['Under the Hood', '/under-the-hood'],
  ['Journal', '/journal'],
  ['Talks', '/talks'],
  ['Now', '/now'],
  ['Contact', '/contact'],
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark'
    } catch {
      return 'dark'
    }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

export default function Navbar() {
  const [theme, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/journal?q=${encodeURIComponent(q.trim())}`)
    setSearching(false)
    setQ('')
    setOpen(false)
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          {LINKS.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {searching ? (
            <form onSubmit={submit} className="nav-search">
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onBlur={() => !q && setSearching(false)} placeholder="Search journal…" aria-label="Search journal" />
            </form>
          ) : (
            <button className="icon-btn" onClick={() => setSearching(true)} aria-label="Search">
              <Search size={18} />
            </button>
          )}
          <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
