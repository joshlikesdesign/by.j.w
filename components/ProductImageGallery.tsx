'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface ProductImageGalleryProps {
  mainImage: string
  thumbnails: string[]
  alt: string
  mainImageAlt?: string
  thumbnailAlts?: string[]
}

export default function ProductImageGallery({ mainImage, thumbnails, alt, mainImageAlt, thumbnailAlts = [] }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null)

  const allImages = [mainImage, ...thumbnails].filter(Boolean)
  const allAlts = [mainImageAlt || alt, ...thumbnailAlts].filter(Boolean)
  const selectedIndex = allImages.indexOf(selectedImage)
  const imageCount = allImages.length
  const gridCols = imageCount === 2 ? 'grid-cols-2' : 'grid-cols-3'
  
  const getAltText = (index: number) => {
    return allAlts[index] || `${alt} - view ${index + 1}`
  }

  // Load image to get natural dimensions and calculate aspect ratio
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight
      setImageAspectRatio(aspectRatio)
    }
    img.onerror = () => {
      // Fallback to 3/4 if image fails to load
      setImageAspectRatio(3/4)
    }
    // Use the actual image path from public folder
    const imagePath = selectedImage.startsWith('/') ? selectedImage : `/${selectedImage}`
    img.src = imagePath
  }, [selectedImage])

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main large image */}
      <div className="relative max-w-full sm:max-w-[90%] md:max-w-[80%]">
        <div 
          className="relative bg-stone-200 overflow-hidden"
          style={{ 
            aspectRatio: imageAspectRatio ? `${imageAspectRatio}` : undefined,
            minHeight: imageAspectRatio ? undefined : '400px',
            width: '100%'
          }}
        >
          <Image
            src={selectedImage}
            alt={getAltText(selectedIndex)}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain"
            quality={80}
            priority
          />
        </div>
      </div>

      {/* Thumbnail grid - adjusts based on number of images */}
      {imageCount > 1 && (
        <div className={`grid ${gridCols} gap-2 max-w-full sm:max-w-md`}>
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(image)
                setSelectedImageIndex(index)
              }}
              className={`relative aspect-square bg-stone-200 overflow-hidden transition-opacity duration-300 ${
                index === selectedIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
              aria-label={`View ${getAltText(index)}`}
            >
              <Image
                src={image}
                alt={getAltText(index)}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover"
                quality={70}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
