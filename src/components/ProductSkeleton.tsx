import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-artRose-light/10 p-5 space-y-4 animate-pulse">
      {/* Image block placeholder */}
      <div className="w-full aspect-square bg-zinc-200/60 rounded-xl" />

      {/* Info block placeholders */}
      <div className="space-y-3">
        {/* Category tag */}
        <div className="h-2 bg-zinc-200/40 rounded-full w-1/4" />
        {/* Title */}
        <div className="h-4 bg-zinc-200/70 rounded-full w-3/4" />
        {/* Price */}
        <div className="h-3 bg-zinc-200/50 rounded-full w-1/3" />
      </div>

      {/* Button placeholder */}
      <div className="pt-3 border-t border-zinc-100">
        <div className="h-3 bg-zinc-200/30 rounded-full w-1/2" />
      </div>
    </div>
  );
}
