'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useRef, useState, useEffect } from 'react'

export default function Home() {
  const targetSectionRef = useRef<HTMLElement>(null)
  const [textColor, setTextColor] = useState('rgba(255, 234, 214, 1)')

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate color based on mouse position
      // Using HSL for smooth color transitions
      const hue = (e.clientX / window.innerWidth) * 360
      const saturation = 50 + (e.clientY / window.innerHeight) * 30 // 50-80%
      const lightness = 70 + (Math.sin(e.clientX * 0.01) * 10) // 60-80% with wave effect
      
      setTextColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <main className="relative">
      <Logo />

      {/* Hero Section - 90% height with background image - scrolls over text */}
      <section className="relative w-full overflow-hidden z-10" style={{ height: '90vh', backgroundColor: '#000' }}>
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg_cropped2.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center bottom' }}
            priority
            quality={75}
          />
        </div>
        
        {/* 50% black tint overlay */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none'
          }}
        />
      </section>

      {/* Fixed headline - pinned to viewport, disappears behind hero on scroll */}
      <div className="fixed top-[15vh] sm:top-[20vh] md:top-[25vh] left-1/2 -translate-x-1/2 z-[16] max-w-[1280px] w-full px-4 sm:px-8 md:px-16 text-center mix-blend-difference pointer-events-none">
          <h1 
            className="font-serif leading-[1.1] tracking-tight text-[48px] sm:text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] 2xl:text-[160px]"
            style={{ 
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
              color: textColor,
              fontWeight: 600,
            }}
          >
          Ceramics made by hand in East London.
        </h1>
      </div>

      {/* Centered Image Section - Two images overlapping */}
      <section className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 z-[15] bg-paper">
        <div className="max-w-[1152px] mx-auto relative">
          {/* Mobile: Stack images vertically */}
          <div className="md:hidden space-y-8">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
              <Image
                src="/images/L1008208.JPG"
                alt="Ceramic vessel"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
              <Image
                src="/images/DSCF4403.JPG"
                alt="Ceramic vessel"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
          {/* Desktop: Overlapping images */}
          <div className="hidden md:block relative" style={{ height: '1100px' }}>
            {/* First image - positioned from left, slightly above */}
            <div className="absolute left-[193px] top-[-21px] w-[608px] h-[768px] overflow-hidden">
              <Image
                src="/images/L1008208.JPG"
                alt="Ceramic vessel"
                fill
                sizes="608px"
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
            {/* Second image - overlaps horizontally and vertically */}
            <div className="absolute left-[576px] top-[400px] w-[608px] h-[768px] overflow-hidden">
              <Image
                src="/images/DSCF4403.JPG"
                alt="Ceramic vessel"
                fill
                sizes="608px"
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section - covers fixed h1 on scroll */}
      <section ref={targetSectionRef} className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 z-20 bg-paper">
        {/* Gradient overlay at top - transitions from transparent to full bg color */}
        <div 
          className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
          style={{
            height: '200px',
            background: 'linear-gradient(to bottom, rgba(245, 241, 236, 0) 0%, rgba(245, 241, 236, 0.5) 50%, rgba(245, 241, 236, 1) 100%)',
          }}
        />
        <div className="relative z-[2] max-w-[768px] mx-auto">
          <p 
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] leading-tight text-foreground tracking-tight"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            Each piece is deliberately imperfect, showing the hand and the process. The objects carry the marks of their making.
          </p>
        </div>
      </section>

      {/* Editorial Image Pair Section */}
      <section className="relative px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24 z-20 bg-paper">
        {/* Mobile: Stack images */}
        <div className="md:hidden space-y-8 max-w-md mx-auto">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/L1008186.JPG"
              alt="Potter working with clay"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/DSCF4399.JPG"
              alt="Finished ceramic pieces"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
        {/* Desktop: Side by side */}
        <div className="hidden md:block max-w-[1280px] mx-auto relative h-[938px]">
          {/* Left image - starts lower */}
          <div className="absolute left-0 top-[128px] w-[47.5%] aspect-[608/810.664] overflow-hidden">
            <Image
              src="/images/L1008186.JPG"
              alt="Potter working with clay"
              fill
              sizes="47.5vw"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
          </div>
          {/* Right image - starts at top */}
          <div className="absolute right-0 top-0 w-[47.5%] aspect-[608/810.664] overflow-hidden">
            <Image
              src="/images/DSCF4399.JPG"
              alt="Finished ceramic pieces"
              fill
              sizes="47.5vw"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Text and CTA Section */}
      <section className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-48 z-20 bg-paper">
        <div className="max-w-[896px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-24 items-start">
            <div className="flex-1">
              <h2 
                className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-[32px] leading-tight text-foreground"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Material & Process
              </h2>
              <p className="font-sans text-sm sm:text-[15px] font-light leading-relaxed text-muted">
                Working primarily with stoneware, each piece is fired to high temperature in electric. Glazes are then applied by hand and the final piece is fired to over 1200ºC to make them dishwasher and microwave safe.
              </p>
            </div>
            <div className="flex items-end md:pt-32">
              <Link
                href="/collection"
                className="group inline-flex items-center gap-3 hover:opacity-60 transition-opacity"
              >
                <span className="font-sans text-xs sm:text-[13px] font-normal tracking-[1.04px] uppercase text-foreground">
                  VIEW COLLECTION
                </span>
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="#2B2621" strokeWidth="1.5"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final spacer */}
      <div className="relative h-12 bg-paper z-[17]" />

      {/* Footer */}
      <footer className="relative px-4 sm:px-8 md:px-16 py-8 sm:py-12 z-20 bg-paper border-t border-foreground/10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted font-sans text-sm">
            © Josh Wilburne
          </div>
          <div>
            <a
              href="https://instagram.com/by.j.w"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-60 transition-opacity"
              aria-label="Instagram"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path 
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
