import { createContext, useContext, useEffect, useState } from 'react'
import nl from './nl'
import en from './en'

const dict = { nl, en }
const LanguageContext = createContext({ lang: 'nl', t: nl, setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'nl' || saved === 'en') return saved
    } catch {
      /* ignore */
    }
    return navigator.language?.startsWith('nl') ? 'nl' : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return <LanguageContext.Provider value={{ lang, t: dict[lang], setLang }}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
