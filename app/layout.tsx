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
        {/* Animated grain overlay — texture is baked into the CSS background-image itself */}
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  )
}

