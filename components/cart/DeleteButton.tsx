"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DeleteIcon, LoaderIcon, Trash2Icon, TrashIcon } from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DeleteButton({
  productId,
  userId,
  size,
}: {
  productId: string;
  userId: string;
  size: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/cart/products`,
        {
          headers: {
            productId: productId,
            userId: userId,
            size: size,
          },
        }
      );
      console.log("removedProducts ==== ", res);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
      setIsDeleting(false);
    } finally {
      router.refresh();
      setIsDeleting(false);
      toast.success(
        "Successfully Deleted, Please Wait for the Changes to Reflect"
      );
    }
  }
  return (
    <div>
      {/* <Button
        onClick={(e) => {
          handleDelete(e);
        }}
        className="p-0 hover:bg-white hover:scale-110 transition"
        variant={"ghost"}>
        {isDeleting ? (
          <LoaderIcon className="animate-spin w-5 h-5 text-[#A77737] " />
        ) : (
          <Trash2Icon className="w-5 h-5 text-[#A77737] fill-[#A77737]/10" />
        )}
      </Button> */}
      <Dialog>
        <DialogTrigger>
          <Trash2Icon className="w-5 h-5 text-[#A77737] fill-[#A77737]/10" />
        </DialogTrigger>
        <DialogContent className="bg-white space-y-4">
          <DialogHeader className="space-y-4">
            <DialogTitle className="uppercase font-lato font-bold tracking-wider">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="uppercase font-lato tracking-widest text-xs text-neutral-400">
              This Action Will Remove the Product from your bag
            </DialogDescription>
          </DialogHeader>
          <Button
            className="bg-red-700 hover:bg-red-800 rounded-xl font-lato tracking-widest uppercase"
            onClick={(e) => handleDelete(e)}>
            {isDeleting ? (
              <LoaderIcon className="animate-spin w-5 h-5 text-[#A77737] " />
            ) : (
              <>Remove Product</>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteButton;
