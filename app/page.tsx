'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { useRef, useState, useEffect, Fragment } from 'react'

// Fallback images used until gallery loads and for SSR
const DEFAULT_HOME_IMAGES = [
  '/images/L1008208.JPG',
  '/images/DSCF4403.JPG',
  '/images/L1008186.JPG',
  '/images/DSCF4399.JPG',
]

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const MARQUEE_TEXT = 'Hand-thrown\u2002·\u2002Stoneware\u2002·\u2002East London\u2002·\u2002Made to last\u2002·\u2002'

export default function Home() {
  const targetSectionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)
  const [textColor, setTextColor] = useState('rgba(255, 234, 214, 1)')
  const [homeImages, setHomeImages] = useState<string[]>(DEFAULT_HOME_IMAGES)

  // Randomise homepage images from gallery on load
  useEffect(() => {
    let cancelled = false
    fetch('/api/gallery-images')
      .then((res) => res.json())
      .then((data: { images?: string[] }) => {
        if (cancelled || !data?.images?.length) return
        const pool = shuffleArray(data.images)
        setHomeImages(pool.slice(0, 4))
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Mouse-reactive headline colour (throttled + prefers-reduced-motion aware)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        const hue = (e.clientX / window.innerWidth) * 360
        const saturation = 50 + (e.clientY / window.innerHeight) * 30
        const lightness = 70 + (Math.sin(e.clientX * 0.01) * 10)
        setTextColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
        rafRef.current = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <main className="relative">
      <Logo />

      {/* Hero Section - 90% height with background image */}
      <section className="relative w-full overflow-hidden z-10" style={{ height: '90vh', backgroundColor: '#000' }}>
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
        <div
          className="absolute inset-0 z-[1]"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', pointerEvents: 'none' }}
        />
      </section>

      {/* Fixed headline — pinned to viewport, disappears behind hero on scroll */}
      <div className="fixed top-[15vh] sm:top-[20vh] md:top-[25vh] left-1/2 -translate-x-1/2 z-[16] max-w-[1280px] w-full px-4 sm:px-8 md:px-16 text-center mix-blend-difference pointer-events-none">
        <h1
          className="leading-[1.05] tracking-tight text-[44px] sm:text-[44px] md:text-[60px] lg:text-[88px] xl:text-[116px] 2xl:text-[144px]"
          style={{
            fontFamily: 'var(--font-unbounded)',
            color: textColor,
            fontWeight: 500,
          }}
        >
          {['Ceramics', 'made', 'by', 'hand', 'in', 'East', 'London.'].map((word, i) => (
            <Fragment key={i}>
              <span className="hero-word" style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                {word}
              </span>
              {i < 6 && ' '}
            </Fragment>
          ))}
        </h1>
      </div>

      {/* ── Marquee — first paper element, scrolls over the hero ── */}
      <div className="relative overflow-hidden border-b border-foreground/10 bg-paper py-3 z-[15]">
        <div className="marquee-track inline-flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`a${i}`} className="font-sans text-[11px] tracking-[2.5px] uppercase text-muted">
              {MARQUEE_TEXT}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`b${i}`} aria-hidden="true" className="font-sans text-[11px] tracking-[2.5px] uppercase text-muted">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Centered Image Section - Two images overlapping */}
      <section className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 z-[15] bg-paper">
        <div className="max-w-[1152px] mx-auto relative">
          {/* Mobile: Stack images vertically */}
          <div className="md:hidden space-y-8">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
              <Image
                src={homeImages[0]}
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
                src={homeImages[1]}
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
            <div className="absolute left-[193px] top-[-21px] w-[608px] h-[768px] overflow-hidden group">
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image
                  src={homeImages[0]}
                  alt="Ceramic vessel"
                  fill
                  sizes="608px"
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute left-[576px] top-[400px] w-[608px] h-[768px] overflow-hidden group">
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <Image
                  src={homeImages[1]}
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
        </div>
      </section>

      {/* Typography Section — covers fixed h1 on scroll */}
      <section ref={targetSectionRef} className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 z-20 bg-paper">
        {/* Gradient overlay at top */}
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
              src={homeImages[2]}
              alt="Pottery"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              quality={75}
              loading="lazy"
            />
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src={homeImages[3]}
              alt="Ceramic pieces"
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
          <div className="absolute left-0 top-[128px] w-[47.5%] aspect-[608/810.664] overflow-hidden group">
            <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <Image
                src={homeImages[2]}
                alt="Pottery"
                fill
                sizes="47.5vw"
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute right-0 top-0 w-[47.5%] aspect-[608/810.664] overflow-hidden group">
            <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <Image
                src={homeImages[3]}
                alt="Ceramic pieces"
                fill
                sizes="47.5vw"
                className="object-cover"
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Material & Process */}
      <section className="relative px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-48 z-20 bg-paper">
        <div className="max-w-[896px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-24 items-start">
            <div className="flex-1">
              <h2
                className="mb-4 sm:mb-6 font-serif text-2xl sm:text-3xl md:text-[32px] leading-tight text-foreground"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Material &amp; Process
              </h2>
              <p className="font-sans text-sm sm:text-[15px] font-light leading-relaxed text-muted">
                Working primarily with stoneware, each piece is fired to high temperature in electric. Glazes are then applied by hand and the final piece is fired to over 1200ºC to make them dishwasher and microwave safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Split CTA — Archive / About ── */}
      <section className="relative z-20 bg-paper border-t border-foreground/10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 divide-y divide-foreground/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          <Link
            href="/gallery"
            className="group flex min-h-[200px] cursor-pointer flex-col justify-between p-8 transition-colors duration-200 hover:bg-foreground/[0.025] sm:min-h-[260px] sm:p-12 md:p-16"
          >
            <p className="font-sans text-[10px] tracking-[2px] uppercase text-muted">
              Explore
            </p>
            <div className="flex items-end justify-between">
              <h2
                className="font-serif leading-[0.92] text-foreground"
                style={{
                  fontSize: 'clamp(36px, 5vw, 80px)',
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                Archive
                <br />
                of Works
              </h2>
              <svg
                width="28" height="14" viewBox="0 0 24 12" fill="none"
                className="mb-1 ml-4 shrink-0 transition-transform duration-200 group-hover:translate-x-2"
              >
                <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="#2B2621" strokeWidth="1.5" />
              </svg>
            </div>
          </Link>

          <Link
            href="/about"
            className="group flex min-h-[200px] cursor-pointer flex-col justify-between p-8 transition-colors duration-200 hover:bg-foreground/[0.025] sm:min-h-[260px] sm:p-12 md:p-16"
          >
            <p className="font-sans text-[10px] tracking-[2px] uppercase text-muted">
              Learn more
            </p>
            <div className="flex items-end justify-between">
              <h2
                className="font-serif leading-[0.92] text-foreground"
                style={{
                  fontSize: 'clamp(36px, 5vw, 80px)',
                  fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                }}
              >
                About
              </h2>
              <svg
                width="28" height="14" viewBox="0 0 24 12" fill="none"
                className="mb-1 ml-4 shrink-0 transition-transform duration-200 group-hover:translate-x-2"
              >
                <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="#2B2621" strokeWidth="1.5" />
              </svg>
            </div>
          </Link>
        </div>
      </section>

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
              aria-label="Instagram @by.j.w"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
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
