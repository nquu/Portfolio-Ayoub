import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 px-4 py-8 text-center text-xs text-zinc-500 dark:border-white/10">
      © {year} Ayoub Guebli · {t.footer}
    </footer>
  )
}
