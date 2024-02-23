"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { Slide, SlideshowRef, Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ZoomCaraousel = ({ images }: { images: string[] }) => {
  const slideRef = useRef<SlideshowRef>(null);
  return (
    // <Zoom
    //   scale={1.4}
    //   indicators={true}
    //   duration={3000}
    //   autoplay={false}
    //   canSwipe={true}
    //   prevArrow={
    //     <div className="text-white transition hover:bg-white/20 flex flex-col justify-center items-center h-full px-6">
    //       <ChevronLeft />
    //     </div>
    //   }
    //   nextArrow={
    //     <div className="text-white transition hover:bg-white/20 flex flex-col justify-center items-center h-full px-6">
    //       <ChevronRight />
    //     </div>
    //   }>
    //   {images.map((each, index) => (
    //     <div key={index} style={{ width: "100%" }}>
    //       <img
    //         style={{ objectFit: "cover", width: "100%" }}
    //         alt="Slide Image"
    //         src={each}
    //       />
    //     </div>
    //   ))}
    // </Zoom>
    <Slide
      cssClass="h-fit "
      indicators={true}
      ref={slideRef}
      duration={3000}
      easing="ease-out"
      canSwipe={true}
      prevArrow={
        <div className="text-white transition hover:bg-white/20 flex flex-col justify-center items-center h-full px-6">
          <ChevronLeft />
        </div>
      }
      nextArrow={
        <div className="text-white transition hover:bg-white/20 flex flex-col justify-center items-center h-full px-6">
          <ChevronRight />
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
  );
};

export default ZoomCaraousel;
