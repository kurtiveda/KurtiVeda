"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const CardLoaders = () => {
  return (
    <div className="flex justify-center flex-wrap items-start gap-[2rem] w-full">
      <Skeleton className="w-[15rem] h-[24rem]" />
      <Skeleton className="w-[15rem] h-[24rem]" />
      <Skeleton className="w-[15rem] h-[24rem]" />
      <Skeleton className="w-[15rem] h-[24rem]" />
    </div>
  );
};

export default CardLoaders;
