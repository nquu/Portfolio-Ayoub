import { motion } from 'framer-motion'
import { Section, Heading, fadeUp } from './Section'
import { useLang } from '../i18n/LanguageContext'

export default function Skills() {
  const { t } = useLang()
  const s = t.skills
  return (
    <Section id="skills" className="bg-zinc-100/60 dark:bg-zinc-900/40">
      <Heading eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
      <div className="grid gap-6 md:grid-cols-3">
        {s.groups.map((g, gi) => (
          <motion.div
            key={g.group}
            custom={gi}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ scale: 1.08, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-default rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-white/10 dark:bg-zinc-800"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {s.languages.map((l, i) => (
          <motion.div
            key={l.name}
            custom={i + 3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass rounded-2xl p-5"
          >
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">{l.name}</span>
              <span className="text-zinc-500">{l.level}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${l.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
