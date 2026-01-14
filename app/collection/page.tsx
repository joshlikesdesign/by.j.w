import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { products } from './data'

export default function Collection() {
  return (
    <main className="min-h-screen pt-24">
      <Logo />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24">
        {/* Page header */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-32">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4">
            Collection
          </h1>
          <p className="text-muted text-base sm:text-lg font-light max-w-2xl">
            Each piece is unique, made by hand in our London studio.
          </p>
        </div>

        {/* Vertical gallery layout */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-40">
          {products.map((product, index) => (
            <Link 
              key={product.id}
              href={`/collection/${product.id}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                {/* Image */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative w-full aspect-[3/4] bg-paper overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.imageAlt || product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      quality={75}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
                
                {/* Text content */}
                <div className={`flex-1 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                      {product.name}
                    </h2>
                    <p className="text-muted font-light text-lg leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <span className="font-sans text-xl text-foreground">
                        £{product.price}
                      </span>
                      <span className="text-sm text-muted uppercase tracking-wide">
                        One of a kind
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Archive Navigation */}
      <section className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 z-20 bg-paper border-t border-foreground/10 mt-16 sm:mt-24">
        <div className="max-w-[1280px] mx-auto">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 hover:opacity-60 transition-opacity"
          >
            <span className="font-sans text-xs sm:text-[13px] font-normal tracking-[1.04px] uppercase text-foreground">
              VIEW ARCHIVE OF WORKS
            </span>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="#2B2621" strokeWidth="1.5"/>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

