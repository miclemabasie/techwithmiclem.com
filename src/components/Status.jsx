export function Loading({ label = 'Loading…' }) {
  return <p className="status" role="status">{label}</p>
}

export function ErrorBox({ error }) {
  return (
    <div className="status error" role="alert">
      <strong>Couldn't load data.</strong>
      <span>{error?.message || String(error)}</span>
    </div>
  )
}
