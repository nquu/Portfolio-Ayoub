import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return (localStorage.getItem('theme') ?? 'dark') === 'dark'
    } catch {
      return true
    }
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [dark])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <LanguageProvider>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
      />
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
