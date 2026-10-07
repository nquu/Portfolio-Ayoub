import { motion, useScroll, useSpring } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-2"
    />
  )
}

export default function App() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <LanguageProvider>
      <ScrollProgressBar />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
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
