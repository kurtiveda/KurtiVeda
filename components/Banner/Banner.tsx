/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
import { Slide, SlideshowRef } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "react-alice-carousel/lib/alice-carousel.css";

const Banner = ({ images }: { images: string[] }) => {
  const slideRef = useRef<SlideshowRef>(null);
  return (
    <div className="max-h-fit">
      <Slide
        cssClass="h-fit "
        indicators={true}
        ref={slideRef}
        duration={3000}
        easing="ease-out"
        canSwipe={true}
        prevArrow={
          <div className="text-white transition hover:bg-white/20 flex flex-col justify-center items-center h-full px-6">
            <ArrowLeft />
          </div>
        }
        nextArrow={
          <div className="text-white transition hover:bg-white/20 flex flex-col justify-center items-center h-full px-6">
            <ArrowRight />
          </div>
        }>
        {images.map((image, index) => {
          return (
            <>
              <div
                className="w-[100vw] xsPhone:h-[55ch] tablet:h-auto laptop:h-fit relative"
                key={index}>
                <img
                  src={image}
                  alt={""}
                  key={index}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          );
        })}
      </Slide>
    </div>
  );
};

export default Banner;
