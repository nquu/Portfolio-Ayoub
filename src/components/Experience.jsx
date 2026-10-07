import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Section, Heading, fadeUp } from './Section'
import { useLang } from '../i18n/LanguageContext'

export default function Experience() {
  const { t } = useLang()
  const x = t.experience
  return (
    <Section id="ervaring">
      <Heading eyebrow={x.eyebrow} title={x.title} />
      <div className="relative ml-3 border-l border-zinc-200 pl-8 dark:border-white/10">
        {x.items.map((e, i) => (
          <motion.div
            key={e.company}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white ring-4 ring-zinc-50 dark:ring-zinc-950">
              <Briefcase size={12} />
            </span>
            <motion.div whileHover={{ x: 4 }} className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="text-sm text-zinc-500">
                    {e.company} · {e.place}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs dark:bg-zinc-800">{e.period}</span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-accent">›</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
