import client from "@/sanity/sanity.client";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { code, totalPrice, userId } = await req.json();
    const promoCode = await client.fetch(
      groq`*[_type == 'promoCode' && code == "${code}"][0]`
    );
    if (!promoCode) {
      return NextResponse.json({ error: "Promo code not found." });
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
      await prisma?.user.update({
        where: {
          id: userId,
        },
        data: {
          promoUsed: false,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
  } finally {
  }
}
