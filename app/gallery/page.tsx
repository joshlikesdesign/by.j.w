'use client'

import Image from 'next/image'
import Logo from '@/components/Logo'
import { useState, useRef, useEffect } from 'react'

interface ImageData {
  src: string
  isExpanded: boolean
}

const IMAGES_PER_PAGE = 12 // 3 columns x 4 rows

export default function Gallery() {
  const [allImages, setAllImages] = useState<string[]>([])
  const [displayedImages, setDisplayedImages] = useState<ImageData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Fetch sorted images on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery-images')
        const data = await response.json()
        if (data.images) {
          setAllImages(data.images)
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }
    fetchImages()
  }, [])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const loadMoreImages = (page: number, images: string[]) => {
    setIsLoading(true)
    const startIndex = page * IMAGES_PER_PAGE
    const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, images.length)
    const newImages: ImageData[] = []
    
    for (let i = startIndex; i < endIndex; i++) {
      newImages.push({
        src: images[i],
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

  // Load initial images when allImages is available
  useEffect(() => {
    if (allImages.length > 0 && displayedImages.length === 0) {
      loadMoreImages(0, allImages)
    }
  }, [allImages])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (allImages.length === 0) return // Wait for images to load
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && displayedImages.length < allImages.length) {
          const nextPage = currentPage + 1
          setCurrentPage(nextPage)
          loadMoreImages(nextPage, allImages)
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
  }, [currentPage, isLoading, displayedImages.length, allImages.length, allImages])

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
              Archive of Works
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
                      alt={`Archive image ${index + 1}`}
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
