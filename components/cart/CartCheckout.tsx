import React from "react";
import { auth } from "@/auth";
import { getAddresses } from "@/controller/products";

import CartAddress from "./CartAddress";
import { Addresses } from "@/types";

async function CartCheckout({ totalPrice }: { totalPrice: number }) {
  const session = await auth();
  const userId = session?.user?.id as string;
  const addresses: Addresses = await getAddresses(userId);
  console.log(addresses);
  return (
    <>
      <div className="w-full">
        <CartAddress
          addresses={addresses}
          totalPrice={totalPrice}
          userId={userId}
        />
      </div>
    </>
  );
}

export default CartCheckout;
