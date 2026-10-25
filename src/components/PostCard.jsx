import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '../lib/useAsync'

export default function PostCard({ post }) {
  const cat = post.categories?.name
  return (
    <article className="card post-card">
      <Link to={`/journal/${post.slug}`} className="post-cover" aria-label={post.title}>
        {post.cover_url ? (
          <img src={post.cover_url} alt="" loading="lazy" />
        ) : (
          <div className="cover-fallback" aria-hidden="true">
            <span>{cat || 'Post'}</span>
          </div>
        )}
        {cat && <span className="pill">{cat}</span>}
      </Link>
      <div className="post-body">
        <h3>
          <Link to={`/journal/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="muted">{post.excerpt}</p>
        <div className="post-meta">
          <span><Calendar size={13} /> {formatDate(post.published_at)}</span>
          <span><Clock size={13} /> {post.read_minutes} min read</span>
          <Link to={`/journal/${post.slug}`} className="read-more">
            Read more <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}
