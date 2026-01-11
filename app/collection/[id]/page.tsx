import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'
import ProductImageGallery from '@/components/ProductImageGallery'
import { notFound } from 'next/navigation'

// Mock product data - replace with real data later
const products: Record<string, {
  id: string
  name: string
  category: string
  price: number
  image: string
  image2: string
  image3?: string
  description: string
  details: string
  dimensions: string
  material: string
  process: string
}> = {
  '1': {
    id: '1',
    name: 'Thrown Bowl',
    category: 'Bowl',
    price: 85,
    image: '/images/DSC05728.JPG',
    image2: '/images/DSC05727.JPG',
    description: 'Stoneware bowl, hand-thrown',
    details: 'This bowl was thrown on the wheel using a stoneware clay body. The interior features a subtle celadon glaze, while the exterior remains unglazed to showcase the natural clay texture. Each piece is unique, with slight variations in form and glaze application.',
    dimensions: '12cm × 8cm',
    material: 'Stoneware',
    process: 'Hand-thrown',
  },
  '2': {
    id: '2',
    name: 'Celadon Vase',
    category: 'Vase',
    price: 120,
    image: '/images/L1008237.JPG',
    image2: '/images/L1008235.JPG',
    image3: '/images/L1008237.JPG',
    description: 'Glazed celadon, one-of-a-kind',
    details: 'A tall, elegant vase with a celadon glaze that shifts from pale green to blue depending on the light. The form is thrown and then altered, creating a subtle asymmetry that gives each piece its character.',
    dimensions: '28cm × 12cm',
    material: 'Stoneware',
    process: 'Hand-thrown',
  },
  '3': {
    id: '3',
    name: 'Moss Glazed Plate',
    category: 'Plate',
    price: 65,
    image: '/images/L1008209.JPG',
    image2: '/images/L1008208.JPG',
    image3: '/images/L1008209.JPG',
    description: 'Dinner plate with moss glaze',
    details: 'A functional dinner plate with a rich moss green glaze. The rim is left unglazed, revealing the warm stoneware clay beneath. Perfect for everyday use.',
    dimensions: '26cm diameter',
    material: 'Stoneware',
    process: 'Hand-thrown',
  },
  '4': {
    id: '4',
    name: 'Tall Cylinder',
    category: 'Vessel',
    price: 150,
    image: '/images/IMG_6297.jpeg',
    image2: '/images/IMG_6292.jpeg',
    image3: '/images/IMG_6297.jpeg',
    description: 'Tall stoneware vessel',
    details: 'A tall, cylindrical vessel with a matte earth-toned glaze. The form is simple and confident, designed to hold flowers or stand alone as a sculptural object.',
    dimensions: '35cm × 14cm',
    material: 'Stoneware',
    process: 'Hand-thrown',
  },
  '5': {
    id: '5',
    name: 'Shallow Dish',
    category: 'Dish',
    price: 55,
    image: '/images/DSC05710_2.JPG',
    image2: '/images/DSC05710.JPG',
    image3: '/images/DSC05710_2.JPG',
    description: 'Hand-built shallow dish',
    details: 'A hand-built shallow dish with a subtle texture from the forming process. The interior is glazed in a warm, paper-like tone, while the exterior shows the natural clay.',
    dimensions: '20cm × 4cm',
    material: 'Stoneware',
    process: 'Hand-built',
  },
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products[id]

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      <Logo />
      
      <div className="pt-32 pb-32">
        {/* Back link */}
        <div className="max-w-[1280px] mx-auto px-8 md:px-16 mb-12">
          <Link 
            href="/collection"
            className="text-muted hover:text-foreground transition-colors text-[11px] font-sans tracking-[0.88px] uppercase inline-flex items-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK TO COLLECTION
          </Link>
        </div>

        {/* Main content section */}
        <div className="max-w-[1280px] mx-auto px-8 md:px-16">
          {/* Image gallery section */}
          <div className="mb-16">
            <ProductImageGallery
              mainImage={product.image}
              thumbnails={[product.image2, product.image3].filter((img): img is string => !!img)}
              alt={product.name}
            />
          </div>

          {/* Product information section */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            {/* Left column - Product title and description */}
            <div className="space-y-6">
              <p className="text-muted text-[11px] font-sans tracking-[1.1px] uppercase">
                {product.category}
              </p>
              <h1 
                className="font-serif text-[72px] leading-[79.2px] text-foreground tracking-[-1.44px]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                {product.name}
              </h1>
              <p className="text-foreground text-base font-light leading-[28.8px] max-w-[496px]">
                {product.details}
              </p>
            </div>

            {/* Right column - Product details */}
            <div className="space-y-12 pt-32">
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
                  Dimensions
                </p>
                <p className="text-foreground text-sm font-light">
                  {product.dimensions}
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
          <div className="border-t border-foreground/10 pt-16 pb-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <span 
                className="font-serif text-[42px] leading-[50.4px] text-foreground"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                £{product.price}
              </span>
              <a 
                href={`mailto:contact@example.com?subject=Inquiry about ${product.name}`}
                className="inline-block px-12 py-4 bg-foreground text-light font-sans text-[13px] tracking-[1.04px] uppercase hover:opacity-80 transition-opacity duration-300 text-center md:ml-auto"
              >
                CONTACT FOR PURCHASE
              </a>
            </div>
            <p className="text-muted text-[13px] font-light">
              All pieces are carefully packed and shipped within 3–5 business days. For international shipping or collection in person, please contact us directly.
            </p>
          </div>
        </div>

        {/* Final statement section */}
        <div className="max-w-[768px] mx-auto px-8 md:px-16 mt-32">
          <p 
            className="font-serif text-[48px] leading-[62.4px] text-foreground tracking-[-0.48px]"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            Made for everyday moments, not display. These pieces are meant to be part of your routines. Dishwasher and microwave safe.
          </p>
        </div>
      </div>
    </main>
  )
}

