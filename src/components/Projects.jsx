import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { springTransition } from '../lib/animations'

const CATEGORIES = ['Web', 'Desktop', 'Mobile']
const ALL_CATEGORIES = 'all'
const TILT_DEGREES = 8

function ProjectCard({ project, categoryLabel }) {
  const cardRef = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 200, damping: 20 }
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [TILT_DEGREES, -TILT_DEGREES]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-TILT_DEGREES, TILT_DEGREES]), springConfig)

  const handlePointerMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group glass flex flex-col overflow-hidden rounded-2xl"
    >
      <div className={`relative h-36 bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
        <span className="absolute left-4 top-4 rounded-md bg-black/20 px-2 py-0.5 font-mono text-xs text-white backdrop-blur">
          {categoryLabel}
        </span>
        <ArrowUpRight className="absolute right-4 top-4 text-white opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="mt-1 flex-1 text-sm text-zinc-500 dark:text-zinc-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-md border border-zinc-200 px-2 py-0.5 font-mono text-xs dark:border-white/10">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

function CategoryFilter({ options, selected, onSelect }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selected === option.key
        return (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className={`relative rounded-full px-4 py-1.5 text-sm transition ${
              isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span layoutId="category-indicator" className="absolute inset-0 rounded-full bg-accent" transition={springTransition} />
            )}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const { eyebrow, title, all, categories, items } = t.projects
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  if (items.length === 0) return null

  const filterOptions = [
    { key: ALL_CATEGORIES, label: all },
    ...CATEGORIES.map((key) => ({ key, label: categories[key] })),
  ]
  const visibleProjects = items.filter(
    (project) => selectedCategory === ALL_CATEGORIES || project.category === selectedCategory,
  )

  return (
    <Section id="projecten" className="bg-zinc-100/60 dark:bg-zinc-900/40">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <CategoryFilter options={filterOptions} selected={selectedCategory} onSelect={setSelectedCategory} />

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.name} project={project} categoryLabel={categories[project.category]} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
