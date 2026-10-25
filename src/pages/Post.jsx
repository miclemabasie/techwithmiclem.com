import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Loading, ErrorBox } from '../components/Status'
import { useAsync, formatDate } from '../lib/useAsync'
import { fetchPost } from '../lib/api'

export default function Post() {
  const { slug } = useParams()
  const { data: post, loading, error } = useAsync(() => fetchPost(slug), [slug])

  return (
    <div className="container post-page">
      <Link to="/journal" className="back"><ArrowLeft size={15} /> Back to journal</Link>

      {loading && <Loading />}
      {error && <ErrorBox error={error} />}
      {!loading && !error && !post && <p className="status">Post not found.</p>}

      {post && (
        <article>
          {post.categories?.name && <span className="pill static">{post.categories.name}</span>}
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span><Calendar size={13} /> {formatDate(post.published_at)}</span>
            <span><Clock size={13} /> {post.read_minutes} min read</span>
          </div>
          {post.cover_url && <img className="post-hero" src={post.cover_url} alt="" />}
          <div className="prose">
            {post.content
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
          {post.tags?.length > 0 && (
            <div className="tags">
              {post.tags.map((t) => (
                <Link key={t} className="tag" to={`/journal?q=${encodeURIComponent(t)}`}>{t}</Link>
              ))}
            </div>
          )}
        </article>
      )}
    </div>
  )
}
