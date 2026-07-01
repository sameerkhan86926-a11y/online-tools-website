import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://pdftoolbox.shop/sitemap.xml',
    host: 'https://pdftoolbox.shop',
  }
}
