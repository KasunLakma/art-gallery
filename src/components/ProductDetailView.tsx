"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

interface ProductDetailViewProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const fallbackPlaceholder = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500";
  const [imgSrc, setImgSrc] = useState(product.image || fallbackPlaceholder);

  useEffect(() => {
    setImgSrc(product.image || fallbackPlaceholder);
  }, [product.image]);

  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { addToCart } = useCart();

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToBag = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
      },
      quantity
    );
    showToast(`Added ${quantity} ${product.name}(s) to your shopping bag!`, "success");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-55 flex items-center gap-3 bg-white/95 backdrop-blur-md border border-artRose-light/40 shadow-2xl rounded-2xl px-6 py-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-artDark">{toast.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left side: Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-artBg to-artRose-light/30 border border-artRose-light/20 flex items-center justify-center group shadow-xs">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => {
              if (imgSrc !== fallbackPlaceholder) {
                setImgSrc(fallbackPlaceholder);
              }
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Right side: Product metadata & actions */}
        <div className="flex flex-col h-full pt-2">
          {/* Availability Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Available In Gallery
            </span>
          </div>

          <span className="text-[10px] tracking-[0.25em] font-semibold text-artRose-dark uppercase mb-2 block">
            {product.category}
          </span>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-artDark tracking-wide mb-3">
            {product.name}
          </h1>

          <p className="text-xl font-medium text-artRose-dark mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-base text-artDark/60 leading-relaxed font-light mb-8">
            {product.description}
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
                className="w-10 h-10 rounded-full flex items-center justify-center text-artDark hover:bg-artBg hover:text-artRose-dark transition-colors duration-200 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-artDark select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full flex items-center justify-center text-artDark hover:bg-artBg hover:text-artRose-dark transition-colors duration-200 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleAddToBag}
            className="group w-full flex items-center justify-center gap-2 bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300 ease-out hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>Add to Bag</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
