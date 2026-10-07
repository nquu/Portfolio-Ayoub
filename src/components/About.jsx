import { motion } from 'framer-motion'
import { Server, Code2, Rocket, ShieldCheck } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp } from '../lib/animations'

const STAT_ICONS = [Server, Code2, Rocket, ShieldCheck]

const revealProps = { variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport: { once: true } }

export default function About() {
  const { t } = useLanguage()
  const { eyebrow, title, bio, stats } = t.about

  return (
    <Section id="over">
      <SectionHeading eyebrow={eyebrow} title={title} />

      <div className="grid gap-8 md:grid-cols-5">
        <div className="space-y-4 md:col-span-3">
          {bio.map((paragraph, index) => (
            <motion.p
              key={index}
              custom={index}
              {...revealProps}
              className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-2">
          {stats.map((stat, index) => {
            const Icon = STAT_ICONS[index]
            return (
              <motion.div
                key={stat.label}
                custom={index}
                {...revealProps}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-4"
              >
                <Icon size={18} className="text-accent" />
                <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
