import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

function Icon({ d, size = 28 }: { d: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export function AboutPreview() {
  return (
    <section className="section">
      <div className="about-grid">
        <div className="photo-grid">
          <img className="ph ph-a" src="/images/about-dentist.jpg" alt="A dentist examining a patient under bright clinic lights" width="1200" height="800" loading="lazy" />
          <img className="ph ph-b" src="/images/about-clinic.jpg" alt="A bright treatment room with a dental chair" width="1200" height="1745" loading="lazy" />
          <img className="ph ph-c" src="/images/about-smile.jpg" alt="A close-up of a confident smile" width="1200" height="712" loading="lazy" />
          <div className="years">
            <strong>15+</strong>
            <span>years of caring for smiles</span>
          </div>
        </div>
        <div>
          <span className="pill">ABOUT US</span>
          <h2>Dentistry that feels calm, clear and personal</h2>
          <p className="lead">
            Oraluxe was built for people who put off the dentist. We explain every step, move at
            your pace, and plan treatment around your life, not the other way round.
          </p>
          <ul className="ticks">
            <li>Honest advice and clear prices before any treatment</li>
            <li>Gentle techniques and modern, low-discomfort equipment</li>
            <li>Care for the whole family, from first teeth onwards</li>
          </ul>
          <Link to="/about" className="btn btn-primary">Meet our team</Link>
        </div>
      </div>
    </section>
  )
}

export function ServiceCards() {
  return (
    <section className="section section-tint">
      <div className="section-head">
        <span className="pill">OUR SERVICES</span>
        <h2>Everything your smile needs, under one roof</h2>
      </div>
      <div className="cards">
        {services.map((s) => (
          <article className="card" key={s.title}>
            <span className="card-icon"><Icon d={s.icon} /></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <div className="center">
        <Link to="/services" className="btn btn-outline">See all services</Link>
      </div>
    </section>
  )
}

const reasons = [
  { title: 'Unhurried appointments', text: 'Longer slots so you are never rushed or talked over.' },
  { title: 'Same-day emergencies', text: 'Call in the morning and we will do our best to see you that day.' },
  { title: 'Clear, upfront pricing', text: 'A written plan and cost before we begin. No surprises.' },
  { title: 'Anxiety-friendly care', text: 'Signals, breaks and calm explanations for nervous patients.' },
]

export function WhyChoose() {
  return (
    <section className="section">
      <div className="why">
        <div className="why-intro">
          <span className="pill pill-light">WHY OPT FOR ORALUXE</span>
          <h2>Care that respects your time and your nerves</h2>
          <p>We keep things simple: good dentistry, plainly explained.</p>
        </div>
        <ul className="why-list">
          {reasons.map((r) => (
            <li key={r.title}>
              <span className="tick-dot"><Icon d="M5 12l5 5 9-10" size={18} /></span>
              <div>
                <strong>{r.title}</strong>
                <small>{r.text}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const quotes = [
  { name: 'Amara O.', role: 'Patient since 2021', text: 'I had avoided the dentist for years. Here, everything was explained first and I never felt judged. I actually look forward to my check-ups now.' },
  { name: 'Daniel R.', role: 'Emergency visit', text: 'Cracked a tooth on a Sunday night, rang first thing Monday and was seen that afternoon. Calm, quick and kind.' },
  { name: 'Priya S.', role: 'Cosmetic treatment', text: 'My whitening results look natural, and the price was exactly what they quoted. I recommended them to my whole family.' },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce) return undefined
    const id = window.setInterval(() => setI((n) => (n + 1) % quotes.length), 6500)
    return () => window.clearInterval(id)
  }, [paused])

  const go = (n: number) => setI((n + quotes.length) % quotes.length)

  return (
    <section className="section section-tint">
      <div className="section-head">
        <span className="pill">PATIENT STORIES</span>
        <h2>Kind words from our patients</h2>
      </div>
      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <figure className="quote" key={i}>
          <blockquote>“{quotes[i].text}”</blockquote>
          <figcaption>
            <strong>{quotes[i].name}</strong>
            <span>{quotes[i].role}</span>
          </figcaption>
        </figure>
        <div className="carousel-ctrl">
          <button className="round" onClick={() => go(i - 1)} aria-label="Previous story">
            <Icon d="M15 5l-7 7 7 7" size={18} />
          </button>
          <div className="dots">
            {quotes.map((q, n) => (
              <button
                key={q.name}
                className={n === i ? 'dot on' : 'dot'}
                onClick={() => setI(n)}
                aria-label={`Show story ${n + 1}`}
                aria-current={n === i}
              />
            ))}
          </div>
          <button className="round" onClick={() => go(i + 1)} aria-label="Next story">
            <Icon d="M9 5l7 7-7 7" size={18} />
          </button>
        </div>
      </div>
      <p className="fine">Demo site: these patient stories are fictional.</p>
    </section>
  )
}

export function CtaBanner() {
  return (
    <section className="cta">
      <div>
        <h2>Ready for a healthier smile?</h2>
        <p>Tell us what you need and we will reply within one working day. Emergencies are seen first.</p>
      </div>
      <Link to="/book" className="btn btn-light btn-lg">Book an Appointment</Link>
    </section>
  )
}
