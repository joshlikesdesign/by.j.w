'use client'

import { useState } from 'react'

interface ExpandableImageProps {
  src: string
  alt: string
}

export default function ExpandableImage({ src, alt }: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      <div 
        className={`bg-stone-200 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'aspect-[3/6]' : 'aspect-[3/4]'
        }`}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 hover:bg-white text-stone-800 text-xs font-sans tracking-wide uppercase transition-all duration-300 z-10"
        aria-label={isExpanded ? 'Collapse image' : 'Expand image'}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  )
}
