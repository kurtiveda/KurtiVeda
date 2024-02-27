import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";

export async function GET() {
  try {
    const orders = await prisma?.orders.findMany({
      select: {
        userId: true,
        orders: true,
      },
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.log("Error", err);
  }
}
