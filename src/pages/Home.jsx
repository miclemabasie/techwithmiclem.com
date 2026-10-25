import { Link } from 'react-router-dom'
import {
  ArrowRight, Laptop, Cpu, Car, Bot, Briefcase, Users, Mic, MessageCircle,
  Github, Linkedin, Youtube, Mail,
} from 'lucide-react'
import { Loading, ErrorBox } from '../components/Status'
import { useAsync } from '../lib/useAsync'
import { fetchHome } from '../lib/api'
import { Icon } from '../lib/icons'
import { SOCIALS } from '../components/Footer'

const MONTH = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

export default function Home() {
  const { data, loading, error } = useAsync(fetchHome, [])

  return (
    <>
      {/* Hero */}
      <section className="hero hero-home">
        <div className="container hero-grid">
          <div>
            <p className="hi">Hi, I'm</p>
            <h1 className="name">MICLEM <span className="accent">ABASIE</span></h1>
            <p className="tagline">I build systems from the machine upward.</p>
            <p className="chips-line">C++ · Embedded Systems · Computer Architecture · Linux · Automotive · Robotics</p>
            <p className="lede">
              I'm an engineer obsessed with understanding what happens between the code I write and the physical system that
              ultimately executes it.
            </p>
            <div className="btn-row">
              <Link to="/lab" className="btn primary">Explore the Lab <ArrowRight size={15} /></Link>
              <Link to="/journal" className="btn ghost">Read the Engineering Journal</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="screen">
              <span /><span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
      </section>

      {loading && <div className="container"><Loading /></div>}
      {error && <div className="container"><ErrorBox error={error} /></div>}

      {data && (
        <>
          {/* Current focus */}
          <section className="band">
            <div className="container focus-grid">
              <div>
                <p className="eyebrow mono">Current focus</p>
                <h2>What I'm working on right now</h2>
                <p className="muted">{MONTH}</p>
                <ol className="focus-list">
                  {data.focus.map((f, i) => (
                    <li key={f.id}>
                      <span className="num">{String(i + 1).padStart(2, '0')}</span>
                      <span>{f.title}{f.detail && <small> ({f.detail})</small>}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="terminal" aria-label="Terminal">
                <div className="term-bar"><i /><i /><i /><span>terminal</span></div>
                <pre>
{`miclem@techwithmiclem:~$ whoami
miclem

miclem@techwithmiclem:~$ cat /mission.txt
Understand computers deeply.
Build reliable systems.
Eventually build machines
that interact with the physical world.

miclem@techwithmiclem:~$ `}<span className="cursor">▋</span>
                </pre>
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="philosophy">
            <div className="container philosophy-grid">
              <div>
                <p className="eyebrow mono">The philosophy</p>
                <h2 className="big">
                  I don't want to merely use computers.<br />
                  <span className="accent">I want to understand them.</span>
                </h2>
                <p>
                  A web framework can change next year. A language can lose popularity. But underneath all of that are
                  processors, memory, operating systems, buses, interrupts, concurrency, compilers, networks and physical systems.
                </p>
                <p>That's where I want to work.</p>
              </div>
              <blockquote className="pull">
                Not just software.<br />But the systems behind it all.
              </blockquote>
            </div>
          </section>

          {/* Technical depth + proof */}
          <section className="container depth-grid">
            <div>
              <p className="eyebrow mono">Technical depth</p>
              <p className="muted">The tools, technologies and concepts I work with.</p>
              <div className="skill-grid">
                {data.skills.map((s) => (
                  <div key={s.id} className="skill">
                    <span className="skill-icon"><Icon name={s.icon} size={20} /></span>
                    <h4>{s.title}</h4>
                    <p>{s.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mono">Tech proof</p>
              <p className="muted">Not just claims — real evidence.</p>
              <ul className="proof">
                {data.proofs.map((p) => (
                  <li key={p.id}>
                    <div className="proof-row">
                      <span><Icon name={p.icon} size={16} /> {p.label}</span>
                      <b className={`status-${p.status.toLowerCase()}`}>{p.status}</b>
                    </div>
                    <div className="bar"><div className={`fill status-${p.status.toLowerCase()}`} style={{ width: `${p.progress}%` }} /></div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Featured projects</p>
                <p className="muted">A few systems from the lab.</p>
              </div>
              <Link to="/lab" className="read-more">View all projects <ArrowRight size={13} /></Link>
            </div>
            <div className="project-grid">
              {data.projects.map((p) => (
                <article key={p.id} className="card project">
                  <div className="project-img">
                    {p.image_url ? <img src={p.image_url} alt="" loading="lazy" /> : <div className="cover-fallback"><span>{p.title}</span></div>}
                  </div>
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <div className="tags small">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                    <p className="muted">{p.description}</p>
                    {p.link ? (
                      <a className="read-more" href={p.link} target="_blank" rel="noreferrer">View project <ArrowRight size={13} /></a>
                    ) : (
                      <Link className="read-more" to="/lab">View project <ArrowRight size={13} /></Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Systems / Roadmap / CTA */}
          <section className="container triple">
            <div>
              <p className="eyebrow mono">The systems I build</p>
              <p className="muted">From software to hardware. From embedded to robotics.</p>
              <div className="system-map">
                <span><Laptop size={16} /> Software</span>
                <span><Cpu size={16} /> Embedded</span>
                <span><Cpu size={16} /> Hardware</span>
                <span><Car size={16} /> Automotive</span>
                <span><Bot size={16} /> Robotics</span>
                <strong>REAL SYSTEMS</strong>
              </div>
            </div>

            <div>
              <p className="eyebrow mono">The road ahead</p>
              <p className="muted">A long way to go. Still excited.</p>
              <ul className="roadmap">
                {data.roadmap.map((r) => (
                  <li key={r.id}>
                    <strong>{r.title}</strong>
                    <small>{r.period}</small>
                  </li>
                ))}
              </ul>
              <p className="muted small">Not in a hurry. Just building the right things.</p>
            </div>

            <div>
              <p className="eyebrow mono">Let's build something</p>
              <p className="muted">Open to interesting problems.</p>
              <div className="cta-grid">
                <Link to="/contact" className="cta"><Briefcase size={18} /><b>Hire me</b><small>For a role or contract</small></Link>
                <Link to="/contact" className="cta"><Users size={18} /><b>Collaborate</b><small>On a project or idea</small></Link>
                <Link to="/contact" className="cta"><Mic size={18} /><b>Invite me to speak</b><small>At events or conferences</small></Link>
                <Link to="/contact" className="cta"><MessageCircle size={18} /><b>Get in touch</b><small>Just because</small></Link>
              </div>
              <p className="muted small">Find me elsewhere</p>
              <div className="socials">
                <a href={SOCIALS.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
                <a href={SOCIALS.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={18} /></a>
                <a href={SOCIALS.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><Youtube size={18} /></a>
                <a href={SOCIALS.email} aria-label="Email"><Mail size={18} /></a>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
