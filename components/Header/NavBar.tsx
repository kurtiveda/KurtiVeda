"use client";
import React, { useState } from "react";
import NavBanner from "./NavBanner";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Search from "./Search";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import UserAuthOptions from "./UserAuthOptions";
import { BannerType } from "@/types";

const NavBar = ({
  userId,
  banner,
}: {
  userId: string;
  banner: BannerType[];
}) => {
  const [isSearchActive, setIsSearchActive] = useState<Boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <NavBanner banner={banner} />
      <div className="w-full text-center px-4 font-lato uppercase font-light text-2xl flex justify-evenly">
        <div
          className={cn(
            "text-[10px] h-full flex w-1/3 justify-start items-center gap-6 font-bold tracking-[0.2rem] pl-4 text-center"
          )}>
          <Link
            href={"/shop"}
            className="relative py-8 font-semibold group h-full hover:text-[#A77737]"
            onClick={() =>
              localStorage.setItem("category", JSON.stringify([""]))
            }>
            <p className="nav">SHOP</p>
          </Link>
          <Link
            href={"#"}
            className="relative py-8 font-semibold group h-full hover:text-[#A77737]">
            <p className="nav">ABOUT</p>
          </Link>
          <Link
            href={"#"}
            className="relative py-8 font-semibold group h-full hover:text-[#A77737]">
            <p className="nav">CONTACT</p>
          </Link>
        </div>
        <Link
          href={"/"}
          className="w-1/3 text-center flex justify-center items-center font-lato tracking-widest"
          onClick={() =>
            localStorage.setItem("category", JSON.stringify([""]))
          }>
          <Image src={logo} alt={"logo"} className="w-10 h-auto mr-2" />
          KurtiVeda
        </Link>
        <div
          className={cn(
            "text-sm flex w-1/3 justify-end items-center gap-4 font-bold"
          )}>
          <Link href={`/cart`}>
            <Button
              className={cn(
                "bg-none hover:bg-transparent hover:scale-125 transition",
                isSearchActive && "hidden"
              )}
              variant={"ghost"}>
              <ShoppingBagIcon className="w-5 mr-2" />
            </Button>
          </Link>
          <Button
            className={cn(
              "bg-none hover:bg-transparent hover:scale-125 transition",
              isSearchActive && "hidden"
            )}
            variant={"ghost"}
            onClick={() => setIsSearchActive(true)}>
            <SearchIcon className="w-5 mr-2" />
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
                <Button className="rounded-full  bg-[#A77737] font-lato uppercase font-semibold text-xs tracking-widest">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
