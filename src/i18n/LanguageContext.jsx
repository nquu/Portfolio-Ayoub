import { createContext, useContext, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import nl from './nl'
import en from './en'

const STORAGE_KEY = 'lang'
const translations = { nl, en }
export const SUPPORTED_LANGUAGES = Object.keys(translations)

const LanguageContext = createContext({ language: 'nl', t: nl, setLanguage: () => {} })

function detectLanguage() {
  const saved = readStorage(STORAGE_KEY)
  if (SUPPORTED_LANGUAGES.includes(saved)) return saved
  return navigator.language?.startsWith('nl') ? 'nl' : 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    writeStorage(STORAGE_KEY, language)
  }, [language])

  const value = { language, t: translations[language], setLanguage }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
