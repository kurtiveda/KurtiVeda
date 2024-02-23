import React, { Suspense } from "react";
import MediumCards from "../Products/MediumCards";
import { Button } from "../ui/button";
import placeholder from "@/public/placeholder.png";
import Image from "next/image";

const Arrivals = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-9">
      <Image
        src={placeholder}
        alt={""}
        className="w-[6rem] object-cover"
        placeholder="blur"
      />
      <div className="flex flex-col justify-center items-center p-8 pt-0 gap-[3rem]">
        <p className="font-playfair text-3xl font-extralight tracking-wider">
          Latest Arrivals
        </p>
        <Suspense fallback={<p>Loading...</p>}>
          <MediumCards />
        </Suspense>
      </div>
    </div>
  );
};

export default Arrivals;
