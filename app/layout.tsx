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
    'Free online PDF and image tools. Convert, compress, merge, split, edit PDFs and optimize images securely in your browser. No signup required.',

  keywords: [
    'PDF tools',
    'Image tools',
    'Compress PDF',
    'Merge PDF',
    'Split PDF',
    'PDF to Image',
    'Image to PDF',
    'JPG to PNG',
    'PNG to JPG',
    'Online PDF converter',
    'Free PDF tools',
  ],

  verification: {
    google: 'BC0Gha8LWi95jKahYLbCvNSabSKM1miCB67wpdkyuCM',
  },

  alternates: {
    canonical: '/',
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
      'Convert, compress, merge and edit PDFs & images online.',
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
    {
      media: '(prefers-color-scheme: light)',
      color: 'white',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: 'black',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
