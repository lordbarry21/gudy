import type { Metadata } from 'next'
import { Fraunces, Literata, Sora } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navigation } from '@/components/navigation/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'

// Fraunces - Quirky editorial serif for headings (Steve Jobs philosophy: type with soul)
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'], // Variable axes for optical sizing
})

// Literata - Designed specifically for long-form digital reading (Google Fonts)
// The voice of your content - comfortable for hours of study
const literata = Literata({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  axes: ['opsz', 'wght'], // opsz for optical sizing, wght for weight range
  style: ['normal', 'italic'],
})

// Sora - Modern geometric sans with distinctive character
// The voice of your UI - functional but not boring
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
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
    <html lang="en" suppressHydrationWarning>
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
      <body className={`${fraunces.variable} ${literata.variable} ${sora.variable} font-body antialiased bg-background text-text-primary min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation>{children}</Navigation>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
