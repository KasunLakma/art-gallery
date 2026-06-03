"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  User, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  LogOut, 
  ChevronDown, 
  ChevronUp, 
  Loader2,
  Mail,
  Truck,
  AlertCircle
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryInstructions: string | null;
  totalAmount: number;
  status: string;
  items: any; // JSON array from database
  createdAt: string;
}

export default function CustomerDashboardPage() {
  const [emailInput, setEmailInput] = useState("");
  const [simulatedEmail, setSimulatedEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Load simulated session from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("simulated_customer_email");
    if (savedEmail) {
      setSimulatedEmail(savedEmail);
      setEmailInput(savedEmail);
      fetchOrders(savedEmail);
    }
  }, []);

  const fetchOrders = async (email: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/customer/orders?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to retrieve order history.");
      }
    } catch (err) {
      setError("An error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    const formattedEmail = emailInput.trim().toLowerCase();
    localStorage.setItem("simulated_customer_email", formattedEmail);
    setSimulatedEmail(formattedEmail);
    fetchOrders(formattedEmail);
  };

  const handleSignOut = () => {
    localStorage.removeItem("simulated_customer_email");
    setSimulatedEmail(null);
    setEmailInput("");
    setOrders([]);
    setError("");
  };

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "bg-green-50 text-green-700 border-green-200/60";
      case "SHIPPED":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200/60";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200/60";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate statistics
  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const completedOrders = orders.filter(o => o.status.toUpperCase() === "DELIVERED").length;

  return (
    <main className="min-h-screen bg-artBg pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-artRose-light/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-artRose/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Not Signed In State */}
        {!simulatedEmail ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-md bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-300">
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-artRose-light/40 flex items-center justify-center text-artRose-dark mb-4">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/40 uppercase mb-2">
                  Client Portal
                </span>
                <h1 className="font-serif text-2xl md:text-3xl text-artDark font-light tracking-wide text-center">
                  Customer Dashboard
                </h1>
                <p className="text-xs text-artDark/50 text-center mt-2 font-light">
                  Enter your email address to access your order history and track shipments.
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-artDark/30" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full bg-white/70 focus:bg-white border border-artRose-light/80 rounded-xl pl-11 pr-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-50 border border-red-200/50 rounded-lg p-3 justify-center">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          
          /* Signed In/Simulated Session State */
          <div className="space-y-8">
            
            {/* Dashboard Header Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl p-6 md:p-8 shadow-sm">
              <div>
                <span className="text-xs tracking-[0.2em] font-semibold text-artRose-dark uppercase mb-1 block">
                  Welcome Back
                </span>
                <h1 className="font-serif text-2xl md:text-3xl text-artDark font-light tracking-wide">
                  {orders.length > 0 ? orders[0].customerName : "Customer Portal"}
                </h1>
                <p className="text-xs text-artDark/50 mt-1 flex items-center gap-2 font-light">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Simulated session: <span className="font-medium text-artDark/70">{simulatedEmail}</span>
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-xs font-semibold text-artDark/60 hover:text-red-500 bg-white/60 hover:bg-red-50 border border-artRose-light/40 hover:border-red-200/50 rounded-full px-4 py-2.5 transition-all duration-300 shadow-2xs hover:scale-102 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Account</span>
              </button>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/50 backdrop-blur-xs border border-white/40 rounded-2xl p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-3 text-artDark/40">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Purchases</span>
                  <ShoppingBag className="w-4 h-4 text-artRose" />
                </div>
                <div className="font-serif text-3xl text-artDark font-light">
                  {orders.length}
                </div>
                <p className="text-[10px] text-artDark/40 mt-1 font-light">Orders recorded under this email</p>
              </div>

              <div className="bg-white/50 backdrop-blur-xs border border-white/40 rounded-2xl p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-3 text-artDark/40">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Investment</span>
                  <DollarSign className="w-4 h-4 text-artRose" />
                </div>
                <div className="font-serif text-3xl text-artDark font-light">
                  ${totalSpent.toFixed(2)}
                </div>
                <p className="text-[10px] text-artDark/40 mt-1 font-light">Accumulated checkout transactions</p>
              </div>

              <div className="bg-white/50 backdrop-blur-xs border border-white/40 rounded-2xl p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-3 text-artDark/40">
                  <span className="text-xs font-semibold uppercase tracking-wider">Delivered Packages</span>
                  <CheckCircle className="w-4 h-4 text-artRose" />
                </div>
                <div className="font-serif text-3xl text-artDark font-light">
                  {completedOrders}
                </div>
                <p className="text-[10px] text-artDark/40 mt-1 font-light">Fulfillment complete</p>
              </div>
            </div>

            {/* Main Tabs Container */}
            <div className="bg-white/50 backdrop-blur-md border border-white/40 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="border-b border-artRose-light/30 pb-4 mb-6 flex items-center justify-between">
                <div className="flex gap-6">
                  <button className="text-sm font-semibold text-artDark border-b-2 border-artDark pb-4.5 -mb-5 tracking-wide">
                    My Purchase History
                  </button>
                </div>
                {loading && <Loader2 className="w-4 h-4 animate-spin text-artRose" />}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-50 border border-red-200/50 rounded-lg p-4 justify-center mb-6">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              {/* Order List */}
              {loading && orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-artDark/40 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-sm font-light">Retrieving transaction ledger...</span>
                </div>
              ) : orders.length === 0 ? (
                /* Empty Order State */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-artDark font-light">No Orders Found</h3>
                    <p className="text-xs text-artDark/50 max-w-sm mx-auto font-light leading-relaxed">
                      We couldn't find any checkout transaction history associated with this email. Explore our boutique gallery collections to get started.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-artDark text-white font-medium text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-artRose-dark transition-all duration-300 shadow-sm hover:scale-102 cursor-pointer"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                /* Active Order Cards */
                <div className="space-y-4">
                  {orders.map((order) => {
                    const isExpanded = expandedOrder === order.id;
                    const itemsList = order.items as unknown as OrderItem[];
                    
                    return (
                      <div 
                        key={order.id}
                        className="border border-artRose-light/30 rounded-2xl overflow-hidden bg-white/30 hover:bg-white/40 transition-all duration-300 shadow-3xs"
                      >
                        {/* Summary Header */}
                        <div 
                          onClick={() => toggleOrderExpand(order.id)}
                          className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                        >
                          <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8">
                            <div>
                              <span className="block text-[9px] font-semibold text-artDark/40 uppercase tracking-widest mb-1">
                                Order Reference
                              </span>
                              <span className="font-mono text-xs font-semibold text-artDark">
                                #{order.id.slice(0, 8).toUpperCase()}
                              </span>
                            </div>
                            
                            <div>
                              <span className="block text-[9px] font-semibold text-artDark/40 uppercase tracking-widest mb-1">
                                Date Purchased
                              </span>
                              <span className="text-xs font-medium text-artDark/80 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-artDark/30" />
                                {formatDate(order.createdAt)}
                              </span>
                            </div>

                            <div>
                              <span className="block text-[9px] font-semibold text-artDark/40 uppercase tracking-widest mb-1">
                                Total Price
                              </span>
                              <span className="text-xs font-semibold text-artDark flex items-center gap-0.5">
                                ${order.totalAmount.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-4 border-t border-artRose-light/20 pt-4 md:pt-0 md:border-none">
                            <div className="flex items-center gap-2">
                              <span className="block md:hidden text-[9px] font-semibold text-artDark/40 uppercase tracking-widest">
                                Status:
                              </span>
                              <span className={`text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full border ${getStatusStyle(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            
                            <div className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center text-artDark/50 border border-artRose-light/20">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Details */}
                        {isExpanded && (
                          <div className="bg-white/50 border-t border-artRose-light/20 p-5 md:p-6 space-y-6">
                            
                            {/* Items Grid */}
                            <div>
                              <h4 className="text-[10px] font-bold text-artDark/40 uppercase tracking-widest mb-4">
                                Package Contents
                              </h4>
                              <div className="space-y-4">
                                {itemsList && itemsList.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-artRose-light/10 last:border-none">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-lg bg-artRose-light/30 border border-artRose-light/30 flex items-center justify-center text-artDark/60 overflow-hidden font-serif italic text-xs">
                                        {item.image ? (
                                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                          item.name.charAt(0)
                                        )}
                                      </div>
                                      <div>
                                        <h5 className="text-xs font-semibold text-artDark">{item.name}</h5>
                                        <span className="text-[10px] text-artDark/40">Qty: {item.quantity}</span>
                                      </div>
                                    </div>
                                    <span className="text-xs font-medium text-artDark">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Delivery & Instructions Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-artRose-light/10">
                              <div>
                                <h4 className="text-[10px] font-bold text-artDark/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                  <Truck className="w-3.5 h-3.5" />
                                  Delivery Address
                                </h4>
                                <p className="text-xs text-artDark/70 font-light leading-relaxed">
                                  {order.deliveryAddress}
                                </p>
                                <p className="text-xs text-artDark/50 mt-1 font-light">
                                  Phone: {order.customerPhone}
                                </p>
                              </div>

                              <div>
                                <h4 className="text-[10px] font-bold text-artDark/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  Delivery Instructions
                                </h4>
                                <p className="text-xs text-artDark/70 font-light italic leading-relaxed">
                                  {order.deliveryInstructions || "No special instructions provided."}
                                </p>
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
