import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, category } = body;

    // Validation checks
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required and must be a string" }, { status: 400 });
    }
    if (price === undefined || typeof price !== "number" || price < 0) {
      return NextResponse.json({ error: "Price is required and must be a non-negative number" }, { status: 400 });
    }
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "Image URL is required and must be a string" }, { status: 400 });
    }
    if (!category || typeof category !== "string") {
      return NextResponse.json({ error: "Category is required and must be a string" }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        category,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
