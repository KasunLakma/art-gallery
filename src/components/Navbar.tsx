"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/src/context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state based on current scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
    { name: "Track Order", href: "/customer-dashboard" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl tracking-wide text-artDark hover:opacity-80 transition-opacity"
        >
          Art Gallery
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-artRose-dark ${
                  isActive ? "text-artRose-dark font-semibold" : "text-artDark/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-artDark/70 hover:text-artRose-dark transition-colors duration-200 cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-artRose-light border border-artRose/30 text-artRose-dark text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-artDark/70 hover:text-artRose-dark transition-colors duration-200 cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-artRose-light border border-artRose/30 text-artRose-dark text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-artDark focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Slide-down mobile drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 transform scale-y-100 max-h-[300px] visible"
            : "opacity-0 transform scale-y-95 max-h-0 invisible pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 transition-colors duration-200 ${
                  isActive
                    ? "text-artRose-dark font-semibold border-l-2 border-artRose-dark pl-3"
                    : "text-artDark/70 hover:text-artRose-dark pl-3"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
