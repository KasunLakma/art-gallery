"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  category: string;
}

export default function CartView() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      title: "Blushing Serenade Bouquet",
      price: 85.00,
      quantity: 1,
      category: "Bouquets",
    },
    {
      id: "2",
      title: "Sylvan Gold Frame",
      price: 120.00,
      quantity: 2,
      category: "Frames",
    },
  ]);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      {items.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-artDark font-light tracking-wide mb-4">
            Your cart is empty
          </h2>
          <p className="text-sm text-artDark/50 max-w-sm mb-8 font-light">
            Browse our curated collections to find the perfect keepsake for your cherished moments.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-artDark text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-artRose-dark transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-xl md:text-2xl text-artDark font-light tracking-wide border-b border-artRose-light/20 pb-4">
              Your Selection ({items.length})
            </h2>
            <div className="divide-y divide-artRose-light/20">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 md:gap-6 py-6 items-center">
                  {/* Image Placeholder */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gradient-to-tr from-artBg to-artRose-light/30 border border-artRose-light/10 flex-shrink-0 flex items-center justify-center">
                    <span className="font-serif italic text-artDark/30 text-[10px]">Mockup</span>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] tracking-[0.15em] font-semibold text-artDark/40 uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base md:text-lg text-artDark font-light truncate mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-artDark/50 mb-2">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-artDark/40 hover:text-red-500 font-semibold uppercase tracking-wider transition-colors duration-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Item Total Price */}
                  <div className="text-right">
                    <span className="text-sm md:text-base font-semibold text-artDark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs">
            <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide mb-6 border-b border-artRose-light/20 pb-4">
              Order Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-artDark/60 font-light">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-artDark/60 font-light">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-artRose-dark italic">
                  Free shipping on orders over $150.00
                </p>
              )}
              <hr className="border-artRose-light/20 my-2" />
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-base font-medium text-artDark">Total</span>
                <span className="font-serif text-2xl text-artDark font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Proceeding to checkout workflow...")}
              className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
