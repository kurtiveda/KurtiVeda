"use client";
import { Categories } from "@/types";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import tunic from "@/public/Tunic.png";
import two_piece from "@/public/KurtaSets.png";
import three_piece from "@/public/three_piece.png";

const Categories = ({ categories }: { categories: Categories[] }) => {
  return (
    <div className="bg-[#FAF7F1] py-6 text-center space-y-6">
      <p className="uppercase font-lato text-[11px] font-black tracking-[0.2rem]">
        Shop by Category
      </p>
      <div className=" bg-[#FAF7F1] font-lato uppercase  tracking-wider font-semibold flex justify-center items-center w-full gap-10">
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
                  <div className="rounded-full bg-[#F2EBE1] h-[5rem] w-[5rem] relative">
                    <Image
                      src={imageSrc}
                      alt={"tunic"}
                      className="absolute w-auto h-auto"
                    />
                  </div>

                  <div className="text-[10px]">{category.title}</div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
