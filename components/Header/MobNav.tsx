"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { HammerIcon, MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Search from "./Search";
import NavBanner from "./NavBanner";

const MobNav = () => {
  const [isSearchActive, setIsSearchActive] = useState<Boolean>(false);
  return (
    <>
      <NavBanner />
      <div className="flex justify-between items-center p-4 ">
        <div className="">
          <Drawer>
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="bg-white h-fit flex justify-center items-center">
              <div
                className={cn(
                  "text-[12px] flex flex-col w-fit py-[5rem] justify-start items-center gap-4 font-bold tracking-[0.2rem] pl-4 text-center"
                )}>
                <Link
                  href={"#"}
                  className="relative py-4 font-semibold group h-full hover:text-[#A77737]">
                  <p className="nav">SHOP</p>
                </Link>
                <Link
                  href={"#"}
                  className="relative py-4 font-semibold group h-full hover:text-[#A77737]">
                  <p className="nav">ABOUT</p>
                </Link>
                <Link
                  href={"#"}
                  className="relative py-4 font-semibold group h-full hover:text-[#A77737]">
                  <p className="nav">CONTACT</p>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <p
          className={cn(
            " text-center flex justify-center items-center font-lato uppercase font-light text-xl ",
            isSearchActive && "hidden"
          )}>
          Tara Textiles
        </p>
        <div
          className={cn(
            "flex justify-center items-center",
            isSearchActive && "w-[90%]"
          )}>
          <Button
            className={cn(
              "bg-none hover:bg-transparent hover:scale-125 transition p-0",
              isSearchActive && "hidden"
            )}
            variant={"ghost"}
            onClick={() => setIsSearchActive(true)}>
            <SearchIcon className="w-5 mr-2" />
          </Button>
          {isSearchActive && <Search setIsSearchActive={setIsSearchActive} />}
        </div>
      </div>
    </>
  );
};

export default MobNav;
