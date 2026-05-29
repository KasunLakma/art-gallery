import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  name: string;
  description: string;
  href: string;
  span: string;
  gradient: string;
}

export default function BentoGrid() {
  const categories: Category[] = [
    {
      name: "Bouquets",
      description: "Handcrafted fresh and everlasting floral arrangements",
      href: "/shop?category=bouquets",
      span: "md:col-span-2",
      gradient: "from-artBg via-artRose-light/40 to-artRose/20",
    },
    {
      name: "Frames",
      description: "Preserved memories in premium glass and timber frames",
      href: "/shop?category=frames",
      span: "md:col-span-1",
      gradient: "from-artRose-light/30 via-artRose-light/50 to-artRose/15",
    },
    {
      name: "Gift Boxes",
      description: "Sleek curated boxes filled with personalized premium delights",
      href: "/shop?category=gift-boxes",
      span: "md:col-span-1",
      gradient: "from-artBg via-artRose-light/20 to-artRose-light/50",
    },
    {
      name: "Gift Hampers",
      description: "Grand luxury collections curated for the ultimate celebrations",
      href: "/shop?category=gift-hampers",
      span: "md:col-span-2",
      gradient: "from-artRose-light/40 via-artRose/20 to-artRose-dark/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-6 md:px-12">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className={`group relative flex flex-col justify-between p-8 md:p-10 rounded-2xl border border-artRose-light/30 bg-gradient-to-br ${category.gradient} ${category.span} min-h-[260px] md:min-h-[300px] transition-all duration-500 ease-out hover:shadow-xl hover:shadow-artRose/10 hover:border-artRose-dark/20 hover:-translate-y-1`}
        >
          {/* Subtle decorative background shimmer */}
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-artDark/40 font-semibold mb-2 block">
              Collection
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-artDark font-light tracking-wide mb-3 group-hover:text-artRose-dark transition-colors duration-300">
              {category.name}
            </h3>
            <p className="text-sm md:text-base text-artDark/60 max-w-md font-light leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-artDark/5 w-fit">
            <span className="text-xs md:text-sm font-medium tracking-wider text-artDark uppercase group-hover:text-artRose-dark transition-colors duration-300">
              View Collection
            </span>
            <ArrowRight className="w-4 h-4 text-artDark group-hover:text-artRose-dark group-hover:translate-x-1.5 transition-all duration-300" />
          </div>
        </Link>
      ))}
    </div>
  );
}
