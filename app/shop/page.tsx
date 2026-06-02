import React, { Suspense } from "react";
import ProductShop from "@/components/ProductShop";
import ProductSkeleton from "@/components/ProductSkeleton";

export const metadata = {
  title: "Shop Our Collections | Art Gallery",
  description: "Browse our curated bouquets, frames, and hampers designed for your cherished moments.",
};

export default function ShopPage() {
  return (
    <main className="pt-12 md:pt-20 pb-24 min-h-screen bg-artBg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center pt-8">
        <span className="text-xs tracking-[0.25em] font-semibold text-artDark/50 uppercase mb-3 block">
          Boutique Catalog
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-artDark font-light tracking-wide mb-4">
          Our Collections
        </h1>
        <div className="w-12 h-[2px] bg-artRose-dark/40 mx-auto" />
      </div>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      }>
        <ProductShop />
      </Suspense>
    </main>
  );
}
