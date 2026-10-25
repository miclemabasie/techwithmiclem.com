import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Post from './pages/Post'
import Contact from './pages/Contact'
import Placeholder from './pages/Placeholder'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<Post />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/engineer"
            element={<Placeholder eyebrow="The Engineer" title="About me" blurb="The story, background and the way I think about systems. Coming soon." />}
          />
          <Route
            path="/lab"
            element={<Placeholder eyebrow="The Lab" title="Projects & experiments" blurb="Everything I'm building, breaking and learning from. Coming soon." />}
          />
          <Route
            path="/under-the-hood"
            element={<Placeholder eyebrow="Under the Hood" title="Deep dives" blurb="Long-form explorations of how computers really work. Coming soon." />}
          />
          <Route
            path="/talks"
            element={<Placeholder eyebrow="Talks" title="Talks & conferences" blurb="Speaking engagements and slides. Coming soon." />}
          />
          <Route
            path="/now"
            element={<Placeholder eyebrow="Now" title="What I'm doing now" blurb="A live snapshot of my current focus. Coming soon." />}
          />
          <Route path="*" element={<Placeholder eyebrow="404" title="Page not found" blurb="That page doesn't exist." />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
