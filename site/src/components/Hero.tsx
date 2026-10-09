import { Link } from 'react-router-dom'

const perks = [
  { title: 'Experienced Dentists', text: 'Highly skilled & certified', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 21c0-4 3-7 7-7s7 3 7 7' },
  { title: 'Advanced Technology', text: 'Modern equipment, better care', icon: 'M4 5h16v11H4zM8 20h8M12 16v4' },
  { title: 'Comfortable Environment', text: 'Relaxed & friendly clinic', icon: 'M12 21s-7-4.500-7-10a4 4 0 017-2.600A4 4 0 0119 11c0 5.500-7 10-7 10z' },
  { title: 'Affordable Care', text: 'Quality care for everyone', icon: 'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6zM9 12l2 2 4-4' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <img src="/images/hero.jpg" alt="" width="1600" height="1067" fetchPriority="high" />
        <span className="hero-tint" />
      </div>

      <div className="hero-inner">
        <div className="hero-card">
          <span className="pill">MODERN · GENTLE · PERSONAL</span>
          <h1>
            A healthier smile
            <br />
            <span>starts here.</span>
          </h1>
          <p>
            From your first check-up to a complete smile makeover, our team takes the time to
            listen, explain and care for you without the rush.
          </p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary btn-lg">
              Book an Appointment <Arrow />
            </Link>
            <a href="tel:+15551234567" className="btn btn-outline btn-lg">
              <PhoneIcon /> Call: (555) 123-4567
            </a>
          </div>
        </div>
      </div>

      <ul className="perks">
        {perks.map((p) => (
          <li key={p.title}>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={p.icon} />
            </svg>
            <div>
              <strong>{p.title}</strong>
              <small>{p.text}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  )
}
