"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";
import Lottie, { LottiePlayer } from "lottie-react";
import vec from "@/public/SuitGirl.json";
import { TbIroning1, TbWashDryShade, TbWashTemperature3 } from "react-icons/tb";
import { FaHandsBubbles } from "react-icons/fa6";
import Accordian from "./Accordian";
import useMediaQuery from "@/hooks/use-media-query";
import BreadCrumbs from "../ui/BreadCrumbs";

const PageLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }
  if (!isDesktop) {
    return (
      <>
        <Separator />
        <div className="w-full pt-8 ">
          <BreadCrumbs customPath={["shop", ``]} />
        </div>
        <div className="w-screen flex justify-center items-center ">
          <div className="flex flex-col justify-center items-center w-[90%] mt-[2rem]">
            <div className="w-[90%] grid grid-cols-1 gap-2 relative justify-center items-center">
              <Skeleton className="w-[30cw] h-[40ch]" />
            </div>
            <div className="w-[90%] flex flex-col justify-center items-end sticky top-0 overflow-hidden ring-offset-2 py-[5rem]  gap-[1.5rem]">
              <div className="text-5xl font-playfair tracking-wide text-neutral-700 uppercase space-y-6">
                <Skeleton className="w-[30rem] h-[1rem]" />
                <Skeleton className="w-[20rem] h-[1rem]" />
                <Skeleton className="w-[10rem] h-[1rem]" />
              </div>
              <div className="text-xl font-lato font-light text-neutral-500">
                <Skeleton />
              </div>
              <div className="flex-col justify-start items-start w-[100%]">
                <div className="text-3xl font-playfair flex justify-start items-start w-full gap-2">
                  ₹ <Skeleton className="w-[5rem] h-[2rem]" />
                </div>
                <p className=" font-lato text-sm font-light">Tax included</p>
              </div>
              <div className="w-full">
                <Accordian
                  title={"Washing and Care Instructions"}
                  description={[
                    {
                      title: "Hand wash only",
                      img: <FaHandsBubbles className="w-6 h-6" />,
                    },
                    {
                      title: "Wash in Cold or Lukewarm Water only",
                      img: <TbWashTemperature3 className="w-6 h-6" />,
                    },
                    {
                      title: "Dry in Shade",
                      // eslint-disable-next-line react/jsx-no-undef
                      img: <TbWashDryShade className="w-6 h-6" />,
                    },
                    {
                      title: "Low Heat Iron Only",
                      img: <TbIroning1 className="w-6 h-6" />,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Separator />
      <div className="w-screen flex justify-center items-center ">
        <div className="flex justify-center items-start w-[90%] mt-[2rem]">
          <div className="w-[50%] grid grid-cols-2 gap-2 relative">
            <Skeleton className="w-[50cw] h-[40ch]" />
            <Skeleton className="w-[50cw] h-[40ch]" />
            <Skeleton className="w-[50cw] h-[40ch]" />
            <Skeleton className="w-[50cw] h-[40ch]" />
          </div>
          <div className="w-[50%] flex flex-col justify-start items-start sticky top-0 overflow-hidden ring-offset-2 py-[5rem] px-[4rem] gap-[1.5rem]">
            <div className="text-5xl font-playfair tracking-wide text-neutral-700 uppercase space-y-6">
              <Skeleton className="w-[30rem] h-[1rem]" />
              <Skeleton className="w-[20rem] h-[1rem]" />
              <Skeleton className="w-[10rem] h-[1rem]" />
            </div>
            <div className="text-xl font-lato font-light text-neutral-500">
              <Skeleton />
            </div>
            <div className="flex-col justify-start items-start">
              <div className="text-3xl font-playfair flex justify-center items-center gap-2">
                ₹ <Skeleton className="w-[5rem] h-[2rem]" />
              </div>
              <p className=" font-lato text-sm font-light">Tax included</p>
            </div>
            <div className="w-full">
              <Accordian
                title={"Washing and Care Instructions"}
                description={[
                  {
                    title: "Hand wash only",
                    img: <FaHandsBubbles className="w-6 h-6" />,
                  },
                  {
                    title: "Wash in Cold or Lukewarm Water only",
                    img: <TbWashTemperature3 className="w-6 h-6" />,
                  },
                  {
                    title: "Dry in Shade",
                    // eslint-disable-next-line react/jsx-no-undef
                    img: <TbWashDryShade className="w-6 h-6" />,
                  },
                  {
                    title: "Low Heat Iron Only",
                    img: <TbIroning1 className="w-6 h-6" />,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex h-[100dvh] w-screen justify-center items-center">
        <Lottie animationData={vec} className="w-[20rem]" />
      </div> */}
    </>
  );
};

export default PageLoader;
