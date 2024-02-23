"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DeleteIcon, LoaderIcon, TrashIcon } from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [isDeleting, setIsDeleting] = useState(false);
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
      setIsDeleting(false);
    } finally {
      router.refresh();
      setIsDeleting(false);
    }
  }
  return (
    <div>
      <Button onClick={(e) => handleDelete(e)}>
        {isDeleting ? <LoaderIcon className="animate-spin" /> : <TrashIcon />}
      </Button>
    </div>
  );
}

export default DeleteButton;
