import { auth } from "@/auth";
import { addOrders, setStatus } from "@/controller/products";
import axios from "axios";
import React from "react";

async function page({ params }: { params: { trId: string } }) {
  const session = await auth();
  if (!session) {
    return <div>Log In First</div>;
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/success`,
      {
        transaction: params.trId,
        userId: session?.user?.id as string,
      }
    );
    console.log(res.data);
    if (res.data === true) {
      const status = await setStatus(session?.user?.id as string, params.trId);
      const updatedOrders = await addOrders(session?.user?.id as string);
      console.log(status.cart[0].status);
    }
  } catch (err) {
    console.log(err);
    return <div>Wrong Transaction ID</div>;
  }

  return <div>Payment Successful</div>;
}

export default page;
