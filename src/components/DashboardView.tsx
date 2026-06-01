"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Tag, DollarSign, ListFilter, FileText, Image as ImageIcon, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
}

export default function DashboardView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Bouquets");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          showToast("Failed to load inventory products", "error");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        showToast("Error connecting to database API", "error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = (id: string) => {
    // Since we don't have a DELETE API endpoint configured, we filter locally.
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("Product removed from view (local state only)", "success");
    if (editingProduct?.id === id) {
      handleCancelEdit();
    }
  };

  const handleStartEdit = (product: Product) => {
    setEditingProduct(product);
    setNewName(product.name);
    setNewPrice(product.price.toString());
    setNewCategory(product.category);
    setNewDescription(product.description);
    setNewImage(product.image);
    // Smooth scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewName("");
    setNewPrice("");
    setNewCategory("Bouquets");
    setNewDescription("");
    setNewImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim() || !newDescription.trim() || !newImage.trim()) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingProduct) {
        // UPDATE MODE (PUT)
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingProduct.id,
            name: newName,
            description: newDescription,
            price: parseFloat(newPrice) || 0,
            image: newImage,
            category: newCategory,
          }),
        });

        if (res.status === 200) {
          const updatedProduct = await res.json();
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
          );
          showToast("Product updated successfully in Neon DB!", "success");
          handleCancelEdit();
        } else {
          const errorData = await res.json();
          showToast(errorData.error || "Failed to update product", "error");
        }
      } else {
        // CREATE MODE (POST)
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            description: newDescription,
            price: parseFloat(newPrice) || 0,
            image: newImage,
            category: newCategory,
          }),
        });

        if (res.status === 201) {
          const newProduct = await res.json();
          setProducts((prev) => [newProduct, ...prev]);
          showToast("Product created and saved to Neon DB!", "success");
          setNewName("");
          setNewPrice("");
          setNewDescription("");
          setNewImage("");
          setNewCategory("Bouquets");
        } else {
          const errorData = await res.json();
          showToast(errorData.error || "Failed to create product", "error");
        }
      }
    } catch (err) {
      console.error("Error saving product:", err);
      showToast("Network error saving product", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-artRose-light/40 shadow-2xl rounded-2xl px-6 py-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === "success" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
          <span className="text-sm font-medium text-artDark">{toast.message}</span>
        </div>
      )}

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
        {/* Left Column: Add/Edit Product Form */}
        <div className="bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs">
          <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide mb-6 border-b border-artRose-light/20 pb-4">
            {editingProduct ? "Edit Product Details" : "Add New Product"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Product Title / Name
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="name"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Classic Crimson Roses"
                  className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-artDark/30 absolute left-4 top-4" />
                <textarea
                  id="description"
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="A detailed description of this artisan product..."
                  rows={3}
                  className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30 resize-none"
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
              <label htmlFor="image" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Image URL
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  id="image"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="e.g. https://images.unsplash.com/photo-..."
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

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingProduct ? (
                  <span className="text-sm">💾</span>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>
                  {isSubmitting
                    ? editingProduct
                      ? "Updating..."
                      : "Creating..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </span>
              </button>

              {editingProduct && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full bg-transparent border border-artDark/20 text-artDark font-medium tracking-wider uppercase py-3 rounded-full hover:bg-artBg hover:text-artDark flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Product Inventory Table */}
        <div className="lg:col-span-2 bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
          <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide mb-6 border-b border-artRose-light/20 pb-4">
            Product Inventory
          </h3>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="w-8 h-8 text-artRose animate-spin" />
                <span className="text-sm text-artDark/50">Loading database inventory...</span>
              </div>
            ) : (
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
                        <td className="py-4 text-sm font-medium text-artDark">{product.name}</td>
                        <td className="py-4 text-sm text-artDark/60">{product.category}</td>
                        <td className="py-4 text-sm font-semibold text-artDark text-right">${product.price.toFixed(2)}</td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(product)}
                              className="inline-flex items-center gap-1.5 text-xs text-artDark/40 hover:text-artRose-dark font-semibold uppercase tracking-wider transition-colors duration-200"
                            >
                              <span>Edit</span>
                            </button>
                            <span className="text-artDark/10">|</span>
                            <button
                              type="button"
                              onClick={() => handleDelete(product.id)}
                              className="inline-flex items-center gap-1.5 text-xs text-artDark/40 hover:text-red-500 font-semibold uppercase tracking-wider transition-colors duration-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
