"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  category: string;
  image?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({ id, title, price, category, image, onAddToCart }: ProductCardProps) {
  const fallbackPlaceholder = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500";
  const [imgSrc, setImgSrc] = useState(image || fallbackPlaceholder);

  useEffect(() => {
    setImgSrc(image || fallbackPlaceholder);
  }, [image]);

  return (
    <div className="group relative flex flex-col bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      {/* Image container wrapped in Link */}
      <Link href={`/shop/${id}`} className="block relative aspect-square w-full overflow-hidden bg-artBg">
        <img
          src={imgSrc}
          alt={title}
          onError={() => {
            if (imgSrc !== fallbackPlaceholder) {
              setImgSrc(fallbackPlaceholder);
            }
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-artDark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/40 uppercase mb-1.5 block">
          {category}
        </span>
        
        {/* Title wrapped in Link */}
        <Link href={`/shop/${id}`} className="block">
          <h4 className="font-serif text-base text-artDark font-light tracking-wide mb-1 line-clamp-1 group-hover:text-artRose-dark transition-colors duration-200 cursor-pointer">
            {title}
          </h4>
        </Link>
        
        <p className="text-sm font-medium text-artDark/80 mb-4">
          {price}
        </p>

        {/* Minimal Add to Cart Action Link */}
        <button
          type="button"
          onClick={onAddToCart}
          className="group mt-auto flex items-center gap-1.5 text-xs font-semibold tracking-wider text-artDark uppercase border-t border-artDark/5 pt-3 hover:text-artRose-dark transition-all duration-300 ease-out hover:scale-[1.02] w-full text-left cursor-pointer"
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
