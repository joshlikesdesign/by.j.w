import Logo from '@/components/Logo'
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen bg-paper">
      <Logo />
      
      <div className="pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1839px] mx-auto px-4 sm:px-8 md:px-16">
          {/* Heading */}
          <h1
            className="font-serif leading-[0.85] text-[#352d25] tracking-tighter mb-12 sm:mb-16 md:mb-24 reveal"
            style={{ fontSize: 'clamp(64px, 13vw, 220px)', fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            About
          </h1>

          {/* Row 1 — studio workspace image + intro text, asymmetric split */}
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-16 mb-20 sm:mb-28 md:mb-40 items-start">
            <div className="group reveal">
              <div className="relative w-full aspect-[756/945] bg-stone-200 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <Image
                    src="/images/me_bw.jpeg"
                    alt="Studio workspace"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 md:mt-16 reveal">
              <p
                className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[38px] leading-[1.15] text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                I'm a London-based{' '}
                <a
                  href="https://josh.computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-60 transition-opacity"
                  aria-label="Josh's personal website"
                >
                  designer
                </a>
                {' '}and potter making small, functional stoneware for everyday use. I also build tools for makers, like{' '}
                <a
                  href="https://potterytracker.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-60 transition-opacity"
                >
                  Pottery Tracker
                </a>
                .
              </p>
              <p
                className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                My background in product design shapes how I work with clay, with a focus on form, proportion, and how an object feels in the hand. I'm drawn to simple, resolved pieces that fit naturally into daily life.
              </p>
              <p
                className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Everything is made by hand on the wheel in small batches. I allow for variation and the marks of making, including glaze movement, small irregularities, and the effects of the kiln, so each piece is slightly different.
              </p>
            </div>
          </div>

          {/* Row 2 — Process text + ceramic vessel image, reversed & offset */}
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16 mb-20 sm:mb-28 md:mb-40 items-start">
            <div className="space-y-6 sm:space-y-8 reveal">
              <h2
                className="font-serif leading-[0.9] text-[#352d25] tracking-tight"
                style={{ fontSize: 'clamp(40px, 6vw, 88px)', fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Process
              </h2>
              <p
                className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                I work mainly in stoneware for its strength and durability. Pieces are thrown, trimmed, sometimes altered, then bisque fired, glazed by hand, and fired again to around 1240°C. I use a mix of my own glazes and studio glazes, working mostly in muted, natural tones.
              </p>
              <p
                className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                The kiln plays an active role in the final result. Placement, temperature, and chance all matter.
              </p>
            </div>
            <div className="group reveal md:mt-20">
              <div className="relative w-full aspect-[756/1008] bg-stone-200 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <Image
                    src="/images/L1008166.JPG"
                    alt="Ceramic vessel"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 — pottery detail image + Use text, offset */}
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-16 mb-20 sm:mb-28 md:mb-40 items-start">
            <div className="group reveal">
              <div className="relative w-full aspect-[756/945] bg-stone-200 overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <Image
                    src="/images/IMG_6163.jpeg"
                    alt="Pottery detail"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8 md:mt-24 reveal">
              <h2
                className="font-serif leading-[0.9] text-[#352d25] tracking-tight"
                style={{ fontSize: 'clamp(40px, 6vw, 88px)', fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Use
              </h2>
              <p
                className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground tracking-tight"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                These are practical objects, made to be used every day. They are meant to be handled, washed, stacked, and lived with. Dishwasher and microwave safe unless otherwise noted.
              </p>
            </div>
          </div>

          {/* Instagram link */}
          <div className="max-w-[672px] space-y-3 mb-12 sm:mb-16 reveal">
            <p 
              className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[32px] leading-relaxed sm:leading-[48px] text-foreground tracking-tight"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Feel free to see what I've been up to recently on{' '}
              <a
                href="https://instagram.com/by.j.w"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60 transition-opacity"
                aria-label="Instagram @by.j.w"
              >
                Instagram
              </a>
              .
            </p>
            <a
              href="https://instagram.com/by.j.w"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:opacity-60 hover:-translate-y-0.5 transition-all duration-300"
              style={{ transitionTimingFunction: 'var(--ease-snap)' }}
              aria-label="Instagram @by.j.w"
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
              <span className="font-sans text-sm text-foreground">
                @by.j.w
              </span>
            </a>
          </div>

        </div>
      </div>
    </main>
  )
}

