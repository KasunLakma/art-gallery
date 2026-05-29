"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductShop() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Bouquets", "Hampers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 ${
              filter === tab
                ? "bg-artDark text-white shadow-sm"
                : "bg-artBg text-artDark/60 hover:text-artDark hover:bg-artRose-light/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProductCard title="Pastel Dreams Bouquet" price="$85.00" category="Bouquets" />
        <ProductCard title="Sylvan Gold Frame" price="$120.00" category="Frames" />
        <ProductCard title="Royal Celebration Hamper" price="$250.00" category="Hampers" />
      </div>
    </div>
  );
}
