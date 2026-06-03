import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-artBg flex flex-col font-sans antialiased text-artDark">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-artRose-light/20 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-artRose flex items-center justify-center text-white shadow-xs">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-light tracking-wide text-artDark">
                Art Gallery
              </span>
              <span className="text-[10px] tracking-[0.15em] font-semibold px-2 py-0.5 rounded-full bg-artRose-light/40 text-artRose-dark uppercase border border-artRose-light/60">
                Admin Panel
              </span>
            </div>
          </div>

          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-artRose/30 bg-white hover:bg-artBg hover:border-artRose-dark text-xs md:text-sm font-medium text-artDark transition-all duration-300 ease-out hover:scale-[1.02] active:scale-98 shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-artDark/70 transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
              <span>Go to Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
