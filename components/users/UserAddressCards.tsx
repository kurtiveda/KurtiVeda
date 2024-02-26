"use client";

import { Addresses } from "@/types";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { PenBoxIcon, Trash2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";

function UserAddressCards({
  addresses,
  userId,
}: {
  addresses: Addresses;
  userId: string;
}) {
  const router = useRouter();
  useEffect(() => router.refresh(), [router]);
  async function handleDelete(addressId: string) {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        headers: {
          userId: userId,
          addressId: addressId,
        },
      });
    } catch (err) {
      console.log("Error deleting address", err);
    } finally {
      router.refresh();
    }
  }
  return (
    <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 xsPhone:grid-cols-1 w-fit justify-center items-center gap-8 flex-wrap">
      {addresses?.map((address, index) => {
        return (
          <div
            key={index}
            className={`border border-[#A77737] p-10 space-y-6 hover:scale-105 transition`}>
            <div className="flex items-center space-x-6 ">
              <Label className="font-lato tracking-widest tablet:text-xl xsPhone:text-xs phone:text-sm space-y-[1rem] ">
                <div className="font-bold text-[#A77737] uppercase">
                  {address.name}
                </div>
                <div className="text-lg tracking-widest font-light">
                  <p>{address.phone}</p>
                </div>
                <div className="text-sm ">
                  {address.street}, {address.city}, {address.state}
                </div>
                <div className="text-sm ">{address.zip}</div>
              </Label>
            </div>
            <div className=" w-fit hover:scale-110 transition flex gap-4 justify-center items-center">
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/users/manage/addresses/${address.id}`}>
                <PenBoxIcon className="text-[#A77737]" />
              </Link>
              <Dialog>
                <DialogTrigger>
                  <Trash2Icon className="text-red-600" />
                </DialogTrigger>
                <DialogContent className="bg-white space-y-4">
                  <DialogHeader className="space-y-3">
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      this address and remove it from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    className="bg-red-700 hover:bg-red-800 rounded-xl font-lato tracking-widest uppercase"
                    onClick={() => handleDelete(address.id)}>
                    Delete Address
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserAddressCards;
