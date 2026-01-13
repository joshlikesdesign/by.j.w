'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-paper">
      <Logo />
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 text-center">
        <h1 
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4"
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          Something went wrong
        </h1>
        <p className="text-muted mb-8 max-w-md">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-foreground text-light font-sans text-sm tracking-wide uppercase hover:opacity-80 transition-opacity"
          >
            Try again
          </button>
          <Link 
            href="/"
            className="px-6 py-3 border border-foreground/20 text-foreground font-sans text-sm tracking-wide uppercase hover:opacity-60 transition-opacity"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
