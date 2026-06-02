import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
  };

  return (
    <main className="pt-12 md:pt-24 pb-20 min-h-screen bg-artBg">
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-6">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-artDark/30 uppercase">
          Collection Ref: {id}
        </span>
      </div>
      <ProductDetailView product={serializedProduct} />
    </main>
  );
}
