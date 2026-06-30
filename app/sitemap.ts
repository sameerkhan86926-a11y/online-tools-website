import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolboxar-project.vercel.app'

  const pages = [
    '',
    '/tools/image-to-pdf',
    '/tools/pdf-to-image',
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/compress-pdf',
    '/tools/jpg-to-png',
    '/tools/png-to-jpg',
    '/tools/image-compressor',
    '/tools/image-resizer',
    '/tools/qr-code-generator',
  ]

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === '' ? 1 : 0.8,
  }))
}
