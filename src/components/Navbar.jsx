import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLanguage, SUPPORTED_LANGUAGES } from '../i18n/LanguageContext'
import { useActiveSection } from '../hooks/useActiveSection'
import { springTransition } from '../lib/animations'

const SECTION_IDS = ['over', 'skills', 'ervaring', 'projecten', 'contact']

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative flex rounded-lg bg-zinc-900/5 p-0.5 font-mono text-xs dark:bg-white/10">
      {SUPPORTED_LANGUAGES.map((code) => {
        const isActive = language === code
        return (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            className={`relative rounded-md px-2 py-1 uppercase transition-colors ${
              isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="language-indicator"
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-zinc-700"
                transition={springTransition}
              />
            )}
            <span className="relative">{code}</span>
          </button>
        )
      })}
    </div>
  )
}

function ThemeToggle({ isDark, onToggle, label }) {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="block"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Navbar({ isDark, onToggleTheme }) {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const hasProjects = t.projects.items.length > 0
  const sectionIds = SECTION_IDS.filter((id) => id !== 'projecten' || hasProjects)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-shadow ${
          isScrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/30' : ''
        }`}
      >
        <a href="#top" className="font-mono text-sm font-medium">
          <span className="text-accent">&lt;</span>AG<span className="text-accent">/&gt;</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sectionIds.map((id) => {
            const isActive = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-zinc-900/5 dark:bg-white/10"
                      transition={springTransition}
                    />
                  )}
                  <span className="relative">{t.nav[id]}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} label={t.nav.theme} />
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-2 md:hidden"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-2 md:hidden"
          >
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm hover:bg-zinc-900/5 dark:hover:bg-white/10"
              >
                {t.nav[id]}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
