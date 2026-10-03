import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import PricingFAQ from '@/components/PricingFAQ'
import ConsultationBanner from '@/components/ConsultationBanner'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Pricing | Belvoro AI',
  description: 'Simple, transparent pricing for Belvoro, the AI front desk. Every plan includes setup, training and ongoing optimization.',
}

interface Plan {
  name: string
  description: string
  featured?: boolean
}

// Cards currently show only the plan name and a short description.
const PLANS: Plan[] = [
  {
    name: 'Essential',
    description: 'The core AI front desk, customer records, and fully managed system to capture, answer, and book on every channel.',
  },
  {
    name: 'Growth',
    description: 'Unlocks expanded communication channels, automated review responses, and personalized AI-powered outreach.',
    featured: true,
  },
  {
    name: 'Complete',
    description: 'Unlocks advanced marketing creation, team member dashboards, department organization, and full staff oversight.',
  },
]

/*
  REMOVED FOR NOW: prices, feature lists, the Get Started buttons on the cards,
  and the line under the cards. Kept here so they can be restored.

  Line under the cards: "All plans include setup, training on your business, and ongoing optimization."
  Card button: "Get Started" linking to /get-started (dark on Growth, white on the others)

  const PLAN_DETAILS = [
    {
      name: 'Essential',
      description: 'The core AI front desk, customer records, and a fully managed system to capture, answer, and book.',
      price: '$150',
      features: [
        '24/7 AI answering for calls, SMS and website chat',
        'Appointment booking against your live calendar',
        'Confirmations and reminders',
        'Complete customer profile and history',
        'Human handoff with full context',
        'Fully managed setup, no technical work',
      ],
    },
    {
      name: 'Growth',
      description: 'Unlocks expanded communication channels, automated review responses, and personalized AI-powered outreach.',
      price: '$___', // TODO: set the Growth price
      featured: true,
      features: [
        'Everything in Essential, plus:',
        'Instagram, Facebook, WhatsApp and email',
        'One connected inbox for your team',
        'Automatic Google review requests',
        'AI drafted responses to Google reviews',
        'Follow-up sequences and past customer reactivation',
        'Lead scoring and hot-lead alerts',
      ],
    },
    {
      name: 'Complete',
      description: 'Unlocks advanced marketing creation, team member dashboards, department organization, and full staff oversight.',
      price: '$___', // TODO: set the Complete price
      features: [
        'Everything in Growth, plus:',
        'Photo enhancement, short-form video and captions',
        'Publish directly to your social channels',
        'Team member dashboards',
        'Departments and conversation assignment',
        'See who handled every interaction',
        'Monthly revenue recovered report',
      ],
    },
  ]
*/

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.top}>
          <div className={`container ${styles.inner}`}>
            <header className={styles.header}>
              <span className={styles.badge}>Pricing</span>
              <h1 className={styles.heading}>
                Simple, Transparent
                <br />
                <span className={styles.gradient}>Pricing</span>
              </h1>
              <p className={styles.sub}>Choose the plan that&apos;s right for your business.</p>
            </header>

            {/* Banner kept empty for now (was: "Starting at $150 / month"). */}
            <div className={styles.banner} />

            <div className={styles.plans}>
              {PLANS.map((plan) => (
                <article
                  key={plan.name}
                  className={`${styles.plan} ${plan.featured ? styles.featured : ''}`}
                >
                  {plan.featured && <span className={styles.popular}>Most popular</span>}
                  <h2 className={styles.planName}>{plan.name}</h2>
                  <p className={styles.planDesc}>{plan.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PricingFAQ />
        <ConsultationBanner />
      </main>
      <Footer />
    </>
  )
}
