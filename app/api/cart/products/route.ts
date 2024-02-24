import { auth } from "@/auth";
import {
  addProduct,
  checkCartExists,
  createCart,
  getProducts,
  removeProductById,
} from "@/controller/products";
import { CartProduct } from "@/types";

import { prisma } from "@/prisma/index";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const userId = headers().get("userId");
  // const { userId } = await req.json();
  try {
    const { id, name, price, Quantity, size }: CartProduct = await req.json();

    const isCartPresent = await checkCartExists(userId as string);

    console.log("isCartPresent", isCartPresent);

    if (isCartPresent) {
      const existingCart = await prisma?.carts.findUnique({
        where: {
          userId: userId as string,
          cart: {
            some: {
              status: "IN_CART",
            },
          },
        },
      });
      if (existingCart) {
        const resp = await addProduct(userId as string, {
          id,
          name,
          price,
          Quantity,
          size,
        });
        return NextResponse.json(resp);
      } else {
        const resp = await prisma?.carts.update({
          where: {
            userId: userId as string,
          },
          data: {
            cart: {
              push: {
                status: "IN_CART",
                products: {
                  id,
                  name,
                  price,
                  Quantity,
                  size,
                },
              },
            },
          },
        });
        console.log("new Cart", resp);
        return NextResponse.json(resp);
      }
    }

    const resp = await createCart(userId as string, {
      id,
      name,
      price,
      Quantity,
      size,
    });
    return NextResponse.json(resp);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}

export async function GET(req: NextRequest) {
  const userId = headers().get("userId");
  try {
    // const session = await auth();

    const products = await getProducts(userId as string);
    console.log("product in cart ", products);
    if (products?.length === 0 || products === undefined) {
      return NextResponse.json("No products");
    }
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json(err);
  } finally {
  }
}

export async function DELETE(req: NextRequest) {
  const userId = headers().get("userId");
  const productId = headers().get("productId");
  const size = headers().get("size");
  try {
    // const session = await auth();

    console.log("size:", size);

    const products = await removeProductById(productId!, userId!, size!);
    console.log("product in cart after removing ", products);
    if (
      products?.cart.filter((c) => c.products.length === 0) ||
      products === undefined
    ) {
      return NextResponse.json("No products");
    }
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  } finally {
  }
}
