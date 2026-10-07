import { motion } from 'framer-motion'

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-28 px-4 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}

export function Heading({ eyebrow, title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-zinc-500 dark:text-zinc-400">{sub}</p>}
    </motion.div>
  )
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}
