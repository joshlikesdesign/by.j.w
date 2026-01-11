'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Menu button - fixed top-right */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-[41.5px] right-8 z-[9999] mix-blend-difference pointer-events-auto"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span 
          className="font-sans text-[13px] font-normal tracking-[1.04px]"
          style={{ color: 'rgba(255, 234, 214, 1)' }}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </span>
      </button>

      {/* Full-screen menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground flex items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav className="text-center">
            <ul className="space-y-8">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/collection"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:opacity-60 transition-opacity font-serif text-4xl md:text-5xl lg:text-6xl text-light"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
