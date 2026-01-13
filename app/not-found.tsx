import Link from 'next/link'
import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper">
      <Logo />
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 text-center">
        <h1 
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4"
          style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
        >
          Page Not Found
        </h1>
        <p className="text-muted mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-foreground text-light font-sans text-sm tracking-wide uppercase hover:opacity-80 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
