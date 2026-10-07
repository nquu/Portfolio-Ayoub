import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

const allIds = ['over', 'skills', 'ervaring', 'projecten', 'contact']

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="relative flex rounded-lg bg-zinc-900/5 p-0.5 font-mono text-xs dark:bg-white/10">
      {['nl', 'en'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative rounded-md px-2 py-1 uppercase transition-colors ${lang === l ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang"
              className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-zinc-700"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  )
}

export default function Navbar({ dark, setDark }) {
  const { t } = useLang()
  const ids = allIds.filter((id) => id !== 'projecten' || t.projects.items.length > 0)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [ids.join()])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-shadow ${scrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/30' : ''}`}
      >
        <a href="#top" className="font-mono text-sm font-medium">
          <span className="text-accent">&lt;</span>AG<span className="text-accent">/&gt;</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {ids.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${active === id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}
              >
                {active === id && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-lg bg-zinc-900/5 dark:bg-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{t.nav[id]}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <button
            onClick={() => setDark(!dark)}
            aria-label={t.nav.theme}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl p-2 md:hidden"
          >
            {ids.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
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
