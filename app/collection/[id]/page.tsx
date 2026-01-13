import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import ProductImageGallery from '@/components/ProductImageGallery'
import { notFound } from 'next/navigation'
import { products as allProducts } from '../data'

// Convert array to record for easy lookup
const products: Record<string, typeof allProducts[0]> = {}
allProducts.forEach(product => {
  products[product.id] = product
})

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products[id]

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-paper">
      <Logo />
      
      <div className="pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        {/* Back link */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 mb-8 sm:mb-12">
          <Link 
            href="/collection"
            className="text-muted hover:text-foreground transition-colors text-[10px] sm:text-[11px] font-sans tracking-[0.88px] uppercase inline-flex items-center gap-2 sm:gap-3"
          >
            <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK TO COLLECTION
          </Link>
        </div>

        {/* Main content section */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16">
          {/* Image gallery section */}
          <div className="mb-16">
            <ProductImageGallery
              mainImage={product.image}
              thumbnails={product.image2 ? [product.image2] : []}
              alt={product.name}
              mainImageAlt={product.imageAlt}
              thumbnailAlts={product.image2Alt ? [product.image2Alt] : []}
            />
          </div>

          {/* Product information section */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mb-12 sm:mb-16">
            {/* Left column - Product title and description */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-muted text-[10px] sm:text-[11px] font-sans tracking-[1.1px] uppercase">
                {product.category}
              </p>
              <h1 
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-tight text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {product.name}
              </h1>
              <p className="text-foreground text-sm sm:text-base font-light leading-relaxed max-w-[496px]">
                {product.details}
              </p>
            </div>

            {/* Right column - Product details */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12 pt-0 md:pt-32">
              <div className="space-y-2">
                <p className="text-muted text-[11px] font-sans tracking-[1.1px] uppercase">
                  Material
                </p>
                <p className="text-foreground text-sm font-light">
                  {product.material}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-muted text-[11px] font-sans tracking-[1.1px] uppercase">
                  Process
                </p>
                <p className="text-foreground text-sm font-light">
                  {product.process}
                </p>
              </div>
              <div className="pt-8 border-t border-foreground/10">
                <p className="text-muted text-[13px] font-light italic">
                  This is a one-of-a-kind object and cannot be reproduced.
                </p>
              </div>
            </div>
          </div>

          {/* Price and purchase section */}
          <div className="border-t border-foreground/10 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 space-y-6 sm:space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 md:gap-8">
              <span 
                className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight text-foreground"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                £{product.price}
              </span>
              <a 
                href={`mailto:joshwilburne@gmail.com?subject=Inquiry about ${product.name}`}
                className="inline-block w-full md:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-foreground text-light font-sans text-xs sm:text-[13px] tracking-[1.04px] uppercase hover:opacity-80 transition-opacity duration-300 text-center md:ml-auto"
              >
                CONTACT FOR PURCHASE
              </a>
            </div>
            <p className="text-muted text-xs sm:text-[13px] font-light">
              All pieces are carefully packed and shipped within 3–5 business days. For international shipping or collection in person, please contact us directly.
            </p>
          </div>
        </div>

        {/* Related Products Section */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 mt-16 sm:mt-24 md:mt-32">
            <h2 
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight text-foreground tracking-tight mb-8 sm:mb-12"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {product.relatedProducts.map((relatedId) => {
                const relatedProduct = products[relatedId]
                if (!relatedProduct) return null
                return (
                  <Link
                    key={relatedId}
                    href={`/collection/${relatedId}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] bg-stone-200 overflow-hidden mb-4">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.imageAlt || relatedProduct.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        quality={75}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2 group-hover:opacity-60 transition-opacity">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-muted text-sm font-light mb-2">
                      {relatedProduct.description}
                    </p>
                    <p className="font-serif text-lg sm:text-xl text-foreground">
                      £{relatedProduct.price}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Final statement section */}
        <div className="max-w-[768px] mx-auto px-4 sm:px-8 md:px-16 mt-16 sm:mt-24 md:mt-32">
          <p 
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[48px] leading-tight text-foreground tracking-tight"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            Made for everyday moments, not display. These pieces are meant to be part of your routines. Dishwasher and microwave safe.
          </p>
        </div>
      </div>
    </main>
  )
}

