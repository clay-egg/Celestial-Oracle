import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { AppShell } from '@/components/app-shell'
import './globals.css'

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
  title: 'Celestial Oracle - Fortune Teller',
  description: 'Unveil the mysteries of your destiny. Get personalized fortune readings based on your zodiac sign, birth details, and cosmic alignments.',
  generator: 'v0.app',
  openGraph: {
    title: 'Celestial Oracle - Fortune Teller',
    description: 'Unveil the mysteries of your destiny. Get personalized fortune readings based on your zodiac sign, birth details, and cosmic alignments.',
    siteName: 'Celestial Oracle',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celestial Oracle - Fortune Teller',
    description: 'Unveil the mysteries of your destiny. Get personalized fortune readings based on your zodiac sign, birth details, and cosmic alignments.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
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
