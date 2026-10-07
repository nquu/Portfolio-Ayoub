import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { Section, Heading, fadeUp } from './Section'
import { useLang } from '../i18n/LanguageContext'

// Formspree endpoint, e.g. 'https://formspree.io/f/xxxxxxx'. Leave empty until configured.
const FORM_ENDPOINT = ''

const inputCls =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-zinc-900'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const p = t.profile
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!FORM_ENDPOINT) {
      setStatus('unconfigured')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact">
      <Heading eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
      <div className="grid gap-6 md:grid-cols-5">
        <motion.form
          onSubmit={onSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass space-y-4 rounded-3xl p-6 md:col-span-3 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder={c.form.name} className={inputCls} />
            <input name="email" type="email" required placeholder={c.form.email} className={inputCls} />
          </div>
          <textarea name="message" required rows={5} placeholder={c.form.message} className={inputCls} />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-60 dark:bg-white dark:text-zinc-900"
            >
              <Send size={16} /> {status === 'sending' ? c.form.sending : c.form.send}
            </button>
            {status === 'sent' && (
              <span className="inline-flex items-center gap-1.5 text-sm text-emerald-500">
                <Check size={16} /> {c.form.sent}
              </span>
            )}
            {(status === 'error' || status === 'unconfigured') && (
              <span className="inline-flex items-center gap-1.5 text-sm text-rose-500">
                <AlertCircle size={16} /> {c.form.error}
              </span>
            )}
          </div>
        </motion.form>

        <div className="grid gap-3 md:col-span-2">
          {[
            { icon: Linkedin, label: c.labels.linkedin, value: c.linkedinValue, href: p.linkedin },
            { icon: Github, label: c.labels.github, value: c.githubValue, href: p.github },
          ].map((it, i) => (
            <motion.a
              key={it.label}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 transition hover:border-accent"
            >
              <it.icon size={18} className="text-accent" />
              <p className="mt-3 text-xs text-zinc-500">{it.label}</p>
              <p className="truncate text-sm font-medium">{it.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}
