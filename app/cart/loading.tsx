import Header from "@/components/Header/Header";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div>
      <Header />
      <p className="font-playfair text-3xl w-full text-center py-10">
        Your Bag
      </p>
      <hr />

      <div className="flex justify-center items-start laptop:flex-row xsPhone:flex-col">
        <div className="laptop:w-[70%] w-full flex px-6 gap-6">
          <div>
            <Skeleton className="h-[15rem] w-[10rem]" />
          </div>
          <div className="flex flex-col justify-start items-start py-10 space-y-5">
            <Skeleton className="w-[20rem] h-[1rem]" />
            <Skeleton className="w-[15rem] h-[1rem]" />
            <Skeleton className="w-[10rem] h-[1rem]" />
          </div>
        </div>
        <div className="w-[30%] border h-full sticky top-0">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}

export default loading;
