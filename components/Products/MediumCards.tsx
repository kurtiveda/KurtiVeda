import React from "react";
import { ProdCards } from "./ProdCards";
import { EyeIcon } from "lucide-react";
import { ProductType } from "@/types";
import { getNewProduct } from "@/sanity/sanity.query";

const MediumCards = async () => {
  const products: ProductType[] = await getNewProduct();

  return (
    <div className="flex my-4 justify-center items-center flex-row">
      <div className=" rounded-xl grid laptop:grid-cols-4 phone:grid-cols-2 xsPhone:grid-cols-1 grid-rows-auto justify-center items-center tablet:gap-[3rem] xsPhone:gap-[1rem] flex-wrap">
        {products.map((prod) => {
          return (
            <>
              <div
                className="flex flex-col hover:scale-105  transition "
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
  );
};

export default MediumCards;
