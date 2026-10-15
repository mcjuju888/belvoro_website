import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import FaqAccordion, { type Faq } from './FaqAccordion'
import styles from './page.module.css'

/* ------------------------------------------------------------------
   FAQ CONTENT: edit the questions and answers here.
   Add, remove or reorder entries freely; the page and the Google
   structured data both update automatically.
   ------------------------------------------------------------------ */
const FAQS: Faq[] = [
  {
    question: 'Is Belvoro just a chatbot?',
    answer: "No. Belvoro is your AI-powered front desk. It doesn't just reply to messages. It helps handle your customer interactions from start to finish.",
    highlight: 'Calls. Messages. Leads. Bookings. Follow-ups. And more.',
  },
  {
    question: 'Is Belvoro difficult to set up?',
    answer: 'Not at all. Belvoro is built to be simple from day one. We help get everything connected and ready for your business.',
    highlight: 'No technical knowledge required.',
  },
  {
    question: 'What businesses is Belvoro built for?',
    answer: 'Any business that deals with customers, leads, or appointments can benefit from Belvoro.',
    highlight: 'If customers contact you, Belvoro works for you.',
  },
  {
    question: 'Can Belvoro speak different languages?',
    answer: 'Yes. Belvoro can communicate with customers across multiple languages automatically.',
    highlight: 'No translator. No delay. No lost lead.',
  },
  {
    question: 'Does Belvoro ever clock out?',
    answer: "No. Belvoro is there when your team can't. After hours. Weekends. Busy periods. Even while you sleep.",
    highlight: 'Your business stays available 24/7.',
  },
]

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist FAQ: Setup, Languages & 24/7 | Belvoro",
  description: "Common questions about Belvoro's AI front desk: how setup works, which businesses it suits, the languages it speaks and 24/7 availability.",
  path: '/faq',
})

// schema.org FAQPage so Google can show these questions in search results.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: `${f.answer} ${f.highlight}` },
  })),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <Navbar />
      <main>
        <section className={styles.section}>
          <div className={`container ${styles.inner}`}>
            <div className={styles.badge}>FAQ</div>
            <h1 className={styles.heading}>
              Frequently Asked <span className={styles.gradient}>Questions</span>
            </h1>
            <p className={styles.sub}>Everything you need to know about Belvoro.</p>

            <FaqAccordion faqs={FAQS} />
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
