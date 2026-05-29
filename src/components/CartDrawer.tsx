"use client";

import React from "react";
import { X, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex justify-end">
      {/* Dark blurred backdrop overlay */}
      <div className="absolute inset-0 bg-artDark/40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {/* Slide-over panel from right */}
      <div className="fixed top-0 right-0 h-full h-screen w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-slide-left transition-all duration-300">
        <div className="p-6 border-b border-artRose-light/20 flex items-center justify-between">
          <h2 className="font-serif text-lg text-artDark font-light tracking-wide flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-artRose-dark" />
            Your Shopping Bag
          </h2>
          <button onClick={onClose} className="p-1 hover:text-artRose-dark transition-colors" aria-label="Close cart">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Cart Items Viewport */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          <div className="flex gap-4 items-center py-2 border-b border-artBg">
            <div className="w-12 h-12 rounded-lg bg-artBg flex-shrink-0 flex items-center justify-center font-serif text-[10px] italic text-artDark/30">
              Mockup
            </div>
            <div>
              <h4 className="text-sm font-serif text-artDark font-light">Pastel Dreams Bouquet</h4>
              <p className="text-xs text-artDark/50">$85.00 • Qty 1</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-artRose-light/20 bg-artBg/30">
          <button
            onClick={() => alert("Redirecting to checkout...")}
            className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
