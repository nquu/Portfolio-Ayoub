import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Section, SectionHeading } from './Section'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp } from '../lib/animations'
import { CONTACT_FORM_ENDPOINT, SOCIAL_LINKS } from '../config'

const FormStatus = {
  Idle: 'idle',
  Sending: 'sending',
  Sent: 'sent',
  Error: 'error',
}

const inputClass =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/10 dark:bg-zinc-900'

const revealProps = { variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport: { once: true } }

async function submitContactForm(form) {
  if (!CONTACT_FORM_ENDPOINT) return false
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: new FormData(form),
  })
  return response.ok
}

function ContactForm({ labels }) {
  const [status, setStatus] = useState(FormStatus.Idle)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus(FormStatus.Sending)

    try {
      const success = await submitContactForm(form)
      setStatus(success ? FormStatus.Sent : FormStatus.Error)
      if (success) form.reset()
    } catch {
      setStatus(FormStatus.Error)
    }
  }

  return (
    <motion.form onSubmit={handleSubmit} {...revealProps} className="glass space-y-4 rounded-3xl p-6 md:col-span-3 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder={labels.name} className={inputClass} />
        <input name="email" type="email" required placeholder={labels.email} className={inputClass} />
      </div>
      <textarea name="message" required rows={5} placeholder={labels.message} className={inputClass} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === FormStatus.Sending}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-60 dark:bg-white dark:text-zinc-900"
        >
          <Send size={16} /> {status === FormStatus.Sending ? labels.sending : labels.send}
        </button>

        {status === FormStatus.Sent && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-500">
            <Check size={16} /> {labels.sent}
          </span>
        )}
        {status === FormStatus.Error && (
          <span className="inline-flex items-center gap-1.5 text-sm text-rose-500">
            <AlertCircle size={16} /> {labels.error}
          </span>
        )}
      </div>
    </motion.form>
  )
}

function SocialCard({ icon: Icon, label, value, href, index }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      custom={index}
      {...revealProps}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 transition hover:border-accent"
    >
      <Icon size={18} className="text-accent" />
      <p className="mt-3 text-xs text-zinc-500">{label}</p>
      <p className="truncate text-sm font-medium">{value}</p>
    </motion.a>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const { eyebrow, title, subtitle, form, social } = t.contact

  const socialCards = [
    { icon: LinkedinIcon, label: social.linkedin.label, value: social.linkedin.value, href: SOCIAL_LINKS.linkedin },
    { icon: GithubIcon, label: social.github.label, value: social.github.value, href: SOCIAL_LINKS.github },
  ]

  return (
    <Section id="contact">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <div className="grid gap-6 md:grid-cols-5">
        <ContactForm labels={form} />
        <div className="grid gap-3 md:col-span-2">
          {socialCards.map((card, index) => (
            <SocialCard key={card.label} {...card} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
