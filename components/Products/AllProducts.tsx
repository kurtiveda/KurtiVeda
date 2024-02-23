import React, { useEffect, useState } from "react";
import { Categories, ProductType } from "@/types";
import { ProdCards } from "./ProdCards";

const AllProducts = async ({ products }: { products: ProductType[] }) => {
  return (
    <div className="">
      <div className="flex justify-center items-center flex-row w-full">
        <div className=" rounded-xl xsPhone:flex tablet:flex phone:grid-cols-2 xsPhone:grid-cols-1 grid-rows-auto justify-center items-center  xsPhone:gap-[1rem] phone:gap-[1.45rem] tablet:gap-[2rem] flex-wrap">
          {products?.map((prod) => {
            return (
              <>
                <div
                  className="flex flex-col hover:scale-105 w-fit transition "
                  key={prod._id}>
                  <ProdCards
                    imageUrl={prod.productMedia.map((image) => {
                      return image.asset.url;
                    })}
                    imageClassName="object-contain rounded-bl-none rounded-br-none"
                    className="w-fit"
                    key={prod._id}
                    prodId={prod._id}></ProdCards>
                  <div
                    className=" w-full rounded-xl p-4 pl-4 text-center"
                    key={prod._id}>
                    <div className="font-lato" key={prod._id}>
                      <h1
                        className="tablet:text-[14px] font-medium phone:text-xs"
                        key={prod._id}>
                        {prod.Title}
                      </h1>
                    </div>
                    <p
                      className="font-lato text-sm font-bold mt-1"
                      key={prod._id}>
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
