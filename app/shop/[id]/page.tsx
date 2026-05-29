import React from "react";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="pt-12 md:pt-24 pb-20 min-h-screen bg-artBg">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-6">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-artDark/30 uppercase">
          Product Reference: {id}
        </span>
      </div>
      <ProductDetailView />
    </main>
  );
}
