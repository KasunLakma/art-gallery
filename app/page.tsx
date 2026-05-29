import Link from "next/link";
import Image from "next/image";
import { Truck, Gift, Heart } from "lucide-react";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-artBg">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 lg:py-40 flex-grow min-h-[75vh] overflow-hidden">
        {/* Soft decorative glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-artRose-light/40 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs md:text-sm tracking-[0.25em] font-semibold text-artDark/50 uppercase mb-4">
            Welcome to Art Gallery
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-artDark leading-[1.15] mb-8">
            Curated Gifts For Your <br className="hidden sm:inline" />
            <span className="italic font-normal text-artDark/90">Cherished Moments</span>
          </h1>

          <p className="text-base md:text-lg text-artDark/60 max-w-xl mb-12 font-light leading-relaxed">
            Experience the art of giving with our boutique selection of premium, hand-crafted keepsakes designed to make every occasion unforgettable.
          </p>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-artDark text-white font-medium text-sm md:text-base px-8 py-4 rounded-full shadow-sm transition-all duration-300 ease-out hover:bg-artRose-dark hover:scale-[1.02] active:scale-98"
          >
            <span>Explore Collections</span>
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-12 md:py-20 bg-white/50 border-t border-b border-artRose-light/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-artRose-light/20">
            <div className="flex flex-col items-center text-center p-4">
              <Truck className="w-8 h-8 text-artDark stroke-[1.25] mb-5" />
              <h3 className="font-serif text-lg text-artDark font-light tracking-wide mb-2">
                Complimentary Delivery
              </h3>
              <p className="text-xs md:text-sm text-artDark/50 max-w-xs font-light leading-relaxed">
                Enjoy free priority shipping on all curated orders over $150.00.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 pt-8 md:pt-4">
              <Gift className="w-8 h-8 text-artDark stroke-[1.25] mb-5" />
              <h3 className="font-serif text-lg text-artDark font-light tracking-wide mb-2">
                Artisan Packaging
              </h3>
              <p className="text-xs md:text-sm text-artDark/50 max-w-xs font-light leading-relaxed">
                Each boutique item is nested in our signature hand-embossed boxes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 pt-8 md:pt-4">
              <Heart className="w-8 h-8 text-artDark stroke-[1.25] mb-5" />
              <h3 className="font-serif text-lg text-artDark font-light tracking-wide mb-2">
                Curated with Love
              </h3>
              <p className="text-xs md:text-sm text-artDark/50 max-w-xs font-light leading-relaxed">
                Hand-selected, boutique keepsakes styled locally for your cherished moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Bento Section */}
      <section className="py-20 md:py-28 bg-white border-t border-artRose-light/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-artDark font-light tracking-wide mb-4">
            Shop Our Featured Collections
          </h2>
          <div className="w-16 h-[2px] bg-artRose-dark/40 mx-auto animate-pulse" />
        </div>
        <BentoGrid />
      </section>

      {/* Editorial Gallery Showcase Section */}
      <section className="py-20 md:py-28 bg-artBg border-t border-artRose-light/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <span className="text-xs tracking-[0.25em] font-semibold text-artDark/50 uppercase mb-3 block">
            Shared Moments
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-artDark font-light tracking-wide mb-3">
            The Aesthetic Edit
          </h2>
          <p className="text-sm text-artDark/60 font-light max-w-md mx-auto leading-relaxed">
            A visual exploration of warm illumination, film-grain textures, and high-fashion botanical styling.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Gallery Card 1 */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group cursor-pointer border border-artRose-light/20 shadow-sm">
              <Image
                src="/gallery_floral.png"
                alt="Atmospheric Floral Arrangement"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-artDark/60 via-artDark/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-semibold mb-1">01 / Floral</span>
                <h4 className="font-serif italic text-white text-base font-light">Atmospheric Arrangements</h4>
              </div>
            </div>

            {/* Gallery Card 2 */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group cursor-pointer border border-artRose-light/20 shadow-sm">
              <Image
                src="/gallery_lighting.png"
                alt="Warm Ambient Lighting"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-artDark/60 via-artDark/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-semibold mb-1">02 / Lighting</span>
                <h4 className="font-serif italic text-white text-base font-light">Warm Ambient Glow</h4>
              </div>
            </div>

            {/* Gallery Card 3 */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group cursor-pointer border border-artRose-light/20 shadow-sm">
              <Image
                src="/gallery_textures.png"
                alt="Clay & Botanical Textures"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-artDark/60 via-artDark/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-semibold mb-1">03 / Textures</span>
                <h4 className="font-serif italic text-white text-base font-light">Botanical Textures & Clay</h4>
              </div>
            </div>

            {/* Gallery Card 4 */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden group cursor-pointer border border-artRose-light/20 shadow-sm">
              <Image
                src="/gallery_packaging.png"
                alt="Curated Packaging Design"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-artDark/60 via-artDark/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-semibold mb-1">04 / Packaging</span>
                <h4 className="font-serif italic text-white text-base font-light">Curated Artisan Wrap</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
