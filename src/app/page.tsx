import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import StatsBar from '@/components/StatsBar'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Testimonial from '@/components/Testimonial'
import Industries from '@/components/Industries'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Testimonial />
      <Industries />
      <CTA />
      <Footer />
    </main>
  )
}
