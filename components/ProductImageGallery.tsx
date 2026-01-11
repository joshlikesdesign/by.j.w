'use client'

import { useState } from 'react'

interface ProductImageGalleryProps {
  mainImage: string
  thumbnails: string[]
  alt: string
}

export default function ProductImageGallery({ mainImage, thumbnails, alt }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)

  const allImages = [mainImage, ...thumbnails].filter(Boolean)
  const selectedIndex = allImages.indexOf(selectedImage)
  const imageCount = allImages.length
  const gridCols = imageCount === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative max-w-[80%]">
        <div className="bg-stone-200 overflow-hidden">
          <img
            src={selectedImage}
            alt={alt}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Thumbnail grid - adjusts based on number of images */}
      {imageCount > 1 && (
        <div className={`grid ${gridCols} gap-2 max-w-md`}>
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square bg-stone-200 overflow-hidden transition-opacity duration-300 ${
                index === selectedIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${alt} - view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
