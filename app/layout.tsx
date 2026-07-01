import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
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
    'Free online PDF and image tools. Convert, compress, merge, split, and edit PDFs instantly in your browser. Fast, secure, and no signup required.',

  keywords: [
    'PDF tools',
    'free PDF tools',
    'image tools',
    'compress PDF online',
    'merge PDF',
    'split PDF',
    'PDF to image',
    'image to PDF',
    'online converter tools',
  ],

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: 'https://pdftoolbox.shop',
    siteName: 'PDFToolbox',
    title: 'PDFToolbox – Free PDF & Image Tools Online',
    description:
      'Convert, compress, merge and edit PDFs and images online for free. Fast and secure browser-based tools.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PDFToolbox - Free Online Tools',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PDFToolbox – Free PDF & Image Tools',
    description:
      'Free online tools to convert, compress and edit PDFs & images instantly.',
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
      <body className="bg-background font-sans antialiased">
        {children}

        {/* Vercel Analytics (production only) */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
