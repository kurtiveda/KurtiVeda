/* eslint-disable @next/next/no-img-element */
import { getProductById } from "@/sanity/sanity.query";
import React from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { auth } from "@/auth";
async function CartCards({
  id,
  size,
  quantity,
}: {
  id: string;
  size: string;
  quantity: number;
}) {
  const product = await getProductById(id);
  const session = await auth();
  // console.log(product);
  return (
    <div className="border flex  justify-center items-center">
      <div className="w-[20%] flex justify-center items-center">
        {
          <img
            src={product[0].productMedia[0].asset.url}
            alt={"assetURL"}
            className="object-contain tablet:w-[70%] xsPhone:w-full h-auto"
          />
        }
      </div>
      <div className="w-[70%]">
        <div>{product[0].Title}</div>
        <div>{product[0].Price}</div>
        <div>{size}</div>
        <div>{quantity}</div>
      </div>
      <div className="w-[10%]">
        <DeleteButton
          productId={product[0]._id}
          userId={session?.user?.id as string}
          size={size}
        />
      </div>
    </div>
  );
}

export default CartCards;
