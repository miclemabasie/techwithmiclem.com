import { Github, Linkedin, Youtube, Mail } from 'lucide-react'
import Logo from './Logo'

// TODO: replace with your real profile URLs
export const SOCIALS = {
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  youtube: 'https://youtube.com/',
  email: 'mailto:miclemabasie3@gmail.com',
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Logo />
          <p className="footer-tags">Systems · C++ · Embedded · Automotive · Robotics</p>
        </div>
        <blockquote className="footer-quote">
          “The goal isn't to know everything, but to understand what really matters.”
          <cite>— Miclem Abasie</cite>
        </blockquote>
        <div className="footer-right">
          <div className="socials">
            <a href={SOCIALS.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={16} /></a>
            <a href={SOCIALS.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={16} /></a>
            <a href={SOCIALS.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><Youtube size={16} /></a>
            <a href={SOCIALS.email} aria-label="Email"><Mail size={16} /></a>
          </div>
          <p>© {new Date().getFullYear()} TechWithMiclem. Built with curiosity.</p>
        </div>
      </div>
    </footer>
  )
}
