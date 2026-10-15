import type { Metadata } from 'next'
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
import JsonLd from '@/components/JsonLd'
import { SITE_URL, SITE_NAME, CONTACT_EMAIL, pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: "Belvoro AI | AI Receptionist & Front Desk for Business",
  description: "Belvoro is the AI receptionist that answers every call, text, DM and chat 24/7, books appointments on your calendar and follows up until leads convert.",
  path: '/',
})

// schema.org data so search engines know who Belvoro is and what it sells.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: CONTACT_EMAIL,
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Belvoro',
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Belvoro is an AI receptionist and front desk for businesses. It answers calls, texts, DMs, email and website chat 24/7, books appointments against your live calendar and follows up with leads.',
  image: `${SITE_URL}/og-image.jpg`,
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export default function Home() {
  return (
    <main>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />
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
