import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ProductIntro, { type ProductFeature } from '@/components/product/ProductIntro'
import WhyItMatters from '@/components/product/WhyItMatters'
import MarketingMoreSections from './MarketingMoreSections'

export const metadata: Metadata = {
  title: 'Outbound Marketing | Belvoro AI',
  description: 'Follow up automatically, re-engage past customers, run targeted outreach, get more Google reviews and create marketing content, all from the system that already knows your customers.',
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
    title: 'Manual Outreach',
    text: 'Send SMS and email campaigns to everyone, a filtered segment, or specific contacts.',
    icon: (
      <svg {...iconProps}>
        <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
        <path d="m10 13 4.5-4.5" />
      </svg>
    ),
  },
  {
    title: 'AI Target Outreach',
    text: 'Find the right audience from your customer data and create personalized campaigns automatically.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Marketing Studio',
    text: 'Create and edit photos, generate short videos, write captions, hashtags, text overlays, and publish directly to socials.',
    icon: (
      <svg {...iconProps}>
        <path d="m4 20 11.5-11.5" />
        <path d="m13.5 6.5 4 4" />
        <path d="M18 3v3M16.5 4.5h3M20.5 8.5v2M19.5 9.5h2M10 3.5v1.6M9.2 4.3h1.6" />
      </svg>
    ),
  },
  {
    title: 'Google Review Booster',
    text: 'Automatically ask customers for a Google review after a completed appointment.',
    icon: (
      <svg {...iconProps}>
        <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
      </svg>
    ),
  },
  {
    title: 'Automated Review Response',
    text: 'Draft and publish professional replies to new Google reviews instantly.',
    icon: (
      <svg {...iconProps}>
        <path d="M14.5 5.5 20 11l-5.5 5.5" />
        <path d="M20 11h-8.5A7.5 7.5 0 0 0 4 18.5V20" />
      </svg>
    ),
  },
  {
    title: 'Win Back Past Customers',
    text: 'Automatically re-engage old leads and past customers who went quiet.',
    icon: (
      <svg {...iconProps}>
        <path d="M19.5 12a7.5 7.5 0 0 1-13 5.1" />
        <path d="M4.5 12a7.5 7.5 0 0 1 13-5.1" />
        <path d="M17.8 3.5v3.6h-3.6M6.2 20.5v-3.6h3.6" />
      </svg>
    ),
  },
]

const WHY: ProductFeature[] = [
  {
    title: 'Bring customers back',
    text: 'Re-engage past customers with targeted campaigns based on their history.',
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8.5" r="3.2" />
        <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
        <circle cx="16.8" cy="9.3" r="2.5" />
        <path d="M16.5 14.4c2.4.1 4.1 1.7 4.5 4.3" />
      </svg>
    ),
  },
  {
    title: 'Fill your schedule',
    text: 'Drive more appointments with timely offers and reminders.',
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 17 9.5 11l4 4 7-7.5" />
        <path d="M15 7.5h5.5V13" />
      </svg>
    ),
  },
  {
    title: 'Build a stronger reputation',
    text: 'Get more 5-star reviews and automatically respond to new ones.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.5 2.9C19.5 15.4 12 20 12 20Z" />
      </svg>
    ),
  },
  {
    title: 'Grow your revenue',
    text: 'Keep your business top of mind and turn more customers into repeat business.',
    icon: (
      <svg {...iconProps}>
        <path d="M5 20V13M10 20V9M15 20V11M20 20V5" strokeWidth="2.4" />
      </svg>
    ),
  },
]

/**
 * Finds public/marketing/<name> with any common image extension, so a file can
 * simply be dropped in later. Returns null (placeholder shown) if it's missing.
 */
function marketingImage(name: string): string | null {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    if (existsSync(path.join(process.cwd(), 'public', 'marketing', `${name}.${ext}`))) {
      return `/marketing/${name}.${ext}`
    }
  }
  return null
}

export default function MarketingPage() {
  const images = {
    winterTire: marketingImage('winter-tire'),
    studio: marketingImage('new-arrivals'),
  }

  return (
    <>
      <Navbar />
      <main>
        <ProductIntro
          theme="sage"
          badge="Outbound Marketing"
          title={['Turn customer data', 'into growth.']}
          subtitle={[
            'Belvoro helps you automatically follow up, re-engage past customers,',
            'run targeted outreach campaigns, and create high-quality marketing',
            'content, all from the same system that already knows your customers.',
          ]}
          character={{ src: '/characters/marketing-hero.png', width: 1088, height: 1165, alt: 'Sage green Belvoro character holding a megaphone' }}
          featuresTitle={['Every campaign,', 'built on real customer data.']}
          featuresText="Reach the right people with the right message, get more Google reviews, and create content for your socials, all from the system that already knows your customers."
          features={FEATURES}
        />
        <MarketingMoreSections images={images} />
        <WhyItMatters
          theme="sage"
          subtitle="More leads, happier customers, and a front desk that never sleeps."
          cards={WHY}
        />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
