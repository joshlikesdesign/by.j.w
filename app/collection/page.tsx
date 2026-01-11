import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'

// Mock product data - replace with real data later
const products = [
  {
    id: '1',
    name: 'Thrown Bowl',
    price: 85,
    image: '/images/L1008197.JPG',
    description: 'Stoneware bowl, hand-thrown',
  },
  {
    id: '2',
    name: 'Celadon Vase',
    price: 120,
    image: '/images/DSCF4413.JPG',
    description: 'Glazed celadon, one-of-a-kind',
  },
  {
    id: '3',
    name: 'Moss Glazed Plate',
    price: 65,
    image: '/images/DSC05727.JPG',
    description: 'Dinner plate with moss glaze',
  },
  {
    id: '4',
    name: 'Tall Cylinder',
    price: 150,
    image: '/images/DSCF4383.JPG',
    description: 'Tall stoneware vessel',
  },
  {
    id: '5',
    name: 'Shallow Dish',
    price: 55,
    image: '/images/L1008225.JPG',
    description: 'Hand-built shallow dish',
  },
]

export default function Collection() {
  return (
    <main className="min-h-screen pt-24">
      <Navigation />
      <Logo />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        {/* Page header */}
        <div className="mb-20 md:mb-32">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-earth mb-4">
            Collection
          </h1>
          <p className="text-stone-600 text-lg font-light max-w-2xl">
            Each piece is unique, made by hand in our London studio.
          </p>
        </div>

        {/* Vertical gallery layout */}
        <div className="space-y-32 md:space-y-40">
          {products.map((product, index) => (
            <Link 
              key={product.id}
              href={`/collection/${product.id}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                {/* Image */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="aspect-[3/4] bg-stone-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                
                {/* Text content */}
                <div className={`flex-1 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl md:text-4xl text-earth">
                      {product.name}
                    </h2>
                    <p className="text-stone-600 font-light text-lg leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <span className="font-sans text-xl text-earth">
                        £{product.price}
                      </span>
                      <span className="text-sm text-stone-500 uppercase tracking-wide">
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
    </main>
  )
}

