import React from "react";
import CartView from "@/components/CartView";

export const metadata = {
  title: "Your Shopping Bag | Art Gallery",
  description: "Review your curated selection of luxury keepsakes and proceed to checkout.",
};

export default function CartPage() {
  return (
    <main className="pt-12 md:pt-24 pb-24 min-h-screen bg-artBg">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center pt-8">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/50 uppercase mb-3 block">
          Your Selection
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-artDark font-light tracking-wide mb-4">
          Shopping Bag
        </h1>
        <div className="w-12 h-[2px] bg-artRose-dark/40 mx-auto" />
      </div>
      <CartView />
    </main>
  );
}
