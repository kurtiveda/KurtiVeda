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
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  HammerIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Search from "./Search";
import NavBanner from "./NavBanner";
import UserAuthOptions from "./UserAuthOptions";
import { BannerType } from "@/types";

const MobNav = ({
  userId,
  banner,
}: {
  userId: string;
  banner: BannerType[];
}) => {
  const [isSearchActive, setIsSearchActive] = useState<Boolean>(false);
  return (
    <>
      <NavBanner banner={banner} />
      <div className="flex justify-between items-center p-4 ">
        <div
          className={cn(
            "w-1/3 flex  justify-start items-center gap-4",
            isSearchActive && "w-fit"
          )}>
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
                  href={"/shop"}
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
          <Link href={`/cart`} className={cn(isSearchActive && "hidden")}>
            <Button
              className={cn(
                "bg-none hover:bg-transparent hover:scale-125 transition",
                isSearchActive && "hidden"
              )}
              variant={"ghost"}>
              <ShoppingBagIcon className="w-5" />
            </Button>
          </Link>
        </div>
        <Link
          href={"/"}
          className={cn(
            "text-center w-1/2 flex justify-center items-center font-lato uppercase font-light text-xl",
            isSearchActive && "hidden"
          )}>
          <Image src={logo} alt={"logo"} className="w-8 h-auto mr-3" />
          <p
            className={cn(
              " text-center w-1/2 flex justify-center items-center font-lato uppercase font-light text-xl ",
              isSearchActive && "hidden"
            )}>
            KurtiVeda
          </p>
        </Link>
        <div
          className={cn(
            "flex justify-end items-center gap-4 w-1/3",
            isSearchActive && "w-[90%]"
          )}>
          <Button
            className={cn(
              "bg-none hover:bg-transparent hover:scale-125 transition p-0",
              isSearchActive && "hidden"
            )}
            variant={"ghost"}
            onClick={() => setIsSearchActive(true)}>
            <SearchIcon className="w-5 " />
          </Button>
          {isSearchActive && <Search setIsSearchActive={setIsSearchActive} />}
          <div
            className={cn(
              "bg-none hover:bg-transparent hover:scale-110 transition",
              isSearchActive && "hidden"
            )}>
            {userId !== undefined && userId ? (
              <UserAuthOptions />
            ) : (
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin`}>
                <Button className="rounded-full px-2 bg-[#A77737] font-lato uppercase font-semibold text-xs tracking-widest">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobNav;
