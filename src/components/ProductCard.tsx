"use client";

import React from "react";
import { Plus } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  category: string;
  image?: string;
}

export default function ProductCard({ title, price, category, image }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-artRose-light/40 hover:-translate-y-0.5 border border-transparent hover:border-artRose-light/20">
      {/* Image container / Mockup Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-artBg">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Decorative brand gradient if no image is supplied */
          <div className="w-full h-full bg-gradient-to-tr from-artBg to-artRose-light/40 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <span className="font-serif italic text-artDark/30 text-sm">Art Gallery</span>
          </div>
        )}
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-artDark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-artDark/40 uppercase mb-1.5 block">
          {category}
        </span>
        
        <h4 className="font-serif text-base text-artDark font-light tracking-wide mb-1 line-clamp-1 group-hover:text-artRose-dark transition-colors duration-200">
          {title}
        </h4>
        
        <p className="text-sm font-medium text-artDark/80 mb-4">
          {price}
        </p>

        {/* Minimal Add to Cart Action Link */}
        <button
          type="button"
          onClick={() => console.log(`Added ${title} to cart`)}
          className="group mt-auto flex items-center gap-1.5 text-xs font-semibold tracking-wider text-artDark uppercase border-t border-artDark/5 pt-3 hover:text-artRose-dark transition-all duration-300 ease-out hover:scale-[1.02] w-full text-left"
        >
          <span>Add to Cart</span>
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">
            +
          </span>
        </button>
      </div>
    </div>
  );
}
