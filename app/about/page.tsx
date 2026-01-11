import Navigation from '@/components/Navigation'
import Logo from '@/components/Logo'
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen bg-paper">
      <Navigation />
      <Logo />
      
      <div className="pt-32 pb-32">
        <div className="max-w-[1839px] mx-auto px-8 md:px-16">
          {/* Heading */}
          <h1 
            className="font-serif text-[120px] leading-[132px] text-[#352d25] tracking-[-2.4px] mb-16"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            About Josh Wilburne
          </h1>

          {/* Studio workspace image */}
          <div className="mb-16">
            <div className="w-full max-w-[756px] aspect-[756/945] bg-stone-200 overflow-hidden">
              <img
                src="/images/me_bw.jpeg"
                alt="Studio workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* First text section */}
          <div className="max-w-[672px] space-y-8 mb-16">
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              I am a London-based designer and potter, working with stoneware to make small, functional objects for everyday use.
            </p>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              My background is in product design, which shapes how I approach ceramics, with attention to form, proportion, and how something feels in the hand. I am interested in quiet, resolved objects, pieces that do not perform but settle into daily life.
            </p>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Everything is made in small batches, by hand, on the wheel. I leave space for variation, for the marks of making, for the way glaze and clay respond to heat and gravity. No two pieces are exactly the same, and I do not try to make them that way.
            </p>
          </div>

          {/* Ceramic vessel image */}
          <div className="mb-16 ml-auto max-w-[756px]">
            <div className="w-full aspect-[756/1008] bg-stone-200 overflow-hidden">
              <img
                src="/images/L1008166.JPG"
                alt="Ceramic vessel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Process section */}
          <div className="max-w-[672px] space-y-8 mb-16">
            <h2 
              className="font-serif text-[64px] leading-[76.8px] text-[#352d25] tracking-[-1.28px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Process
            </h2>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              I work primarily with stoneware clay, dense, durable, and suited to daily use. Each piece is thrown on the wheel, trimmed, and sometimes altered by hand.
            </p>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              After an initial bisque firing, pieces are glazed individually and fired again to around 1240°C. I mix and test my own glazes, working with muted greens, soft blues, warm neutrals, and mineral tones.
            </p>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              The kiln is not just a finishing step. It is part of the making. Temperature, placement, and chance all play a role in how a piece resolves.
            </p>
          </div>

          {/* Pottery detail image */}
          <div className="mb-16">
            <div className="w-full max-w-[756px] aspect-[756/945] bg-stone-200 overflow-hidden">
              <img
                src="/images/IMG_6163.jpeg"
                alt="Pottery detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Philosophy section */}
          <div className="max-w-[672px] space-y-8">
            <h2 
              className="font-serif text-[64px] leading-[76.8px] text-[#352d25] tracking-[-1.28px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              Philosophy
            </h2>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              I am interested in objects that are useful first, expressive second.
            </p>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              This work is an ongoing exploration of form, surface, and function, how something looks, how it feels, and how it fits into daily routines.
            </p>
            <p 
              className="font-serif text-[32px] leading-[48px] text-foreground tracking-[-0.32px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              These are not precious objects. They are meant to be used, handled, stacked, washed, and returned to the shelf.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

