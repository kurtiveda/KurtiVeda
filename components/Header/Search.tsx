"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import client from "@/sanity/sanity.client";
import { groq } from "next-sanity";
import { ProductType } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight, EyeIcon, SearchIcon, X } from "lucide-react";
import MediumCards from "../Products/MediumCards";
import { ProdCards } from "../Products/ProdCards";
import Link from "next/link";

const Search = ({
  setIsSearchActive,
}: {
  setIsSearchActive: Dispatch<SetStateAction<Boolean>>;
}) => {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  function searchQuery() {
    setLoading(true);
    const regexPattern: string = "(?:" + searchTitle + ")";
    client
      .fetch<ProductType[]>(
        `*[_type == "Products" && Title match '${regexPattern}'][0...5]{
      _id,
      Title,
      description,
      productMedia[]{
        asset -> {url}
      },
      Price,
      out_of_stock
    }`,
        {},
        {
          cache: "no-cache",
          next: { tags: ["Products"] },
        }
      )
      .then((products) => {
        console.log(products);
        setProducts(products);
        setLoading(false);
      })
      .catch((err) => {
        console.log("[Search ERROR]: ", err);
        setError(true);
      });
  }

  return (
    <div className="w-full ">
      <div className="flex gap-2">
        <Input
          type="search"
          placeholder="Search"
          className="w-full font-medium font-lato"
          value={searchTitle}
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && searchQuery()}
        />

        <Button
          type="button"
          onClick={searchQuery}
          className="bg-[#A77737] hover:bg-[#956a31] xsPhone:w-fit xsPhone:p-2 tablet:p-4 rounded-full">
          <p className="xsPhone:hidden tablet:block">Search</p>
          <SearchIcon className="xsPhone:flex tablet:hidden text-white w-4" />
        </Button>

        <Button
          onClick={() => setIsSearchActive(false)}
          className="xsPhone:w-fit xsPhone:p-2 tablet:p-4 xsPhone:rounded-full">
          <X className="xsPhone:w-4 text-white" />
        </Button>
      </div>

      <div className="w-full right-0 h-fit border absolute bg-white z-[100] rounded-md mt-2 shadow-md tablet:p-[3rem] phone:py-[3rem] flex flex-col justify-center items-center">
        {loading ? (
          <div>Loading</div>
        ) : (
          <>
            <div className="flex justify-center items-center tablet:gap-[3rem] phone:gap-4 xsPhone:gap-2 flex-wrap ">
              {products?.map((prod, index) => {
                return (
                  <div
                    key={Math.random() + index}
                    className="flex flex-col w-fit"
                    onClick={() => setIsSearchActive(false)}>
                    <ProdCards
                      imageUrl={prod.productMedia.map((image) => {
                        return image.asset.url;
                      })}
                      prodId={prod._id}
                      imageClassName="object-cover rounded-bl-none rounded-br-none"
                      className="w-fit cursor-pointer"
                      key={Math.random() + index}>
                      <div
                        className=" w-full rounded-xl p-4 "
                        key={Math.random() + index}>
                        <EyeIcon key={Math.random() + index} />
                      </div>
                    </ProdCards>
                    {/* {prod.productMedia.map((img, index) => {
                    return (
                      <Image
                        src={img.asset.url}
                        key={prod._id}
                        alt={"dp"}
                        width={120}
                        height={120}></Image>
                    );
                  })} */}
                    <div
                      className=" w-full rounded-xl phone:p-4 phone:pl-4 text-center"
                      key={Math.random() + index}>
                      <div className="font-lato" key={Math.random() + index}>
                        <h1
                          className="tablet:text-[14px] font-medium phone:text-xs"
                          key={Math.random() + index}>
                          {prod.Title}
                        </h1>
                      </div>
                      <p
                        className="font-lato text-sm font-bold mt-1"
                        key={Math.random() + index}>
                        ₹ {prod.Price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {products.length === 0 && !loading && (
          <p className="font-lato font-medium text-neutral-300 py-6">
            No Products
          </p>
        )}
        {products.length !== 0 && !loading && (
          <div className="flex justify-center items-center tablet:flex-row phone:flex-col gap-4 mt-5">
            <p className="font-lato font-light text-xs text-muted-foreground">
              Not What you are looking for?
            </p>
            <Link href={"/shop"}>
              <Button
                className="rounded-none  bg-[#A77737] hover:bg-[#956a31] text-xs pr-2"
                onClick={() =>
                  localStorage.setItem("category", JSON.stringify([""]))
                }>
                View All <ChevronRight />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
