import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl text-earth mb-4" style={{ fontFamily: 'var(--font-archivo-black)', letterSpacing: '-0.02em' }}>
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

