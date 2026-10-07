import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { useLang } from '../i18n/LanguageContext'

function useTyping(words) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    setText('')
    setI(0)
    setDel(false)
  }, [words])
  useEffect(() => {
    const word = words[i % words.length]
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1))
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1500)
        } else {
          setText(word.slice(0, text.length - 1))
          if (text.length - 1 === 0) {
            setDel(false)
            setI(i + 1)
          }
        }
      },
      del ? 40 : 80,
    )
    return () => clearTimeout(t)
  }, [text, del, i, words])
  return text
}

export default function Hero() {
  const { t } = useLang()
  const typed = useTyping(t.hero.roles)
  const hasProjects = t.projects.items.length > 0
  return (
    <section id="top" className="grid-bg relative flex min-h-screen items-center overflow-hidden px-4 pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-3xl" />
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
        >
          {t.hero.greeting}{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Ayoub</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 font-mono text-lg text-zinc-600 dark:text-zinc-300 md:text-2xl"
        >
          <span className="text-accent">$</span> {typed}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl text-zinc-500 dark:text-zinc-400"
        >
          {t.hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {hasProjects && (
            <a
              href="#projecten"
              className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 dark:bg-white dark:text-zinc-900"
            >
              {t.hero.cta} <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
            </a>
          )}
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 ${hasProjects ? 'glass' : 'bg-zinc-900 text-white hover:shadow-lg hover:shadow-accent/30 dark:bg-white dark:text-zinc-900'}`}
          >
            <Mail size={16} /> {t.hero.contact}
          </a>
          <div className="ml-1 flex items-center gap-1">
            <a
              href={t.profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg p-2 text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href={t.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg p-2 text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
