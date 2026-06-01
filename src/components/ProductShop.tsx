"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { useCart } from "@/src/context/CartContext";

interface DatabaseProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
}

export default function ProductShop() {
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();
  const [products, setProducts] = useState<DatabaseProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Failed to load products from database API");
        }
      } catch (err) {
        console.error("Error fetching products from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

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
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-2 p-1.5 bg-white/40 backdrop-blur-sm border border-white/40 rounded-full">
          {["All", "Bouquets", "Hampers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300 ${
                filter === tab
                  ? "bg-artDark text-white shadow-sm"
                  : "bg-transparent text-artDark/60 hover:text-artDark hover:bg-white/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-sm text-artDark/40 italic">
            No products found in this category.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              price={`$${product.price.toFixed(2)}`}
              category={product.category}
              image={product.image}
              onAddToCart={() => addToCart(product)}
            />
          ))
        )}
      </div>
    </div>
  );
}
