import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="TechWithMiclem home">
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 50 L24 14 L32 34 L40 14 L56 50" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span>
        TECHWITH<b>MICLEM</b>
      </span>
    </Link>
  )
}
