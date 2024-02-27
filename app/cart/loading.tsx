import Header from "@/components/Header/Header";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2Icon } from "lucide-react";

import React from "react";

function loading() {
  return (
    <>
      <Header />
      <hr />
      <div className="py-10">
        <p className="font-playfair text-3xl w-full text-center pb-10">
          Your Bag
        </p>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center laptop:items-start xsPhone:items-center laptop:flex-row xsPhone:flex-col laptop:w-[80%] xsPhone:w-[90%] gap-8">
            <div className="laptop:w-[70%] w-full">
              <hr className="mb-4" />

              <div className="">
                <div>
                  <div className="flex justify-center items-center relative h-fit tablet:gap-10 xsPhone:gap-4">
                    <div className="hover:scale-105 transition ease-in xsPhone:w-1/2 tablet:w-[15%]">
                      <div className="w-full flex justify-start items-center">
                        <Skeleton className="object-contain tablet:w-[10rem] xsPhone:w-[7rem] h-[10rem]" />
                      </div>
                    </div>

                    <div className="xsPhone:w-full tablet:w-[60%] tablet:h-[10rem] flex flex-col justify-center items-start gap-4">
                      <div className="font-lato tracking-widest text-lg space-y-2">
                        <div className="hover:text-[#A77737] transition hover:underline tablet:text-md xsPhone:text-sm">
                          <Skeleton className="tablet:w-[10rem] xsPhone:w-[6rem] h-4" />
                        </div>
                        <div className="font-lato tracking-widest tablet:text-xs xsPhone:text-xs text-slate-500">
                          <Skeleton className="w-[4rem] h-4" />
                        </div>
                      </div>
                      <div className="font-lato flex gap-2 tracking-widest tablet:text-sm xsPhone:text-xs text-slate-500">
                        Quantity: <Skeleton className="w-6 h-4" />
                      </div>
                      <Trash2Icon className="w-5 h-5 text-[#A77737] fill-[#A77737]/10" />
                    </div>
                    <div className="tablet:w-fit xsPhone:w-1/3">
                      <div className="font-lato  xsPhone:flex tablet:flex flex justify-center items-center gap-2 tracking-widest tablet:text-[16px] xsPhone:text-sm font-semibold">
                        ₹<Skeleton className="w-[3rem] h-6" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            </div>

            <div className="laptop:w-[40%] xsPhone:w-[95%] h-full sticky top-0 laptop:border-l laptop:pl-8">
              <div className="w-full">
                <div className="flex flex-col justify-center items-center w-full gap-8 py-4">
                  <div className="flex items-center justify-between w-[90%] uppercase font-bold font-lato tablet:text-sm xsPhone:text-xs tracking-widest">
                    <p className="w-full font-medium">SHIPPING</p>
                    <p className="tablet:text-[14px] xsPhone:text-xs">FREE</p>
                  </div>
                  <div className="flex items-center justify-between w-[90%] uppercase font-bold font-lato tablet:text-sm xsPhone:text-xs tracking-widest">
                    <p className="w-full font-medium">Net Payable:</p>
                    <div className="font-lato flex justify-center items-center gap-2 tracking-widest tablet:text-[16px] xsPhone:text-sm font-semibold">
                      ₹ <Skeleton className="w-[4rem] h-6" />
                    </div>
                  </div>
                  <div className="w-[90%]">
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="w-full space-y-4">
                        <div />
                        <Label></Label>
                        <div className="flex justify-center items-center gap-2">
                          <Button className="w-[70%] bg-[#A77737] uppercase font-lato tracking-widest text-xs hover:bg-[#9c6d2f]">
                            <p>Apply</p>
                          </Button>
                          <Button className="w-[30%] bg-white border text-[#A77737] border-[#A77737] uppercase font-lato tracking-widest text-xs hover:bg-[#A77737]/10">
                            Clear
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[90%] space-y-6">
                    {/* <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="font-lato font-semibold tablet:text-sm xsPhone:text-xs tracking-widest">
                        Select Delivery Address
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-6">
                          <div className="">
                            <div className="flex items-center space-x-6 ">
                              <input
                                type="radio"
                                name="address"
                                className=""
                              />
                              <Label className="font-lato tracking-widest tablet:text-sm xsPhone:text-xs space-y-[0.4rem] cursor-pointer ">
                                <div className="font-bold">
                                  <Skeleton className="w-6 h-4" />
                                </div>
                                <div className="text-xs tracking-widest">
                                  <p>
                                    <Skeleton className="w-6 h-4" />
                                  </p>
                                </div>
                              </Label>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion> */}

                    <Button className="bg-[#A77737] hover:bg-[#96692d] uppercase font-lato font-semibold text-[11px] tracking-widest w-full">
                      Proceed To Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default loading;
