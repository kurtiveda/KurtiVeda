import client from "@/sanity/sanity.client";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/index";

export async function POST(req: NextRequest, res: NextResponse) {
  const { code, totalPrice, userId } = await req.json();
  try {
    const promoCode = await client.fetch(
      groq`*[_type == 'promoCode' && code == "${code}"][0]`
    );
    if (!promoCode) {
      return NextResponse.json({ error: "Promo code not found." });
    }
    if (promoCode.basePrice > totalPrice) {
      return NextResponse.json({
        error: `Minimum Value must be: ${promoCode.basePrice}`,
      });
    }
    if (
      promoCode.expirationDate &&
      new Date(promoCode.expirationDate) < new Date()
    ) {
      return NextResponse.json({ error: "Promo code has expired." });
    }

    if (promoCode.usageLimit && promoCode.usageLimit <= 0) {
      return NextResponse.json({
        error: "Promo code has reached its usage limit.",
      });
    }

    const userPromo = await prisma?.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        promoUsed: true,
      },
    });

    if (userPromo?.promoUsed === true && promoCode.usageLimit === 1) {
      return NextResponse.json({
        error: "You have Already Used this Promo Code",
      });
    }

    // Apply discount logic based on discount type
    let discountedPrice = 0;

    if (promoCode.discountType === "amount") {
      discountedPrice = totalPrice - promoCode.discountValue;
    } else if (promoCode.discountType === "percentage") {
      discountedPrice =
        totalPrice - (totalPrice * promoCode.discountValue) / 100;
    }

    // Ensure discounted price is not negative
    discountedPrice = Math.max(0, discountedPrice);

    return NextResponse.json({ success: true, discountedPrice });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Promo Error" });
  } finally {
  }
}
