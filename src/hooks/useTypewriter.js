import { useEffect, useState } from 'react'

const TYPE_DELAY = 80
const DELETE_DELAY = 40
const HOLD_DELAY = 1500

export function useTypewriter(words) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setText('')
    setWordIndex(0)
    setIsDeleting(false)
  }, [words])

  useEffect(() => {
    const word = words[wordIndex % words.length]

    const step = () => {
      if (!isDeleting) {
        const next = word.slice(0, text.length + 1)
        setText(next)
        if (next.length === word.length) setTimeout(() => setIsDeleting(true), HOLD_DELAY)
        return
      }

      const next = word.slice(0, text.length - 1)
      setText(next)
      if (next.length === 0) {
        setIsDeleting(false)
        setWordIndex((current) => current + 1)
      }
    }

    const timer = setTimeout(step, isDeleting ? DELETE_DELAY : TYPE_DELAY)
    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, words])

  return text
}
