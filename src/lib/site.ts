import type { Metadata } from 'next'

// The one official address of the site. Canonical URLs, the sitemap and
// social share links are all built from this.
export const SITE_URL = 'https://www.belvoroai.com'
export const SITE_NAME = 'Belvoro AI'
export const CONTACT_EMAIL = 'info@belvoroai.com'

// 1200x630 image shown when a link to the site is shared.
const SHARE_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Belvoro AI: Your front desk, on autopilot.',
}

/**
 * Title, description, canonical URL and social share tags for one page.
 * `path` is the page's address, e.g. '/pricing' ('/' for the homepage).
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
    },
  }
}
