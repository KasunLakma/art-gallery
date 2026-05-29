"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

interface Product {
  title: string;
  price: string;
  category: string;
}

export default function ProductShop() {
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const products: Product[] = [
    { title: "Pastel Dreams Bouquet", price: "$85.00", category: "Bouquet" },
    { title: "Sylvan Gold Frame", price: "$120.00", category: "Frames" },
    { title: "Royal Celebration Hamper", price: "$250.00", category: "Hampers" },
  ];

  // Helper to normalize singular/plural differences by removing trailing 's' and lowercasing
  const norm = (str: string) => str.toLowerCase().replace(/s$/, "");

  const filteredProducts = products.filter((product) => {
    return (
      filter.toLowerCase() === "all" ||
      norm(product.category) === norm(filter)
    );
  });

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
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))
        ) : (
          filteredProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          ))
        )}
      </div>
    </div>
  );
}
