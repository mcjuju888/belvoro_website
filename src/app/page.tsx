import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ThreeJobs from '@/components/ThreeJobs'
import LiveDemo from '@/components/LiveDemo'
import FeatureScroll from '@/components/FeatureScroll'
import HowItWorks from '@/components/HowItWorks'
import RevenueCalculator from '@/components/RevenueCalculator'
import Testimonial from '@/components/Testimonial'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ThreeJobs />
      <LiveDemo />
      <FeatureScroll />
      <RevenueCalculator />
      <HowItWorks />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  )
}
