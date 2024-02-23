/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ImageMagnify = ({ src }: { src: string }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hover:scale-105 transition cursor-zoom-in">
          <div className="">
            <img src={src} alt={""} className="w-[50cw]" />
          </div>
        </DialogTrigger>
        <DialogContent className="w-full h-auto border-none">
          <img src={src} alt={""} className="w-[100cw]" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageMagnify;
