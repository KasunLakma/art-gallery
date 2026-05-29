import Link from "next/link";
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
            className="inline-block bg-artDark text-white font-medium text-sm md:text-base px-8 py-4 rounded-full shadow-sm transition-all duration-300 hover:bg-artRose-dark hover:scale-105 active:scale-98"
          >
            Explore Collections
          </Link>
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
    </div>
  );
}
