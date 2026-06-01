"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

export default function CartView() {
  const { cart: items, removeFromCart: removeItem, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.00;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      showToast("Please provide your name and email", "error");
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          totalAmount: total,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            category: item.category,
          })),
        }),
      });

      if (res.status === 201) {
        showToast("Order placed successfully!", "success");
        setTimeout(() => {
          clearCart();
          setCustomerName("");
          setCustomerEmail("");
        }, 1500);
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Failed to place order", "error");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      showToast("Network error placing order", "error");
    } finally {
      setIsCheckingOut(false);
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
                  {/* Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-artBg border border-artRose-light/10 flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif italic text-artDark/30 text-[10px]">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] tracking-[0.15em] font-semibold text-artDark/40 uppercase block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base md:text-lg text-artDark font-light truncate mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-artDark/50 mb-2">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={isCheckingOut}
                      className="inline-flex items-center gap-1.5 text-xs text-artDark/40 hover:text-red-500 font-semibold uppercase tracking-wider transition-colors duration-200 disabled:opacity-50"
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
          <div className="bg-white border border-artRose-light/30 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide border-b border-artRose-light/20 pb-4">
                Order Summary
              </h3>
            </div>
            
            <div className="space-y-4">
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

            {/* Delivery Inputs */}
            <div className="border-t border-artRose-light/10 pt-4 space-y-4">
              <h4 className="font-serif text-xs text-artDark font-medium uppercase tracking-wider">
                Delivery Details
              </h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="customerName" className="block text-[10px] font-semibold uppercase tracking-wider text-artDark/50 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    required
                    disabled={isCheckingOut}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="customerEmail" className="block text-[10px] font-semibold uppercase tracking-wider text-artDark/50 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    required
                    disabled={isCheckingOut}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. jane@example.com"
                    className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isCheckingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>{isCheckingOut ? "Processing..." : "Place Order"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
