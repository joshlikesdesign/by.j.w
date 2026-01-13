'use client'

import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useRef, useEffect } from 'react'

interface ImageData {
  src: string
  isExpanded: boolean
}

// All available images
const allImages = [
  '/images/L1008208.JPG', '/images/DSCF4403.JPG', '/images/L1008186.JPG', '/images/L1008197.JPG',
  '/images/DSCF4413.JPG', '/images/L1008225.JPG', '/images/DSC05727.JPG', '/images/L1008235.JPG',
  '/images/IMG_6297.jpeg', '/images/DSCF4383.JPG', '/images/DSC05728.JPG', '/images/DSC05710.JPG',
  '/images/DSC05712.JPG', '/images/DSC05713.JPG', '/images/DSC05732.JPG', '/images/DSCF4399.JPG',
  '/images/IMG_6163.jpeg', '/images/DSC05686.JPG', '/images/DSC05692.JPG', '/images/DSC05710%202.JPG',
  '/images/DSCF4362.JPG', '/images/DSCF4372.JPG', '/images/DSCF4378.JPG', '/images/DSCF4389.JPG',
  '/images/DSCF4393.JPG', '/images/DSCF4397.JPG', '/images/DSCF4410.JPG', '/images/DSCF4416.JPG',
  '/images/DSCF4479.JPG', '/images/DSCF4483.JPG', '/images/IMG_6262.jpeg', '/images/IMG_6264.jpeg',
  '/images/IMG_6281.jpeg', '/images/L1008173.JPG', '/images/L1008166.JPG', '/images/me_bw.jpeg',
  '/images/IMG_6283.jpeg', '/images/IMG_6292.jpeg', '/images/IMG_6307.jpeg', '/images/IMG_6314.jpeg',
  '/images/IMG_6317.jpeg', '/images/L1008172.JPG', '/images/L1008175.JPG', '/images/L1008176.JPG',
  '/images/L1008177.JPG', '/images/L1008178.JPG', '/images/L1008182.JPG', '/images/L1008185.JPG',
  '/images/L1008192.JPG', '/images/L1008195.JPG', '/images/L1008201.JPG', '/images/L1008209.JPG',
  '/images/L1008213.JPG', '/images/L1008215.JPG', '/images/L1008221.JPG', '/images/L1008228.JPG',
  '/images/L1008229.JPG', '/images/L1008230.JPG', '/images/L1008232.JPG', '/images/L1008234.JPG',
  '/images/L1008237.JPG', '/images/DSC05721.JPG', '/images/DSC05722.JPG', '/images/DSC05723.JPG',
]

const IMAGES_PER_PAGE = 12 // 3 columns x 4 rows

export default function Gallery() {
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const loadMoreImages = (page: number) => {
    setIsLoading(true)
    const startIndex = page * IMAGES_PER_PAGE
    const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, allImages.length)
    const newImages: ImageData[] = []
    
    for (let i = startIndex; i < endIndex; i++) {
      newImages.push({
        src: allImages[i],
        isExpanded: false,
      })
    }
    
    setDisplayedImages(prev => {
      const updated = [...prev, ...newImages]
      setIsLoading(false)
      return updated
    })
  }

  const toggleExpand = (index: number) => {
    setDisplayedImages(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        isExpanded: !updated[index].isExpanded,
      }
      return updated
    })
  }

  // Load initial images
  useEffect(() => {
    loadMoreImages(0)
  }, [])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayedImages.length < allImages.length) {
          const nextPage = currentPage + 1
          setCurrentPage(nextPage)
          loadMoreImages(nextPage)
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [currentPage, isLoading, displayedImages.length])

  return (
    <main className="min-h-screen bg-paper">
      <Logo />
      
      <div className="pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16">
          {/* Page header */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h1 
              className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[120px] leading-tight text-[#352d25] tracking-tight mb-4"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Gallery
            </h1>
            <p className="text-muted text-base sm:text-lg font-light max-w-2xl">
              A visual collection of work in progress, finished pieces, and moments from the studio.
            </p>
          </div>

          {/* Gallery grid - responsive columns */}
          <div 
            ref={containerRef}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 auto-rows-max">
              {displayedImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative group ${
                    image.isExpanded && !isMobile ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''
                  }`}
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                >
                  <div
                    className={`relative overflow-hidden bg-stone-200 shadow-lg transition-all duration-500 ${
                      image.isExpanded && !isMobile
                        ? 'aspect-[4/3]' 
                        : 'aspect-[3/4]'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes={image.isExpanded && !isMobile
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 100vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      className="object-cover"
                      quality={70}
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                    {/* Expand button - only on desktop */}
                    {!isMobile && !image.isExpanded && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleExpand(index)
                        }}
                        className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 hover:bg-white text-stone-800 text-xs font-sans tracking-wide uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                      >
                        Expand
                      </button>
                    )}
                    {/* Collapse button - only on desktop */}
                    {!isMobile && image.isExpanded && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleExpand(index)
                        }}
                        className="absolute top-4 right-4 px-4 py-2 bg-white/90 hover:bg-white text-stone-800 text-xs font-sans tracking-wide uppercase transition-all duration-300 z-10"
                      >
                        Collapse
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Observer target for infinite scroll */}
            <div 
              ref={observerTarget}
              className="w-full h-32"
            />
            {isLoading && (
              <div className="w-full text-center text-muted py-8">
                Loading more images...
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
