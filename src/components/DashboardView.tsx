"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag, DollarSign, ListFilter } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
}

export default function DashboardView() {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", title: "Blushing Serenade", price: 85.00, category: "Bouquets" },
    { id: "2", title: "Sylvan Gold Frame", price: 120.00, category: "Frames" },
    { id: "3", title: "Royal Celebration", price: 250.00, category: "Gift Hampers" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Bouquets");

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim()) return;

    const newProduct: Product = {
      id: Date.now().toString(),
      title: newTitle,
      price: parseFloat(newPrice) || 0,
      category: newCategory,
    };

    setProducts((prev) => [...prev, newProduct]);
    alert("Product added successfully!");
    setNewTitle("");
    setNewPrice("");
    setNewCategory("Bouquets");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 text-center lg:text-left">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/40 uppercase mb-2 block">
          Administrative Control
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-artDark font-light tracking-wide">
          Product Management Dashboard
        </h1>
        <div className="w-12 h-[2px] bg-artRose-dark/40 mt-4 mx-auto lg:mx-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Add New Product Form */}
        <div className="bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs">
          <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide mb-6 border-b border-artRose-light/20 pb-4">
            Add New Product
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Product Title
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="title"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Classic Crimson Roses"
                  className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Retail Price ($)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 75.00"
                  className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Collection Category
              </label>
              <div className="relative">
                <ListFilter className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="Bouquets">Bouquets</option>
                  <option value="Frames">Frames</option>
                  <option value="Gift Boxes">Gift Boxes</option>
                  <option value="Gift Hampers">Gift Hampers</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-artDark/40" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Create Product</span>
            </button>
          </form>
        </div>

        {/* Right Column: Product Inventory Table */}
        <div className="lg:col-span-2 bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
          <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide mb-6 border-b border-artRose-light/20 pb-4">
            Product Inventory
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-artRose-light/20">
                  <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50">Title</th>
                  <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50">Category</th>
                  <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-right">Price</th>
                  <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-artRose-light/10">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-artDark/40 italic">
                      No products found. Add a new product to populate inventory.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-artBg/30 transition-colors duration-150">
                      <td className="py-4 text-sm font-medium text-artDark">{product.title}</td>
                      <td className="py-4 text-sm text-artDark/60">{product.category}</td>
                      <td className="py-4 text-sm font-semibold text-artDark text-right">${product.price.toFixed(2)}</td>
                      <td className="py-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-artDark/40 hover:text-red-500 font-semibold uppercase tracking-wider transition-colors duration-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
