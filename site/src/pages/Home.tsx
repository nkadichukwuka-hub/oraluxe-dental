import Hero from '../components/Hero'
import { AboutPreview, ServiceCards, WhyChoose, Testimonials, CtaBanner } from '../components/HomeSections'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServiceCards />
      <WhyChoose />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
