/* eslint-disable @next/next/no-img-element */
import { getProductById } from "@/sanity/sanity.query";
import React from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { auth } from "@/auth";
import Link from "next/link";
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
    <>
      <div className="flex justify-center items-center relative h-fit tablet:gap-10 xsPhone:gap-4">
        <Link
          href={`${process.env.NEXT_PUBLIC_APP_URL}/collections/products/${product[0]._id}`}
          className="hover:scale-105 transition ease-in xsPhone:w-1/2 tablet:w-auto">
          <div className="w-full flex justify-start items-center">
            {
              <img
                src={product[0].productMedia[0].asset.url}
                alt={"assetURL"}
                className="object-contain tablet:w-fit xsPhone:w-fit tablet:h-[10rem] h-fit"
              />
            }
          </div>
        </Link>

        <div className="xsPhone:w-full tablet:w-[60%] tablet:h-[10rem] flex flex-col justify-center items-start gap-4">
          <div className="font-lato tracking-widest text-lg space-y-2">
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/collections/products/${product[0]._id}`}
              className="hover:text-[#A77737] transition hover:underline tablet:text-md xsPhone:text-sm">
              {product[0].Title}
            </Link>
            <div className="font-lato tracking-widest tablet:text-xs xsPhone:text-xs text-slate-500">
              {size}
            </div>
          </div>
          <div className="font-lato tracking-widest tablet:text-sm xsPhone:text-xs text-slate-500">
            Quantity: {quantity}
          </div>
          <DeleteButton
            productId={product[0]._id}
            userId={session?.user?.id as string}
            size={size}
          />
        </div>
        <div className="tablet:w-fit xsPhone:w-1/3">
          <div className="font-lato tracking-widest tablet:text-[16px] xsPhone:text-sm font-semibold">
            ₹ {product[0].Price}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCards;
