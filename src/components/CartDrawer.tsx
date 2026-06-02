"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/src/context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  if (!isOpen) return null;

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      showToast("Please fill in Name, Email, Phone, and Delivery Address", "error");
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
          customerPhone: customerPhone.trim(),
          deliveryAddress: deliveryAddress.trim(),
          deliveryInstructions: deliveryInstructions.trim() || null,
          totalAmount,
          items: cart.map(item => ({
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
        // Delay clearing and closing slightly so the user sees the success toast
        setTimeout(() => {
          clearCart();
          setCustomerName("");
          setCustomerEmail("");
          setCustomerPhone("");
          setDeliveryAddress("");
          setDeliveryInstructions("");
          onClose();
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
    <div className="fixed inset-0 z-55 flex justify-end">
      {/* Dark blurred backdrop overlay */}
      <div className="absolute inset-0 bg-artDark/40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {/* Slide-over panel from right */}
      <div className="fixed top-0 right-0 h-full h-screen w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-slide-left transition-all duration-300">
        
        {/* Toast Notification inside Drawer */}
        {toast && (
          <div className="absolute top-6 left-6 right-6 z-55 flex items-center gap-3 bg-white/95 backdrop-blur-md border border-artRose-light/40 shadow-xl rounded-2xl px-5 py-3.5 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className={`w-2 h-2 rounded-full ${toast.type === "success" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
            <span className="text-xs font-medium text-artDark">{toast.message}</span>
          </div>
        )}

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
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-artDark/40 italic">Your bag is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center py-3 border-b border-artBg">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-artBg flex-shrink-0 flex items-center justify-center font-serif text-[8px] italic text-artDark/30">
                    No Image
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-serif text-artDark font-light truncate">{item.name}</h4>
                  <p className="text-xs text-artDark/50">${item.price.toFixed(2)} • Qty {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  disabled={isCheckingOut}
                  className="text-xs text-artDark/40 hover:text-red-500 font-semibold uppercase transition-colors disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout customer inputs */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-artRose-light/10 bg-artBg/10 space-y-4">
            <h4 className="font-serif text-xs text-artDark font-medium uppercase tracking-wider mb-2">
              Delivery Information
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
                  className="w-full bg-white/80 border border-artRose-light/60 rounded-xl px-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50"
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
                  className="w-full bg-white/80 border border-artRose-light/60 rounded-xl px-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="customerPhone" className="block text-[10px] font-semibold uppercase tracking-wider text-artDark/50 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  required
                  disabled={isCheckingOut}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 019-2834"
                  className="w-full bg-white/80 border border-artRose-light/60 rounded-xl px-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="deliveryAddress" className="block text-[10px] font-semibold uppercase tracking-wider text-artDark/50 mb-1.5">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  required
                  disabled={isCheckingOut}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. 123 Gallery Lane, Suite 4B"
                  className="w-full bg-white/80 border border-artRose-light/60 rounded-xl px-4 py-2.5 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="deliveryInstructions" className="block text-[10px] font-semibold uppercase tracking-wider text-artDark/50 mb-1.5">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  disabled={isCheckingOut}
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="e.g. Leave at front desk / ring bell twice..."
                  rows={2}
                  className="w-full bg-white/80 border border-artRose-light/60 rounded-xl px-4 py-2 text-xs text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 disabled:opacity-50 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border-t border-artRose-light/20 bg-artBg/30">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-sm text-artDark/60">Subtotal</span>
            <span className="text-lg font-semibold text-artDark">${totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || isCheckingOut}
            className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isCheckingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            <span>{isCheckingOut ? "Processing..." : "Place Order"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
