'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { products } from './data'
import { useState } from 'react'

const CATEGORIES = ['All', 'Decor', 'Dining', 'Coffee'] as const
type Category = typeof CATEGORIES[number]

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-paper">
      <Logo />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 pt-24 sm:pt-32 md:pt-40 pb-24 sm:pb-32">

        {/* Page header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 tracking-tight">
            Collection
          </h1>
          <p className="text-muted text-sm sm:text-base font-light max-w-xl">
            Each piece is unique, made by hand in our East London studio. One of a kind — once sold, gone.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-12 sm:mb-16 border-b border-foreground/10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-sans text-xs tracking-[1.04px] uppercase transition-colors duration-150 cursor-pointer border-b-2 -mb-px ${
                activeCategory === cat
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-20">
          {filtered.map(product => (
            <Link
              key={product.id}
              href={`/collection/${product.id}`}
              className={`group block cursor-pointer ${!product.available ? 'opacity-50' : ''}`}
              aria-label={`${product.name}, £${product.price}${!product.available ? ', sold' : ''}`}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-5">
                <Image
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-opacity duration-300 ${
                    product.available ? 'group-hover:opacity-90' : ''
                  }`}
                  quality={75}
                  loading="lazy"
                />
                {/* Sold overlay */}
                {!product.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-sans text-[11px] tracking-[1.5px] uppercase text-foreground/60 bg-paper/80 px-3 py-1">
                      Sold
                    </span>
                  </div>
                )}
                {/* Buy indicator on hover — only for available pieces with Stripe */}
                {product.available && product.stripePaymentLink && (
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="font-sans text-[10px] tracking-[1.2px] uppercase bg-foreground text-light px-3 py-1.5">
                      Buy Now
                    </span>
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-muted font-sans text-[10px] tracking-[1.1px] uppercase mb-1">
                    {product.category}
                  </p>
                  <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug group-hover:opacity-70 transition-opacity duration-150">
                    {product.name}
                  </h2>
                </div>
                <p className="font-serif text-xl sm:text-2xl text-foreground shrink-0 pt-5">
                  £{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted font-sans text-sm py-16">No pieces in this category.</p>
        )}

        {/* Archive link */}
        <div className="mt-24 sm:mt-32 pt-12 border-t border-foreground/10">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 hover:opacity-60 transition-opacity"
          >
            <span className="font-sans text-xs sm:text-[13px] font-normal tracking-[1.04px] uppercase text-foreground">
              View Archive of Works
            </span>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M0 6H22M22 6L17 1M22 6L17 11" stroke="#2B2621" strokeWidth="1.5"/>
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
