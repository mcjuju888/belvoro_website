import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Every public page. Add new pages here so search engines find them.
const PAGES = [
  '/',
  '/product/channels',
  '/product/memory',
  '/product/marketing',
  '/pricing',
  '/faq',
  '/watch-demo',
  '/proposal',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PAGES.map((page) => ({
    url: page === '/' ? SITE_URL : `${SITE_URL}${page}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: page === '/' ? 1 : 0.8,
  }))
}
