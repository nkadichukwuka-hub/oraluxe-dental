import { CtaBanner } from '../components/HomeSections'

const stats = [
  { n: '15+', label: 'Years in practice' },
  { n: '12,000', label: 'Patients cared for' },
  { n: '4.9/5', label: 'Average patient rating' },
  { n: '< 1 day', label: 'Typical reply time' },
]

const values = [
  { title: 'Explain first', text: 'You will always know what we see, what it means and what your options cost before anything starts.', icon: 'M4 5h16v11H9l-5 4zM8 10h8' },
  { title: 'Gentle by default', text: 'Modern tools, numbing done properly and breaks whenever you want one.', icon: 'M12 21s-7-4.500-7-10a4 4 0 017-2.600A4 4 0 0119 11c0 5.500-7 10-7 10z' },
  { title: 'Prevention over repair', text: 'The best treatment is the one you never need, so we put effort into keeping teeth healthy.', icon: 'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6zM9 12l2 2 4-4' },
  { title: 'Fair and transparent', text: 'Written treatment plans and upfront pricing. No pressure and no surprise bills.', icon: 'M5 12l5 5 9-10' },
]

const team = [
  { name: 'Dr. Adaeze Okafor', role: 'Principal Dentist', note: 'General and cosmetic dentistry', photo: 'team-adaeze.jpg' },
  { name: 'Dr. Samuel Reyes', role: 'Implant and Restorative', note: 'Implants, crowns and bridges', photo: 'team-samuel.jpg' },
  { name: 'Dr. Meera Patel', role: 'Orthodontist', note: 'Braces and clear aligners', photo: 'team-meera.jpg' },
  { name: 'Grace Bennett', role: 'Lead Hygienist', note: 'Cleanings and gum health', photo: 'team-grace.jpg' },
]

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <header className="page-hero">
        <div className="page-hero-inner">
          <span className="pill">ABOUT US</span>
          <h1>A calmer kind of dental clinic</h1>
          <p>
            Oraluxe started with a simple idea: people look after their teeth better when the
            dentist is somewhere they feel respected.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="about-grid">
          <div>
            <h2>Our story</h2>
            <p className="lead">
              For over fifteen years our team has treated families, nervous first-timers and
              people who had not seen a dentist in a decade. Along the way we learned what
              matters most: time, clear answers and no judgement.
            </p>
            <p className="lead">
              Today Oraluxe combines modern technology with an old-fashioned approach to
              listening. Every plan is written down, every price is agreed first, and every
              patient leaves knowing what happens next.
            </p>
          </div>
          <div className="photo-grid">
          <img className="ph ph-a" src="/images/about-dentist.jpg" alt="A dentist examining a patient under bright clinic lights" width="1200" height="800" loading="lazy" />
          <img className="ph ph-b" src="/images/about-clinic.jpg" alt="A bright treatment room with a dental chair" width="1200" height="1745" loading="lazy" />
          <img className="ph ph-c" src="/images/about-smile.jpg" alt="A close-up of a confident smile" width="1200" height="712" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="stats-band">
        <ul>
          {stats.map((s) => (
            <li key={s.label}>
              <strong>{s.n}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="pill">WHAT WE STAND FOR</span>
          <h2>Four promises we keep</h2>
        </div>
        <div className="cards cards-4">
          {values.map((v) => (
            <article className="card" key={v.title}>
              <span className="card-icon"><Icon d={v.icon} /></span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="section-head">
          <span className="pill">MEET THE TEAM</span>
          <h2>The people looking after your smile</h2>
        </div>
        <div className="cards cards-4">
          {team.map((t) => (
            <article className="card team-card" key={t.name}>
              <img className="avatar" src={`/images/${t.photo}`} alt={`Portrait of ${t.name}`} width="320" height="320" loading="lazy" />
              <h3>{t.name}</h3>
              <strong>{t.role}</strong>
              <p>{t.note}</p>
            </article>
          ))}
        </div>
        <p className="fine">Demo site: team members are fictional and shown with stock photos.</p>
      </section>

      <CtaBanner />
    </>
  )
}
