import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

function loading() {
  return (
    <main className="flex flex-col justify-center laptop:items-start xsPhone:items-center phone:flex-col laptop:flex-col gap-[3rem] py-10 px-6">
      <p className=" w-full text-4xl font-playfair tracking-wider xsPhone:text-center laptop:text-start">
        <Skeleton className="w-[15rem] h-[2rem]" />
      </p>
      <section className="border border-[#A77737] laptop:w-[60%] tablet:w-[70%] phone:w-full tablet:px-[5rem] laptop:px-0 bg-white/80 h-full flex justify-center items-center phone:py-10">
        <form className="laptop:w-[60%] phone:w-[80%] flex flex-col justify-center items-center gap-5 ">
          <p className="laptop:text-2xl font-bold py-2 text-[#A77737] font-lato tracking-widest">
            Enter Your Details
          </p>
          <div className="flex flex-col gap-1 w-full ">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              className={cn("py-6 px-4 rounded-xl font-lato tracking-widest")}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Input
              type="text"
              name="phone"
              placeholder="Contact Number"
              className={cn("py-6 px-4 rounded-xl font-lato tracking-widest")}
            />
          </div>

          <div className="grid grid-cols-2 grid-rows-auto w-full gap-5">
            <div>
              <Input
                type="text"
                name="street"
                placeholder="Street"
                className={cn("py-6 px-4 rounded-xl font-lato tracking-widest")}
              />
            </div>
            <div>
              <Input
                type="text"
                name="city"
                placeholder="City"
                className={cn("py-6 px-4 rounded-xl font-lato tracking-widest")}
              />
            </div>
            <div>
              <Input
                type="text"
                name="state"
                placeholder="State"
                className={cn("py-6 px-4 rounded-xl font-lato tracking-widest")}
              />
            </div>
            <div>
              <Input
                type="text"
                name="zip"
                placeholder="Zip"
                className={cn("py-6 px-4 rounded-xl font-lato tracking-widest")}
              />
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-5">
            <Button className="w-full py-[1.25rem] rounded-xl font-lato tracking-widest uppercase bg-[#A77737] hover:bg-[#9a6b2e]">
              <>Submit</>
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default loading;
