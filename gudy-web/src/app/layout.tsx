import type { Metadata } from 'next'
import { Fraunces, Literata, Plus_Jakarta_Sans, Source_Serif_4 } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navigation } from '@/components/navigation/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'

// Fraunces - Quirky editorial serif with soul (Steve Jobs philosophy: type with personality)
// Perfect for headings that inspire confidence and make a statement
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

// Literata - Designed specifically for long-form digital reading
// The voice of your content - comfortable for hours of study
const literata = Literata({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  axes: ['opsz'], // Only opsz axis supported
  style: ['normal', 'italic'],
})

// Plus Jakarta Sans - Modern geometric sans with warmth
// Steve Jobs chose typefaces that feel human - this one feels friendly, approachable
// Indonesian students will feel at home with its clean but warm character
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// Source Serif 4 - Elegant serif for rich reading experiences
// For when you want a classic, sophisticated feel in body text
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Gudy - Study Tracker',
  description: 'Map Your Mastery. Master Your Goals.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${literata.variable} ${plusJakarta.variable} ${sourceSerif.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('gudy_theme');
                if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${fraunces.variable} ${literata.variable} ${plusJakarta.variable} ${sourceSerif.variable} font-sans antialiased bg-background text-text-primary min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation>{children}</Navigation>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
