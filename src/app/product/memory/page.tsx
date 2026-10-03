import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ProductIntro, { type ProductFeature } from '@/components/product/ProductIntro'
import WhyItMatters from '@/components/product/WhyItMatters'
import MemoryMoreSections from './MemoryMoreSections'

export const metadata: Metadata = {
  title: 'Memory & Context | Belvoro AI',
  description: 'Belvoro keeps track of every conversation, appointment, preference, and interaction, so your team and AI assistant always have the full context.',
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const FEATURES: ProductFeature[] = [
  {
    title: 'Complete History',
    text: 'Every call, message, appointment and team interaction in one place.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.8" />
        <path d="M4.5 20.5c.8-3.9 3.8-6.2 7.5-6.2s6.7 2.3 7.5 6.2" />
      </svg>
    ),
  },
  {
    title: 'Steer the AI',
    text: 'Give the AI instructions, context or tasks for any specific customer.',
    icon: (
      <svg {...iconProps}>
        <path d="M13.5 2.5 4.5 13.5H12l-1.5 8 9-11H12l1.5-8Z" />
      </svg>
    ),
  },
  {
    title: 'Notes & Tasks',
    text: 'Add notes, set tasks and keep important details visible to your team.',
    icon: (
      <svg {...iconProps}>
        <path d="M14 3.5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V12" />
        <path d="M7.5 8.5h5M7.5 12h3.5M7.5 15.5h4" />
        <path d="M17.6 3.4a1.6 1.6 0 0 1 2.3 2.3l-6.2 6.2-3 .8.8-3 6.1-6.3Z" />
      </svg>
    ),
  },
  {
    title: 'Merged Contacts',
    text: 'Automatically combine duplicate contacts from different channels.',
    icon: (
      <svg {...iconProps}>
        <path d="M10 13.5a4.2 4.2 0 0 0 6 .4l3-3a4.2 4.2 0 0 0-6-6l-1.7 1.7" />
        <path d="M14 10.5a4.2 4.2 0 0 0-6-.4l-3 3a4.2 4.2 0 0 0 6 6l1.7-1.7" />
      </svg>
    ),
  },
  {
    title: 'Customer Journey',
    text: "See every interaction, appointment, message, update, and action across the customer's full history.",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    title: 'Team Activity',
    text: 'Track which team members interacted and where the conversation left off.',
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8.5" r="3.2" />
        <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
        <circle cx="16.8" cy="9.3" r="2.5" />
        <path d="M16.5 14.4c2.4.1 4.1 1.7 4.5 4.3" />
      </svg>
    ),
  },
]

const WHY: ProductFeature[] = [
  {
    title: 'Know every customer',
    text: 'See the full picture without searching across different places.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.8" />
        <path d="M4.5 20.5c.8-3.9 3.8-6.2 7.5-6.2s6.7 2.3 7.5 6.2" />
      </svg>
    ),
  },
  {
    title: 'Stay in the loop',
    text: 'Know what happened, who handled it, and what comes next.',
    icon: (
      <svg {...iconProps}>
        <path d="M19.5 12a7.5 7.5 0 0 1-13 5.1" />
        <path d="M4.5 12a7.5 7.5 0 0 1 13-5.1" />
        <path d="M17.8 3.5v3.6h-3.6M6.2 20.5v-3.6h3.6" />
      </svg>
    ),
  },
  {
    title: 'Personalize every interaction',
    text: 'Give your team and AI the context to make every conversation feel informed.',
    icon: (
      <svg {...iconProps}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
      </svg>
    ),
  },
  {
    title: 'Market smarter',
    text: 'Use customer history and activity to reach the right people with the right message.',
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 17 9.5 11l4 4 7-7.5" />
        <path d="M15 7.5h5.5V13" />
      </svg>
    ),
  },
]

export default function MemoryPage() {
  // Drop public/customer-profile.png in and it appears in the screenshot card automatically.
  const hasProfileImage = existsSync(path.join(process.cwd(), 'public', 'customer-profile.png'))

  return (
    <>
      <Navbar />
      <main>
        <ProductIntro
          theme="beige"
          badge="Memory & Context"
          title={['Every customer,', 'remembered.']}
          subtitle={[
            'Belvoro keeps track of every conversation, appointment,',
            'preference, and interaction, so your team and AI assistant',
            'always have the full context and never have to start from scratch.',
          ]}
          character={{ src: '/characters/memory-hero.png', width: 1099, height: 1278, alt: 'Beige Belvoro character holding a clipboard' }}
          featuresTitle={['One complete', 'profile per customer.']}
          featuresText="Belvoro automatically merges every interaction from every channel into a single, clean customer profile, giving your team and AI assistant the full history, context, and next best action at a glance."
          features={FEATURES}
        />
        <MemoryMoreSections hasProfileImage={hasProfileImage} />
        <WhyItMatters
          theme="beige"
          subtitle="More leads, happier customers, and a front desk that never sleeps."
          cards={WHY}
        />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
