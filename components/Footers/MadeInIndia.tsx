import React from "react";
import MadeIndia from "@/public/MadeInIndia.png";
import AssuredQuality from "@/public/AssuredQuality.png";
import Image from "next/image";

const MadeInIndia = () => {
  return (
    <div className=" w-full flex laptop:flex-row xsPhone:flex-col justify-center items-center">
      <div className="flex laptop:flex-row xsPhone:flex-col justify-center items-center laptop:gap-4 xsPhone:gap-8 w-[85%] px-8 pb-[10rem] pt-[8rem]">
        <div className="w-[80%] flex tablet:flex-row xsPhone:flex-col justify-center items-center  gap-10">
          <Image src={MadeIndia} alt={"madeInIndia"} className="w-[10rem]" />
          <div className="flex flex-col gap-1">
            <p className=" font-playfair text-[34px] text-[#222222] tracking-wider">
              Made in India
            </p>
            <p className="font-lato text-[14px] text-neutral-600 tracking-wider laptop:w-[85%] xsPhone:w-full text-justify leading-[1.5rem]">
              Our e-commerce platform specializes in traditional women&apos;s
              wear for B2B transactions. Offering quality designs, from
              embroidered tunics to tailored salwar suits, we serve as a
              convenient gateway for businesses worldwide to source premium
              attire.
            </p>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center gap-10">
          <Image
            src={AssuredQuality}
            alt={"madeInIndia"}
            className="w-[10rem]"
          />
          <Image
            src={AssuredQuality}
            alt={"madeInIndia"}
            className="w-[10rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default MadeInIndia;
