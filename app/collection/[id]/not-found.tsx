import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-earth mb-4">
          Product Not Found
        </h1>
        <p className="text-stone-600 mb-8">
          This piece is no longer available.
        </p>
        <Link 
          href="/collection"
          className="text-stone-600 hover:text-earth transition-colors underline"
        >
          Return to Collection
        </Link>
      </div>
    </main>
  )
}

