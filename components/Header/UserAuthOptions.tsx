"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { User2Icon, UserIcon } from "lucide-react";
import Link from "next/link";

function UserAuthOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full px-2 py-2 bg-[#A77737]">
        <UserIcon className="w-6 h-6 text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[400] relative">
        <DropdownMenuLabel>
          <Link href={`/users/manage`}>My Account</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/users/manage/orders`}>My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/users/manage/viewAddress`}>Saved Addresses</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/api/auth/signout`} className="text-red-600">
            Sign-Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAuthOptions;
