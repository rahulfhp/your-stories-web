import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const websiteBase = 'https://www.yourhourapp.com'
  const storiesBase = 'https://stories.yourhourapp.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/profile',
          '/bookmarked',
          '/write',
          '/api/',
        ],
      },
    ],
    sitemap: [
      `${websiteBase}/sitemap.xml`,
      `${storiesBase}/sitemap.xml`,
    ],
  }
}

