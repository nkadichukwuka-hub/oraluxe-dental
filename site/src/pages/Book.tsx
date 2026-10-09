import { useState } from 'react'
import type { FormEvent } from 'react'
import { services } from '../data/services'

// Set VITE_WEBHOOK_URL in site/.env.local once the n8n webhook exists.
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string | undefined

const treatments = [...services.map((s) => s.title), 'Not sure / general question']

type Values = { name: string; email: string; phone: string; treatment: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'demo'

const empty: Values = { name: '', email: '', phone: '', treatment: '', message: '' }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a phone number we can reach you on.'
  if (!v.treatment) e.treatment = 'Please choose a treatment.'
  if (v.message.trim().length < 10) e.message = 'Please tell us a little more (at least a sentence).'
  return e
}

export default function Book() {
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('')

  const set = (k: keyof Values, val: string) => {
    const next = { ...values, [k]: val }
    setValues(next)
    if (touched[k]) setErrors(validate(next))
  }

  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, treatment: true, message: true })
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    if (trap) {
      setStatus('sent') // a bot filled the hidden field: pretend it worked
      return
    }
    setStatus('sending')
    if (!WEBHOOK_URL) {
      setStatus('demo')
      return
    }
    try {
      const ctrl = new AbortController()
      const timer = window.setTimeout(() => ctrl.abort(), 30000)
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, submittedAt: new Date().toISOString(), source: 'oraluxe-website' }),
        signal: ctrl.signal,
      })
      window.clearTimeout(timer)
      setStatus(res.ok ? 'sent' : 'demo')
    } catch {
      setStatus('demo')
    }
  }

  const reset = () => {
    setValues(empty)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  const field = (k: keyof Values) => ({
    id: `f-${k}`,
    'aria-invalid': touched[k] && errors[k] ? true : undefined,
    'aria-describedby': touched[k] && errors[k] ? `e-${k}` : undefined,
    onBlur: () => blur(k),
  })
  const err = (k: keyof Values) =>
    touched[k] && errors[k] ? (
      <small className="field-error" id={`e-${k}`} role="alert">{errors[k]}</small>
    ) : null

  return (
    <>
      <header className="page-hero">
        <div className="page-hero-inner">
          <span className="pill">BOOK AN APPOINTMENT</span>
          <h1>Tell us how we can help</h1>
          <p>
            Fill in the form and we will reply within one working day. If you are in pain, say so
            in your message and we will see you first.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="book-grid">
          <div className="form-card">
            {status === 'sent' && (
              <div className="notice notice-ok" role="status">
                <h2>Thank you, {values.name.split(' ')[0] || 'we have your enquiry'}.</h2>
                <p>We have your enquiry and will email you within one working day.</p>
                <button className="btn btn-primary" onClick={reset}>Send another enquiry</button>
              </div>
            )}

            {status === 'demo' && (
              <div className="notice notice-demo" role="status">
                <h2>Thanks, your enquiry looks good</h2>
                <p>
                  Oraluxe is a demo clinic, so this enquiry was checked but not sent. The real
                  automation sorts each enquiry with AI, logs it to a Google Sheet and emails the
                  clinic with urgent cases first. It runs on its own server, and you can watch it
                  working in the{' '}
                  <a className="inline-link" href="https://goshen-portfolio.vercel.app" target="_blank" rel="noopener noreferrer">
                    demo video on my portfolio
                  </a>
                  .
                </p>
                <button className="btn btn-primary" onClick={reset}>Try another enquiry</button>
              </div>
            )}

            {(status === 'idle' || status === 'sending') && (
              <form onSubmit={onSubmit} noValidate>
                <div className="row-2">
                  <div className="field">
                    <label htmlFor="f-name">Full name</label>
                    <input {...field('name')} type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
                    {err('name')}
                  </div>
                  <div className="field">
                    <label htmlFor="f-phone">Phone</label>
                    <input {...field('phone')} type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} />
                    {err('phone')}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input {...field('email')} type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} />
                  {err('email')}
                </div>

                <div className="field">
                  <label htmlFor="f-treatment">Treatment</label>
                  <select {...field('treatment')} value={values.treatment} onChange={(e) => set('treatment', e.target.value)}>
                    <option value="">Choose a treatment…</option>
                    {treatments.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {err('treatment')}
                </div>

                <div className="field">
                  <label htmlFor="f-message">Message</label>
                  <textarea {...field('message')} rows={5} placeholder="What would you like help with? Mention any pain, and when suits you." value={values.message} onChange={(e) => set('message', e.target.value)} />
                  {err('message')}
                </div>

                {/* Hidden spam trap: real people never see or fill this */}
                <div className="trap" aria-hidden="true">
                  <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
                </div>

                <button className="btn btn-primary btn-lg submit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request appointment'}
                </button>
              </form>
            )}
          </div>

          <aside className="book-side">
            <div className="side-card">
              <h3>In pain right now?</h3>
              <p>Call us and we will do our best to see you today.</p>
              <a href="tel:+15551234567" className="btn btn-primary">Call (555) 123-4567</a>
            </div>
            <div className="side-card">
              <h3>Opening hours</h3>
              <ul className="hours">
                <li><span>Mon – Fri</span><span>8:00 – 18:00</span></li>
                <li><span>Saturday</span><span>9:00 – 14:00</span></li>
                <li><span>Sunday</span><span>Emergencies only</span></li>
              </ul>
            </div>
            <p className="fine left">Demo site: the clinic, phone number and hours are fictional.</p>
          </aside>
        </div>
      </section>
    </>
  )
}
