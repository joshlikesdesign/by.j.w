import type { Metadata } from 'next'
import { Inter, Fraunces, Unbounded } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
})

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Studio Pottery',
  description: 'Ceramics made by hand in London',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${fraunces.variable} ${unbounded.variable} font-sans antialiased`}>
        {/* SVG filter for film grain */}
        <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="linearRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" />
            </filter>
          </defs>
        </svg>
        {/* Animated grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  )
}

