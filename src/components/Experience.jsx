import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp } from '../lib/animations'

function ExperienceItem({ job, index }) {
  return (
    <motion.div
      custom={index}
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
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-zinc-500">
              {job.company} · {job.place}
            </p>
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-xs dark:bg-zinc-800">{job.period}</span>
        </div>

        <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
          {job.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="text-accent">›</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const { t } = useLanguage()
  const { eyebrow, title, items } = t.experience

  return (
    <Section id="ervaring">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="relative ml-3 border-l border-zinc-200 pl-8 dark:border-white/10">
        {items.map((job, index) => (
          <ExperienceItem key={job.company} job={job} index={index} />
        ))}
      </div>
    </Section>
  )
}
