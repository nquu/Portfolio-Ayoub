import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('')
  const dependencyKey = sectionIds.join(',')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [dependencyKey])

  return activeId
}
