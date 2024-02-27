import { NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import { headers } from "next/headers";

export async function GET() {
  const userId = headers().get("userId")!;
  try {
    const orders = await prisma?.orders.findMany({
      where: {
        userId: userId,
      },
      select: {
        orders: true,
      },
    });

    return NextResponse.json(orders);
  } catch (err) {
    console.log("Error", err);
  }
}
