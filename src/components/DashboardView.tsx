"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Tag, DollarSign, ListFilter, FileText, Image as ImageIcon, Loader2, Search, MessageSquare } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
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

  // Administrative dashboard states
  const [activeTab, setActiveTab] = useState<"inventory" | "orders" | "inquiries">("inventory");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [ordersSearch, setOrdersSearch] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Inquiries states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isInquiriesLoading, setIsInquiriesLoading] = useState(true);
  const [inquiriesSearch, setInquiriesSearch] = useState("");

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

  const fetchOrders = async () => {
    setIsOrdersLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        showToast("Failed to load customer orders", "error");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      showToast("Error connecting to order API", "error");
    } finally {
      setIsOrdersLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setIsInquiriesLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      } else {
        showToast("Failed to load customer inquiries", "error");
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      showToast("Error connecting to inquiry API", "error");
    } finally {
      setIsInquiriesLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        showToast("Inquiry marked as resolved", "success");
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to resolve inquiry", "error");
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      showToast("Network error resolving inquiry", "error");
    }
  };

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "inquiries") {
      fetchInquiries();
    }
  }, [activeTab]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? updatedOrder : o))
        );
        showToast(`Order status updated to ${newStatus}`, "success");
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to update order status", "error");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      showToast("Network error updating order status", "error");
    } finally {
      setUpdatingOrderId(null);
    }
  };

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

  // Filter orders based on name or email
  const filteredOrders = orders.filter((order) => {
    const searchLower = ordersSearch.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower)
    );
  });

  const filteredInquiries = inquiries.filter((inquiry) => {
    const searchLower = inquiriesSearch.toLowerCase();
    return (
      inquiry.name.toLowerCase().includes(searchLower) ||
      inquiry.email.toLowerCase().includes(searchLower) ||
      inquiry.subject.toLowerCase().includes(searchLower) ||
      inquiry.message.toLowerCase().includes(searchLower)
    );
  });

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "PROCESSING":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default: // PENDING
        return "bg-amber-50 text-amber-700 border-amber-200/60";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/95 backdrop-blur-md border border-artRose-light/40 shadow-2xl rounded-2xl px-6 py-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`w-2.5 h-2.5 rounded-full ${toast.type === "success" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
          <span className="text-sm font-medium text-artDark">{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/40 uppercase mb-2 block">
          Administrative Control
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-artDark font-light tracking-wide">
          Admin Management Dashboard
        </h1>
        <div className="w-12 h-[2px] bg-artRose-dark/40 mt-4 mx-auto lg:mx-0" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-artRose-light/40 mb-10 gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("inventory")}
          className={`pb-4 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative cursor-pointer outline-none ${
            activeTab === "inventory"
              ? "text-artDark font-bold"
              : "text-artDark/40 hover:text-artDark/70"
          }`}
        >
          <span>Inventory Management</span>
          {activeTab === "inventory" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-artRose-dark animate-in fade-in zoom-in-75 duration-300" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`pb-4 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative cursor-pointer outline-none ${
            activeTab === "orders"
              ? "text-artDark font-bold"
              : "text-artDark/40 hover:text-artDark/70"
          }`}
        >
          <span>Order Management</span>
          {activeTab === "orders" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-artRose-dark animate-in fade-in zoom-in-75 duration-300" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("inquiries")}
          className={`pb-4 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative cursor-pointer outline-none ${
            activeTab === "inquiries"
              ? "text-artDark font-bold"
              : "text-artDark/40 hover:text-artDark/70"
          }`}
        >
          <span>Customer Inquiries</span>
          {activeTab === "inquiries" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-artRose-dark animate-in fade-in zoom-in-75 duration-300" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "inventory" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start animate-in fade-in duration-300">
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
      )}

      {activeTab === "orders" && (
        <div className="bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden animate-in fade-in duration-300">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-artRose-light/20 pb-4">
            <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide">
              Customer Order Fulfillment
            </h3>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by customer name or email..."
                value={ordersSearch}
                onChange={(e) => setOrdersSearch(e.target.value)}
                className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {isOrdersLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-8 h-8 text-artRose animate-spin" />
                <span className="text-sm text-artDark/50">Loading database orders...</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-artRose-light/20">
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50">Customer & Items</th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-right">Total Amount</th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-center">Order Date</th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-center">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-artRose-light/10">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-sm text-artDark/40 italic">
                        {ordersSearch ? "No orders matches your search filters." : "No customer orders found in the database."}
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-artBg/30 transition-colors duration-150">
                        <td className="py-5 text-sm text-artDark">
                          <p className="font-semibold">{order.customerName}</p>
                          <p className="text-artDark/50 text-xs">{order.customerEmail}</p>
                          <p className="text-[10px] text-artRose font-medium mt-1 uppercase tracking-wide">
                            {(() => {
                              try {
                                const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                                if (!Array.isArray(items)) return 'No items';
                                return items.map(i => `${i.quantity || 1}x ${i.name || 'Unknown'}`).join(', ');
                              } catch (e) {
                                return 'Error loading items';
                              }
                            })()}
                          </p>
                        </td>
                        <td className="py-5 text-sm font-semibold text-artDark text-right">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-5 text-xs text-artDark/60 text-center">
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-5 text-center">
                          <div className="flex items-center justify-center">
                            <div className={`inline-flex items-center relative border rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${getStatusStyle(order.status)}`}>
                              {updatingOrderId === order.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1 text-current" />
                              ) : null}
                              <select
                                value={order.status}
                                disabled={updatingOrderId === order.id}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="bg-transparent appearance-none pr-5 outline-none cursor-pointer uppercase font-bold text-[10px] tracking-wider border-none focus:ring-0 disabled:cursor-not-allowed"
                              >
                                <option value="PENDING" className="bg-white text-amber-700">Pending</option>
                                <option value="PROCESSING" className="bg-white text-blue-700">Processing</option>
                                <option value="DELIVERED" className="bg-white text-emerald-700">Delivered</option>
                                <option value="CANCELLED" className="bg-white text-rose-700">Cancelled</option>
                              </select>
                              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[3.5px] border-r-[3.5px] border-t-[4.5px] border-transparent border-t-current" />
                            </div>
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
      )}

      {activeTab === "inquiries" && (
        <div className="bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden animate-in fade-in duration-300">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-artRose-light/20 pb-4">
            <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide">
              Customer Inquiries
            </h3>
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-artDark/30 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={inquiriesSearch}
                onChange={(e) => setInquiriesSearch(e.target.value)}
                className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl pl-11 pr-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {isInquiriesLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="w-8 h-8 text-artRose animate-spin" />
                <span className="text-sm text-artDark/50">Loading database inquiries...</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-artRose-light/20">
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 w-1/4">Sender</th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 w-1/2">Inquiry Content</th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-center w-1/6">Date</th>
                    <th className="pb-4 text-xs font-semibold uppercase tracking-wider text-artDark/50 text-center w-1/12">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-artRose-light/10">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-sm text-artDark/40 italic">
                        {inquiriesSearch ? "No inquiries matches your search filters." : "No customer inquiries found."}
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-artBg/30 transition-colors duration-150 align-top">
                        <td className="py-5 text-sm text-artDark pr-4">
                          <p className="font-semibold">{inquiry.name}</p>
                          <p className="text-artDark/50 text-xs mt-0.5">{inquiry.email}</p>
                        </td>
                        <td className="py-5 text-sm text-artDark pr-4">
                          <p className="font-medium text-artRose-dark">{inquiry.subject}</p>
                          <p className="text-artDark/80 text-xs mt-1 whitespace-pre-wrap">{inquiry.message}</p>
                        </td>
                        <td className="py-5 text-xs text-artDark/60 text-center">
                          {new Date(inquiry.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-5 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            className="inline-flex items-center gap-1.5 text-xs text-artDark/40 hover:text-red-500 font-semibold uppercase tracking-wider transition-colors duration-200"
                            title="Resolve Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Resolve</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
