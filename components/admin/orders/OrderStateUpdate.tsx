"use client";
import { setDelStatus } from "@/actions";
import { Button } from "@/components/ui/button";
import { DelStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

function OrderStateUpdate({
  trid,
  userId,
  status,
}: {
  trid: string;
  userId: string;
  status: DelStatus;
}) {
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      className="w-full"
      onClick={async () => {
        try {
          await setDelStatus(trid, status, userId);
        } catch (err) {
          console.log(err);
        } finally {
          router.refresh();
        }
      }}>
      {status}
    </Button>
  );
}

export default OrderStateUpdate;
