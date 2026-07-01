import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CookieBanner } from "@/components/cookie-banner"
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pdftoolbox.shop'),

  title: {
    default: 'PDFToolbox – Free PDF & Image Tools Online',
    template: '%s | PDFToolbox',
  },

  description:
    'Free online PDF and image tools to compress, merge, split, convert and edit files instantly. Fast, secure, and no signup required.',

  keywords: [
    'PDF tools',
    'free PDF tools',
    'compress PDF online',
    'merge PDF',
    'split PDF',
    'image to PDF',
    'PDF converter online',
  ],

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    url: 'https://pdftoolbox.shop',
    siteName: 'PDFToolbox',
    title: 'PDFToolbox – Free PDF & Image Tools Online',
    description:
      'Convert, compress, merge and edit PDFs and images online for free.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PDFToolbox',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PDFToolbox – Free PDF & Image Tools',
    description:
      'Free online tools to convert and compress PDFs & images.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },

  generator: 'Next.js',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>

        {/* 🔥 SEO SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PDFToolbox",
              url: "https://pdftoolbox.shop",
              description:
                "Free online PDF and image tools to compress, merge, split and convert files instantly.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pdftoolbox.shop/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* 🔥 Basic SEO safety */}
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="PDFToolbox" />
      </head>

      <body className="bg-background font-sans antialiased">
        
        {children}

        {/* Analytics */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <CookieBanner />
      </body>
    </html>
  )
}
