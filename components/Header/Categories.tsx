"use client";
import { Categories } from "@/types";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import tunic from "@/public/Tunic.png";
import two_piece from "@/public/KurtaSets.png";
import three_piece from "@/public/three_piece.png";
import { ArrowRight } from "lucide-react";

const Categories = ({ categories }: { categories: Categories[] }) => {
  return (
    <div className="bg-[#FAF7F1] py-6 text-center space-y-6 px-1">
      <p className="uppercase font-lato text-[11px] font-black tracking-[0.2rem]">
        Shop by Category
      </p>
      <div className=" bg-[#FAF7F1] font-lato uppercase  tracking-wider font-semibold flex justify-center items-center w-full laptop:gap-10 xsPhone:gap-8 overflow-x-scroll flex-wrap">
        {categories.map((category) => {
          let imageSrc: StaticImageData = tunic;
          if (category.title === "Tunics") {
            imageSrc = tunic;
          } else if (category.title === "Two-Piece") {
            imageSrc = two_piece;
          } else imageSrc = three_piece;
          return (
            <>
              <Link href={`/category/${category._id}`}>
                <div
                  key={category._id}
                  className="flex flex-col justify-center items-center gap-3 hover:-translate-y-1 transition">
                  <div className="rounded-full bg-[#F2EBE1] laptop:h-[5rem] laptop:w-[5rem] xsPhone:w-[4rem] h-[4rem] relative">
                    <Image
                      src={imageSrc}
                      alt={"tunic"}
                      className="absolute w-auto h-auto"
                    />
                  </div>

                  <div className="text-[10px] text-wrap">{category.title}</div>
                </div>
              </Link>
            </>
          );
        })}
        <Link href={`/shop`}>
          <div className="flex flex-col justify-center items-center gap-3 hover:-translate-y-1 transition">
            <div className="rounded-full bg-[#F2EBE1] laptop:h-[5rem] laptop:w-[5rem] xsPhone:h-[4rem] xsPhone:w-[4rem] relative">
              <ArrowRight className="absolute translate-x-[-50%] left-[50%] translate-y-[-50%] top-[50%] w-8 h-8 text-[#A77737]" />
            </div>

            <div className="text-[10px] text-[#A77737] font-bold">Shop All</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
