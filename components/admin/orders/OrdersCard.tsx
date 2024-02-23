/* eslint-disable @next/next/no-img-element */
"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductById } from "@/sanity/sanity.query";
import { ProductType } from "@/types";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

function OrdersCard({
  id,
  size,
  quantity,
}: {
  id: string;
  size: string;
  quantity: number;
}) {
  const [product, setProduct] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => setLoading(true), []);

  getProductById(id).then((prod) => {
    setProduct(prod);
    setLoading(false);
  });
  if (product) {
    return (
      <div className=" flex  justify-center items-center">
        <div className="w-[30%] flex justify-center items-center">
          {
            <img
              src={product[0].productMedia[0].asset.url}
              alt={"assetURL"}
              className="object-contain tablet:w-[70%] xsPhone:w-full h-auto rounded-xl"
            />
          }
        </div>
        <div className="w-[70%]">
          <div>{product[0].Title}</div>
          <div>{product[0].Price}</div>
          <div>{size}</div>
          <div>{quantity}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center space-y-4">
      {loading ? (
        <Skeleton className="h-20 w-full" />
      ) : (
        <p>No Products Found</p>
      )}
    </div>
  );
}

export default OrdersCard;
