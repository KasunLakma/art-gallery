import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, totalAmount, items } = body;

    // Validation checks
    if (!customerName || typeof customerName !== "string") {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!customerEmail || typeof customerEmail !== "string") {
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 });
    }
    if (totalAmount === undefined || typeof totalAmount !== "number" || totalAmount < 0) {
      return NextResponse.json({ error: "Total amount is required and must be non-negative" }, { status: 400 });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart items are required and cannot be empty" }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        totalAmount,
        items,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
