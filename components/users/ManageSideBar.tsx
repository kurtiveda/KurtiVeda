"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { ArrowRight, UserCircle2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Links = [
  {
    name: "Saved Addresses",
    href: `/users/manage/viewAddress`,
  },
  {
    name: "View Orders",
    href: `/users/manage/orders`,
  },
];

function ManageSideBar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="w-full flex flex-col gap-4 ">
      <p className=" font-playfair text-2xl px-6 pt-6 flex items-center gap-2">
        Manage Account
      </p>
      <Separator className="w-[80%] ml-5" />
      <div className="w-full flex flex-col gap-2 py-4">
        {Links.map((link, index) => {
          return (
            <Link href={link.href} key={index} className="w-full ">
              <div
                className={cn(
                  "w-full flex justify-start items-center gap-2 hover:bg-[#A77737] hover:text-white transition font-lato tracking-widest text-md px-6 py-3",
                  pathname === link.href && "bg-[#A77737] text-white"
                )}>
                {link.name} <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ManageSideBar;
