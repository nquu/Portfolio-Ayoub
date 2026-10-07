import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'

const STORAGE_KEY = 'theme'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => readStorage(STORAGE_KEY) !== 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    writeStorage(STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((current) => !current)

  return { isDark, toggleTheme }
}
