import { useState } from 'react'
import { sendMessage } from '../lib/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState({ status: 'idle', msg: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setState({ status: 'loading', msg: '' })
    try {
      await sendMessage(form)
      setForm({ name: '', email: '', message: '' })
      setState({ status: 'ok', msg: 'Message sent — I’ll get back to you soon.' })
    } catch (err) {
      setState({ status: 'error', msg: err.message || 'Something went wrong.' })
    }
  }

  return (
    <section className="hero">
      <div className="container narrow">
        <p className="eyebrow">Contact</p>
        <h1>Let's build <span className="accent">something.</span></h1>
        <p className="lede">Open to interesting problems — a role, a collaboration, a talk, or just a conversation.</p>

        <form className="card contact-form" onSubmit={onSubmit}>
          <label>Name<input required maxLength={120} value={form.name} onChange={set('name')} /></label>
          <label>Email<input required type="email" value={form.email} onChange={set('email')} /></label>
          <label>Message<textarea required rows={6} maxLength={5000} value={form.message} onChange={set('message')} /></label>
          <button className="btn primary" disabled={state.status === 'loading'}>
            {state.status === 'loading' ? 'Sending…' : 'Send message'}
          </button>
          {state.msg && <p className={`form-msg ${state.status}`}>{state.msg}</p>}
        </form>
      </div>
    </section>
  )
}
