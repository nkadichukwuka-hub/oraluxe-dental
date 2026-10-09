import { Link } from 'react-router-dom'
import { CtaBanner } from '../components/HomeSections'
import { services } from '../data/services'

const details: Record<string, { includes: string[]; goodFor: string }> = {
  'Preventive Care': {
    includes: ['Full check-up and digital X-rays', 'Professional cleaning and polish', 'Gum health review', 'Personal home-care advice'],
    goodFor: 'Everyone. Twice a year keeps small problems small.',
  },
  'Cosmetic Dentistry': {
    includes: ['Professional teeth whitening', 'Porcelain veneers', 'Tooth-coloured bonding', 'Smile design consultation'],
    goodFor: 'Stained, chipped or uneven teeth, or a smile you hide in photos.',
  },
  'Restorative Care': {
    includes: ['Natural-looking fillings', 'Crowns and bridges', 'Root canal treatment', 'Dentures and repairs'],
    goodFor: 'Cavities, cracked or worn teeth, and teeth that hurt when you chew.',
  },
  'Dental Implants': {
    includes: ['3D scan and treatment plan', 'Single or multiple implants', 'Implant-supported bridges', 'Follow-up and maintenance'],
    goodFor: 'Missing teeth, or dentures that no longer feel secure.',
  },
  Orthodontics: {
    includes: ['Clear aligners', 'Traditional braces', 'Retainers', 'Treatment for teens and adults'],
    goodFor: 'Crowding, gaps and bite problems, at any age.',
  },
  'Emergency Care': {
    includes: ['Same-day appointments where possible', 'Pain relief and infection control', 'Knocked-out or broken teeth', 'Lost fillings and crowns'],
    goodFor: 'Sudden pain, swelling or injury. Call us first and we will fit you in.',
  },
}

const steps = [
  { n: '1', title: 'Tell us what you need', text: 'Send the booking form or call us. Emergencies are seen first.' },
  { n: '2', title: 'Meet your dentist', text: 'A relaxed first visit: a check-up, a conversation and a written plan with prices.' },
  { n: '3', title: 'Treat at your pace', text: 'We only start once you are happy with the plan, and we stop whenever you ask.' },
]

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export default function Services() {
  return (
    <>
      <header className="page-hero">
        <div className="page-hero-inner">
          <span className="pill">OUR SERVICES</span>
          <h1>Complete dental care, under one roof</h1>
          <p>
            From a routine clean to a full smile makeover, you will find everything you need
            here, explained clearly and priced before we begin.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="service-list">
          {services.map((s, i) => (
            <article className={i % 2 ? 'service-row flip' : 'service-row'} key={s.title}>
              <div className="service-badge">
                <img src={s.photo} alt={s.photoAlt} width="900" height="600" loading="lazy" />
                <span aria-hidden="true"><Icon d={s.icon} /></span>
              </div>
              <div>
                <h2>{s.title}</h2>
                <p className="lead">{s.text}</p>
                <ul className="ticks">
                  {details[s.title].includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="good-for"><strong>Good for:</strong> {details[s.title].goodFor}</p>
                <Link to="/book" className="btn btn-primary">Book this treatment</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="section-head">
          <span className="pill">YOUR FIRST VISIT</span>
          <h2>Simple from the very first step</h2>
        </div>
        <div className="cards steps">
          {steps.map((s) => (
            <article className="card" key={s.n}>
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
