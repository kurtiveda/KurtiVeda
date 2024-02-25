/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Categories, ProductType } from "@/types";
import { ProdCards } from "./ProdCards";
import Image from "next/image";
import ProductImage from "./ProductImage";

const AllProducts = async ({ products }: { products: ProductType[] }) => {
  return (
    <div className="">
      <div className="flex justify-center items-center flex-row w-full">
        <div className=" rounded-xl xsPhone:grid tablet:grid w-full phone:grid-cols-2 h-fit tablet:grid-cols-3 laptop:grid-cols-4 xsPhone:grid-cols-1 grid-rows-auto justify-center items-center  xsPhone:gap-[1rem] phone:gap-[1.45rem] tablet:gap-[2rem] px-6 flex-wrap">
          {products?.map((prod) => {
            return (
              <>
                <div
                  className="flex flex-col hover:scale-105 max-w-fit justify-center items-center transition ease-in-out"
                  key={prod._id}>
                  <ProductImage
                    imageUrl={prod.productMedia.map((p) => p.asset.url)}
                    prodId={prod._id}
                  />
                  <div className=" w-full rounded-xl p-4 pl-4 text-center">
                    <div className="font-lato" key={prod._id}>
                      <h1 className="tablet:text-[14px] font-medium phone:text-xs">
                        {prod.Title}
                      </h1>
                    </div>
                    <p className="font-lato text-sm font-bold mt-1">
                      ₹ {prod.Price}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
