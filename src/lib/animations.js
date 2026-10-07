export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export const springTransition = { type: 'spring', stiffness: 400, damping: 30 }
