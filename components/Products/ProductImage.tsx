/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ProductImage({
  imageUrl,
  prodId,
}: {
  imageUrl: string[];
  prodId: string;
}) {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Link className="cursor-pointer" href={`/collections/products/${prodId}`}>
      <img
        src={isHover && imageUrl.length > 1 ? imageUrl[1] : imageUrl[0]}
        alt={""}
        className={cn(
          "object-contain w-full relative transition rounded-lg",
          isHover ? "transition-all duration-300 " : ""
        )}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      />
    </Link>
  );
}

export default ProductImage;
