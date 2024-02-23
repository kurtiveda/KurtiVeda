"use client";
import { cn } from "@/lib/utils";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumbs = ({ customPath }: { customPath?: string[] }) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((p) => p !== " ");
  console.log(pathNames);
  const lastIndex = customPath ? customPath.length - 1 : pathNames.length - 1;
  if (customPath) {
    return (
      <div className="font-lato tracking-wider text-xs h-full w-full flex justify-center items-center gap-2 ]">
        <div className="flex justify-center items-center gap-2 ">
          <Link href={"/"} className="flex justify-center items-center gap-2">
            <HomeIcon className="w-4 h-4" />
            HOME
          </Link>
          {/* <ChevronRight className="w-5 h-5" /> */}/
        </div>
        {customPath?.map((path, index) => {
          if (path === "" || path.includes("%")) {
            return null;
          }
          return (
            <>
              <div
                className={cn(
                  "flex justify-center items-center gap-2 uppercase",
                  index === lastIndex && "font-black "
                )}>
                {index === lastIndex ? (
                  path
                ) : (
                  <Link href={`/${path}`} className="uppercase">
                    {path !== "" && path}
                  </Link>
                )}
                {/* <ChevronRight className="w-5 h-5" /> */}/
              </div>
            </>
          );
        })}
      </div>
    );
  }
  return (
    <div className="font-lato tracking-wider text-xs h-full w-full flex justify-center items-center gap-2">
      <div className="flex justify-center items-center gap-2">
        <Link href={"/"} className="flex justify-center items-center gap-2">
          <HomeIcon className="w-4 h-4 " />
          HOME
        </Link>
        {/* <ChevronRight className="w-5 h-5" /> */}/
      </div>
      {pathNames &&
        pathNames?.map((path, index) => {
          if (path === "" || path.includes("%")) {
            return null;
          }
          return (
            <>
              <div
                className={cn(
                  "flex justify-center items-center gap-2 uppercase",
                  index === lastIndex && "font-black"
                )}>
                {index === lastIndex ? (
                  path
                ) : (
                  <Link href={`/${path}`} className="uppercase">
                    {path !== "" && path}
                  </Link>
                )}
                {/* <ChevronRight className="w-5 h-5" /> */} /
              </div>
            </>
          );
        })}
    </div>
  );
};

export default BreadCrumbs;
