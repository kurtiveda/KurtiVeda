"use client";
import { Addresses } from "@/types";
import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { setCartAddress } from "@/actions";
import { cn, makePayment } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import axios from "axios";
import CartPromo from "./CartPromo";
import Image from "next/image";
import payments from "@/public/payments2.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

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
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    setNetPrice(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    setAddress(" ");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setPaying(true);

    if (address !== " ") {
      const updatedAddress = await setCartAddress(JSON.parse(address));
      console.log("updatedAddress", updatedAddress);

      try {
        await makePayment(
          e,
          router,
          netPrice,
          updatedAddress[0].delivery?.phone as string,
          userId
        );
        setPaying(false);
      } catch (err) {
        console.log(err);
        toast.error("Error Connecting to PhonePe Gateway. Try Again Later");
      }

      setAddress(JSON.stringify(updatedAddress[0].delivery));
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full gap-8 py-4">
      <div className="flex items-center justify-between w-[90%] uppercase font-bold font-lato tablet:text-sm xsPhone:text-xs tracking-widest">
        <p className="w-full font-medium">SHIPPING</p>
        <p className="tablet:text-[14px] xsPhone:text-xs">FREE</p>
      </div>
      <div className="flex items-center justify-between w-[90%] uppercase font-bold font-lato tablet:text-sm xsPhone:text-xs tracking-widest">
        <p className="w-full font-medium">Net Payable:</p>
        <p className="tablet:text-[16px] xsPhone:text-sm">₹{netPrice}</p>
      </div>
      <div className="w-[90%]">
        <CartPromo
          totalPrice={totalPrice}
          setNetPrice={setNetPrice}
          userId={userId}
        />
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        method="POST"
        className="w-[90%] space-y-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-lato font-semibold tablet:text-sm xsPhone:text-xs tracking-widest">
              Select Delivery Address
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-6">
                {addresses?.map((address, index) => {
                  return (
                    <div key={index} className="">
                      <div className="flex items-center space-x-6 ">
                        <input
                          type="radio"
                          name="address"
                          id={`r${index}`}
                          value={JSON.stringify(address)}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          className=""
                        />
                        <Label
                          htmlFor={`r${index}`}
                          className="font-lato tracking-widest tablet:text-sm xsPhone:text-xs space-y-[0.4rem] cursor-pointer ">
                          <div className="font-bold">{address.name}</div>
                          <div className="text-xs tracking-widest">
                            <p>{address.phone}</p>
                          </div>
                          <div className="text-xs ">
                            {address.street}, {address.city}, {address.state}
                          </div>
                          <div className="text-xs ">{address.zip}</div>
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          disabled={address === " " || totalPrice === 0}
          className="bg-[#A77737] hover:bg-[#96692d] uppercase font-lato font-semibold text-[11px] tracking-widest w-full">
          Proceed To Payment
          {paying && <Loader2Icon className="animate-spin h-5 w-5 ml-2" />}
        </Button>
      </form>
      <Image src={payments} className="object-cover" alt={""} />
    </div>
  );
}

export default CartAddress;
