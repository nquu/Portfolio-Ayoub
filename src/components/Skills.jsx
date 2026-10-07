import { motion } from 'framer-motion'
import { Section, SectionHeading } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp } from '../lib/animations'

const revealProps = { variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport: { once: true } }

function SkillGroup({ group, index }) {
  return (
    <motion.div custom={index} {...revealProps} className="glass rounded-2xl p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">{group.title}</h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.08, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-default rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-white/10 dark:bg-zinc-800"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function LanguageBar({ language, index }) {
  return (
    <motion.div custom={index} {...revealProps} className="glass rounded-2xl p-5">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium">{language.name}</span>
        <span className="text-zinc-500">{language.level}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${language.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const { eyebrow, title, subtitle, groups, languages } = t.skills

  return (
    <Section id="skills" className="bg-zinc-100/60 dark:bg-zinc-900/40">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group, index) => (
          <SkillGroup key={group.title} group={group} index={index} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {languages.map((language, index) => (
          <LanguageBar key={language.name} language={language} index={index + groups.length} />
        ))}
      </div>
    </Section>
  )
}
