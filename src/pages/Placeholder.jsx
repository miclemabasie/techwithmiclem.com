import { Link } from 'react-router-dom'

export default function Placeholder({ eyebrow, title, blurb }) {
  return (
    <section className="hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{blurb}</p>
        <Link to="/" className="btn primary">Back home</Link>
      </div>
    </section>
  )
}
