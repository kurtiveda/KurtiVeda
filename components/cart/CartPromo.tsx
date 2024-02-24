"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { toast } from "sonner";

function CartPromo({
  totalPrice,
  setNetPrice,
  userId,
}: {
  totalPrice: number;
  setNetPrice: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
}) {
  const [code, setCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setIsApplying(false);
    setApplied(false);
    setError("");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(JSON.parse(address));
    try {
      setIsApplying(true);

      if (code === "") {
        setIsApplying(false);
        setApplied(false);
        setError("Please Enter a Valid Code");
        return;
      }

      const promoResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/promoCode/validate`,
        {
          code: code.toUpperCase(),
          totalPrice,
          userId,
        }
      );

      if (promoResponse.data.error) {
        console.log(promoResponse.data.error);
        setError(promoResponse.data.error);
        setIsApplying(false);
        return;
      }

      setNetPrice(() => promoResponse.data.discountedPrice);
      setIsApplying(false);
      setApplied(true);
      setError("");
    } catch (err) {
      setIsApplying(false);
      setApplied(false);
      setError("");
      console.log("promo error", err);
      toast.error("Something went wrong, please try again");
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full space-y-4">
        <Input
          type="text"
          name="promo"
          value={code}
          placeholder="Have a Promo Code?"
          onChange={(e) => setCode(e.target.value)}
          className={cn(
            "uppercase text-xs font-lato tracking-widest",
            applied === true && "border-2 border-green-500",
            error && "border-2 border-red-500"
          )}
        />
        <Label
          htmlFor="promo"
          className={cn(
            "font-lato tracking-widest text-[11px] p-1 text-red-500 uppercase hidden",
            error && "inline"
          )}>
          {error}
        </Label>
        <div className="flex justify-center items-center gap-2">
          <Button
            type="submit"
            disabled={isApplying || applied}
            className="w-[70%] bg-[#A77737] uppercase font-lato tracking-widest text-xs hover:bg-[#9c6d2f]">
            {isApplying ? (
              <LoaderIcon className="animate-spin" />
            ) : applied ? (
              <div className="flex justify-center items-center gap-2">
                Applied <CheckIcon />
              </div>
            ) : (
              <div>Apply</div>
            )}
          </Button>
          <Button
            className="w-[30%] bg-white border text-[#A77737] border-[#A77737] uppercase font-lato tracking-widest text-xs hover:bg-[#A77737]/10"
            type={"reset"}
            onClick={async () => {
              setApplied(false);
              setCode("");
              setIsApplying(false);
              setNetPrice(totalPrice);
              setError("");
            }}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CartPromo;
