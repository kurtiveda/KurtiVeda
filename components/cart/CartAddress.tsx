"use client";
import { Addresses } from "@/types";
import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { setCartAddress } from "@/actions";
import { makePayment } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import axios from "axios";
import CartPromo from "./CartPromo";
function CartAddress({
  addresses,
  totalPrice,
  userId,
}: {
  addresses: Addresses;
  totalPrice: number;
  userId: string;
}) {
  const [address, setAddress] = useState(" ");
  const router = useRouter();
  const [netPrice, setNetPrice] = useState(totalPrice);

  useEffect(() => {
    setNetPrice(totalPrice);
  }, [totalPrice]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (address !== " ") {
      const updatedAddress = await setCartAddress(JSON.parse(address));
      console.log("updatedAddress", updatedAddress);

      await makePayment(
        e,
        router,
        netPrice,
        updatedAddress[0].delivery?.phone as string,
        userId
      );
      setAddress(JSON.stringify(updatedAddress[0].delivery));
    }
  }
  return (
    <div>
      <p>TotalPrice: {netPrice}</p>
      <CartPromo totalPrice={totalPrice} setNetPrice={setNetPrice} />
      <form onSubmit={(e) => handleSubmit(e)} method="POST">
        {addresses?.map((address, index) => {
          return (
            <div key={index}>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="address"
                  id={`r${index}`}
                  value={JSON.stringify(address)}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Label htmlFor={`r${index}`}>{address.phone}</Label>
              </div>
            </div>
          );
        })}

        <Button type="submit" disabled={address === " " || totalPrice === 0}>
          Proceed To Payment
        </Button>
      </form>
    </div>
  );
}

export default CartAddress;
