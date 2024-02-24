import { auth } from "@/auth";
import Header from "@/components/Header/Header";
import CartCheckout from "@/components/cart/CartCheckout";

import CartCards from "@/components/cart/cartCards";
import client from "@/sanity/sanity.client";
import { CartProduct, ProductType } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { LockIcon } from "lucide-react";
import { groq } from "next-sanity";
import { Router } from "next/router";
import React from "react";

async function page() {
  const session = await auth();
  const userId = session?.user?.id as string;

  if (!session) {
    return (
      <div>
        <Header />
        <hr />
        <p className="font-playfair text-4xl w-full text-center py-10">Cart</p>
        <div className="flex justify-center items-start laptop:flex-row xsPhone:flex-col uppercase font-lato tracking-wider text-muted-foreground/40">
          You Need to Login First <LockIcon />
        </div>
      </div>
    );
  }

  const products = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/cart/products`,
    {
      headers: {
        userId: userId,
      },
    }
  );
  if (products.data === "No products") {
    return (
      <div>
        <Header />
        <hr />
        <p className="font-playfair text-4xl w-full text-center py-10">Cart</p>
        <div className="flex justify-center items-start laptop:flex-row xsPhone:flex-col uppercase font-lato tracking-wider text-muted-foreground/40">
          Cart is Empty
        </div>
      </div>
    );
  }
  const productsData: [{ status: string; products: CartProduct[] }] =
    products.data;
  console.log(productsData[0]);

  async function getProductPriceById(productId: string) {
    const product = await client.fetch<ProductType>(
      groq`*[_type == "Products" && _id == "${productId}"][0]`
    );
    return product.Price;
  }

  async function calculateTotalCartPrice(cart: CartProduct[]) {
    let totalPrice = 0;

    for (const product of cart) {
      const productPrice = await getProductPriceById(product.id);
      console.log(productPrice);
      totalPrice += productPrice * product.Quantity;
    }

    console.log("tp:===", totalPrice);
    return totalPrice;
  }

  const totalPrice = await calculateTotalCartPrice(productsData[0]?.products);

  if (totalPrice === 0) {
    return (
      <div>
        <hr />
        <p className="font-playfair text-3xl w-full text-center py-10">
          Your Bag
        </p>
        <div className="flex justify-center items-start laptop:flex-row xsPhone:flex-col uppercase font-lato tracking-wider text-muted-foreground/40">
          Your Bag is Empty
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <hr />
      <div className="py-10">
        <p className="font-playfair text-3xl w-full text-center pb-10">
          Your Bag
        </p>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center laptop:items-start xsPhone:items-center laptop:flex-row xsPhone:flex-col laptop:w-[80%] xsPhone:w-[90%] gap-8">
            <div className="laptop:w-[70%] w-full">
              <hr className="mb-4" />
              {productsData[0]?.products?.map((product) => {
                return (
                  <>
                    <div className="">
                      <div key={product.id}>
                        <CartCards
                          id={product.id}
                          size={product.size}
                          quantity={product.Quantity}
                        />
                      </div>
                      <hr className="my-4" />
                    </div>
                  </>
                );
              })}
            </div>

            <div className="laptop:w-[40%] xsPhone:w-[95%] h-full sticky top-0 laptop:border-l laptop:pl-8">
              <CartCheckout totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
