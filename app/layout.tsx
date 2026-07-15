import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { AppShell } from '@/components/app-shell'
import Script from 'next/script'
import './globals.css'

const SITE_URL = 'https://celestial-oracle-three.vercel.app'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Celestial Oracle — Fortune Teller & Cosmic Readings',
    template: '%s | Celestial Oracle',
  },
  description:
    'Unveil the mysteries of your destiny with Celestial Oracle. Get free personalized fortune readings powered by your zodiac sign, birth numerology, lunar phase, and cosmic alignments.',
  keywords: [
    'fortune teller',
    'horoscope',
    'zodiac reading',
    'tarot reading',
    'astrology',
    'numerology',
    'personal reading',
    'celestial oracle',
    'free horoscope',
    'daily horoscope',
    'birth chart',
    'lunar phase',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': `${SITE_URL}/`,
      'th-TH': `${SITE_URL}/`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Celestial Oracle — Fortune Teller & Cosmic Readings',
    description:
      'Unveil the mysteries of your destiny. Get personalized fortune readings based on your zodiac sign, birth details, and cosmic alignments.',
    siteName: 'Celestial Oracle',
    url: SITE_URL,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Celestial Oracle — Fortune Teller & Cosmic Readings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celestial Oracle — Fortune Teller & Cosmic Readings',
    description:
      'Unveil the mysteries of your destiny. Get personalized fortune readings based on your zodiac sign, birth details, and cosmic alignments.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a12',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Celestial Oracle',
      description:
        'Free personalized fortune readings powered by astrology, numerology, tarot, and cosmic alignments.',
      inLanguage: ['en-US', 'th-TH'],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Celestial Oracle',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
      <head>
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <AppShell>
            {children}
          </AppShell>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
