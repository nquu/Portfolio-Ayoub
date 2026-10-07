import { motion } from 'framer-motion'
import { Server, Code2, Rocket, ShieldCheck } from 'lucide-react'
import { Section, Heading, fadeUp } from './Section'
import { useLang } from '../i18n/LanguageContext'

const icons = [Server, Code2, Rocket, ShieldCheck]

export default function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <Section id="over">
      <Heading eyebrow={a.eyebrow} title={a.title} />
      <div className="grid gap-8 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          {a.bio.map((p, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300"
            >
              {p}
            </motion.p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:col-span-2">
          {a.stats.map((s, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-4"
              >
                <Icon size={18} className="text-accent" />
                <p className="mt-3 text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {a.education && (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="glass mt-8 flex flex-col gap-2 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="font-semibold">{a.education.title}</p>
          <p className="text-sm text-zinc-500">
            {a.education.school}, {a.education.place}
          </p>
        </div>
        <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">{a.education.period}</span>
      </motion.div>
      )}
    </Section>
  )
}
