import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-zinc-200 px-4 py-8 text-center text-xs text-zinc-500 dark:border-white/10">
      © {new Date().getFullYear()} Ayoub Guebli · {t.footer}
    </footer>
  )
}
