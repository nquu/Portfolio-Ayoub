import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { useLanguage } from '../i18n/LanguageContext'
import { useTypewriter } from '../hooks/useTypewriter'
import { SOCIAL_LINKS } from '../config'

const enterFrom = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay },
})

const primaryButton =
  'inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 dark:bg-white dark:text-zinc-900'
const secondaryButton =
  'glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5'
const iconLink = 'rounded-lg p-2 text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white'

export default function Hero() {
  const { t } = useLanguage()
  const typedRole = useTypewriter(t.hero.roles)
  const hasProjects = t.projects.items.length > 0

  return (
    <section id="top" className="grid-bg relative flex min-h-screen items-center overflow-hidden px-4 pt-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-3xl" />

      <div className="mx-auto w-full max-w-5xl">
        <motion.div {...enterFrom(0.1)} className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.hero.badge}
        </motion.div>

        <motion.h1 {...enterFrom(0.2)} className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          {t.hero.greeting}{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Ayoub</span>.
        </motion.h1>

        <motion.p {...enterFrom(0.3)} className="mt-4 font-mono text-lg text-zinc-600 dark:text-zinc-300 md:text-2xl">
          <span className="text-accent">$</span> {typedRole}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.p {...enterFrom(0.4)} className="mt-6 max-w-xl text-zinc-500 dark:text-zinc-400">
          {t.hero.intro}
        </motion.p>

        <motion.div {...enterFrom(0.5)} className="mt-8 flex flex-wrap items-center gap-3">
          {hasProjects && (
            <a href="#projecten" className={`group ${primaryButton}`}>
              {t.hero.cta} <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
            </a>
          )}
          <a href="#contact" className={hasProjects ? secondaryButton : primaryButton}>
            <Mail size={16} /> {t.hero.contact}
          </a>
          <div className="ml-1 flex items-center gap-1">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconLink}>
              <GithubIcon size={20} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconLink}>
              <LinkedinIcon size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
