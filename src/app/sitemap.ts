import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const websiteBase = 'https://www.yourhourapp.com'
  const storiesBase = 'https://stories.yourhourapp.com'

  return [
    // yourhourapp Website pages
    { url: `${websiteBase}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${websiteBase}/blogs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${websiteBase}/faqs`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${websiteBase}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },

    // Stories web app pages
    { url: `${storiesBase}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${storiesBase}/search`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${storiesBase}/write`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${storiesBase}/bookmarked`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${storiesBase}/profile`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ]
};