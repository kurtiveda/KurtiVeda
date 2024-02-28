import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { PenBoxIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="w-full flex flex-col laptop:justify-start laptop:items-start justify-center items-center gap-10 py-10 px-4">
      <p className="text-4xl font-playfair tracking-wider">Saved Addresses:</p>

      <div className="flex justify-center items-center gap-2 bg-[#A77737] text-white rounded-lg p-2 w-fit font-lato uppercase text-xs tracking-widest">
        <PlusIcon className="w-5 h-5" /> New Address
      </div>

      <div className="flex justify-center items-centers laptop:justify-start laptop:items-start w-full">
        <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 xsPhone:grid-cols-1 w-fit justify-center items-center gap-8 flex-wrap">
          <div
            className={`border border-[#A77737] p-10 space-y-6 hover:scale-105 transition`}>
            <div className="flex items-center space-x-6 ">
              <Label className="font-lato tracking-widest tablet:text-xl xsPhone:text-xs phone:text-sm space-y-[1rem] ">
                <div className="font-bold text-[#A77737] uppercase">
                  <Skeleton className="w-[15rem] h-[2rem]" />
                </div>
                <div className="text-lg tracking-widest font-light">
                  <Skeleton className="w-[10rem] h-[1.5rem]" />
                </div>
                <div className="text-sm flex flex-wrap">
                  <Skeleton className="w-[8rem] h-[1.2rem]" />
                </div>
                <div className="text-sm ">
                  <Skeleton className="w-[8rem] h-[1.2rem]" />
                </div>
              </Label>
            </div>
            <div className=" w-fit hover:scale-110 transition flex gap-4 justify-center items-center">
              <PenBoxIcon className="text-[#A77737]" />
              <Trash2Icon className="text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loading;
