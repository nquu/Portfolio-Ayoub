import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section, Heading } from './Section'
import { useLang } from '../i18n/LanguageContext'

const catKeys = ['Web', 'Desktop', 'Mobile']

function TiltCard({ p, catLabel }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.a
      ref={ref}
      href={p.link}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group glass flex flex-col overflow-hidden rounded-2xl"
    >
      <div className={`relative h-36 bg-gradient-to-br ${p.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
        <span className="absolute left-4 top-4 rounded-md bg-black/20 px-2 py-0.5 font-mono text-xs text-white backdrop-blur">
          {catLabel}
        </span>
        <ArrowUpRight className="absolute right-4 top-4 text-white opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <p className="mt-1 flex-1 text-sm text-zinc-500 dark:text-zinc-400">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((tech) => (
            <span key={tech} className="rounded-md border border-zinc-200 px-2 py-0.5 font-mono text-xs dark:border-white/10">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const { t } = useLang()
  const pr = t.projects
  const [cat, setCat] = useState('all')
  if (pr.items.length === 0) return null
  const list = pr.items.filter((p) => cat === 'all' || p.cat === cat)
  const cats = [{ key: 'all', label: pr.all }, ...catKeys.map((k) => ({ key: k, label: pr.cats[k] }))]
  return (
    <Section id="projecten" className="bg-zinc-100/60 dark:bg-zinc-900/40">
      <Heading eyebrow={pr.eyebrow} title={pr.title} />
      <div className="mb-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`relative rounded-full px-4 py-1.5 text-sm transition ${cat === c.key ? 'text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            {cat === c.key && (
              <motion.span
                layoutId="cat"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <TiltCard key={p.name} p={p} catLabel={pr.cats[p.cat]} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
