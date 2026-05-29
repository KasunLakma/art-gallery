"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck } from "lucide-react";

export default function ProductDetailView() {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left side: Large elegant placeholder image frame */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-artBg to-artRose-light/30 border border-artRose-light/20 flex items-center justify-center group shadow-xs">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <span className="font-serif italic text-artDark/30 text-base tracking-wide text-center px-4">
            High-Resolution Asset Placeholder
          </span>
        </div>

        {/* Right side: Product metadata & actions */}
        <div className="flex flex-col h-full pt-2">
          {/* Availability Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              In Stock
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-artDark tracking-wide mb-3">
            Blushing Serenade Bouquet
          </h1>

          <p className="text-xl font-medium text-artRose-dark mb-6">
            $85.00
          </p>

          <p className="text-base text-artDark/60 leading-relaxed font-light mb-8">
            An exquisite arrangement of hand-selected everlasting roses, wild eucalyptus, and delicate pampas grass, custom-styled to bring timeless elegance to your favorite space or serve as the perfect heartfelt gift.
          </p>

          {/* Quantity selector */}
          <div className="flex flex-col gap-3 mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-artDark/40 font-semibold">
              Select Quantity
            </span>
            <div className="flex items-center border border-artRose-light/60 w-fit rounded-full bg-white p-1">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-full flex items-center justify-center text-artDark hover:bg-artBg hover:text-artRose-dark transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-artDark">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full flex items-center justify-center text-artDark hover:bg-artBg hover:text-artRose-dark transition-colors duration-200"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={() => alert(`Added ${quantity} "Blushing Serenade Bouquet(s)" to bag!`)}
            className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300 hover:scale-[1.01] active:scale-98"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
