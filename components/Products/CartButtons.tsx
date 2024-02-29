"use client";

import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { CartProduct } from "@/types";
import { cn } from "@/lib/utils";
import { createCart } from "@/controller/products";
import { auth } from "@/auth";
import { Input } from "../ui/input";
import { Loader2Icon, ShoppingBagIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import WhatsAppButton from "../ui/Whatsapp";
import { useRouter } from "next/navigation";

function CartButtons({
  product,
  userId,
  session,
}: {
  product: { id: string; name: string; price: number; sizes: string[] };
  userId: string;
  session: Session | null;
}) {
  const [quant, setQuant] = useState(1);
  const [size, setSize] = useState("");
  const [active, setActive] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSize("");
    setQuant(1);
    setActive("");
    setSubmitting(false);
  }, []);

  console.log(quant);
  console.log(size);
  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setSubmitting(true);

      const prod = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/cart/products`,
        JSON.stringify({
          id: product.id,
          name: product.name,
          price: product.price,
          Quantity: quant,
          size: size,
        }),
        {
          headers: {
            userId: userId,
          },
        }
      );
      toast.success("Product Added to Cart Successfully");
      console.log("productData on submit", prod.data);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    } finally {
      setSize("");
      setQuant(1);
      setActive("");
      setSubmitting(false);
      router.refresh();
    }
  }
  return (
    <div className="py-4 w-full">
      <form
        method="post"
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-col gap-8">
        <div className="flex justify-start items-center gap-4">
          <label
            htmlFor="quantity"
            className="font-lato tracking-wider uppercase text-[12px]">
            Quantity:
          </label>
          <input
            type="number"
            min={1}
            max={10}
            name="quantity"
            className="border border-[#c58f48] text-[#c58f48] p-1 rounded font-lato font-semibold w-fit"
            value={quant}
            onChange={(e) => setQuant(Number(e.target.value))}
          />
        </div>
        <div className="flex xsPhone:flex-col laptop:flex-row justify-start items-start w-full gap-6">
          <div className="w-fit  flex justify-center items-center laptop:gap-4 tablet:gap-2 xsPhone:gap-4 flex-wrap text-xs font-lato tracking-widest">
            {product?.sizes?.map((size, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    setSize(size);
                    setActive(size);
                  }}
                  className={cn(
                    "border laptop:w-[3rem] laptop:h-[3rem] cursor-pointer xsPhone:w-[3rem] xsPhone:h-[3rem] text-center border-[#A77737] text-[#A77737] flex justify-center items-center hover:bg-[#c58f48] hover:text-white transition",
                    active === size && "bg-[#c58f48] text-white"
                  )}>
                  {size}
                </div>
              );
            })}
          </div>
          <Button
            type="submit"
            disabled={submitting === true || !session}
            className="laptop:w-fit xsPhone:w-full border bg-[#c58f48] hover:bg-[#ae7a36] flex justify-center items-center gap-2 text-white p-6 text-sm font-lato uppercase tracking-widest">
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                Adding <Loader2Icon className="animate-spin" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                Add to Bag <ShoppingBagIcon className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CartButtons;
