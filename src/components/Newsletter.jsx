import { useState } from 'react'
import { Mail } from 'lucide-react'
import { subscribe } from '../lib/api'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState({ status: 'idle', msg: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    setState({ status: 'loading', msg: '' })
    try {
      const { already } = await subscribe(email.trim())
      setState({ status: 'ok', msg: already ? "You're already subscribed." : 'Thanks — you’re subscribed!' })
      setEmail('')
    } catch (err) {
      setState({ status: 'error', msg: err.message || 'Something went wrong.' })
    }
  }

  return (
    <div className="card newsletter">
      <div className="newsletter-head">
        <Mail size={30} color="var(--accent)" />
        <h3>Get new posts in your inbox</h3>
      </div>
      <p className="muted">I share new articles, project updates and interesting finds. No spam.</p>
      <form onSubmit={onSubmit}>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" />
        <button className="btn primary block" disabled={state.status === 'loading'}>
          {state.status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {state.msg && <p className={`form-msg ${state.status}`}>{state.msg}</p>}
    </div>
  )
}
