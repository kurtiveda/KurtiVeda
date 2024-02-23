"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CheckIcon, LoaderIcon } from "lucide-react";

function CartPromo({
  totalPrice,
  setNetPrice,
}: {
  totalPrice: number;
  setNetPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [code, setCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setIsApplying(false);
    setApplied(false);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(JSON.parse(address));
    setIsApplying(true);

    const promoResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/promoCode/validate`,
      {
        code: code,
        totalPrice,
      }
    );

    if (promoResponse.data.error) {
      console.log(promoResponse.data.error);
      setIsApplying(false);
      return;
    }

    setNetPrice(() => promoResponse.data.discountedPrice);
    setIsApplying(false);
    setApplied(true);
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="promo"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit" disabled={isApplying || applied}>
          {isApplying ? (
            <LoaderIcon className="animate-spin" />
          ) : applied ? (
            <div className="flex justify-center items-center gap-2">
              Applied <CheckIcon />
            </div>
          ) : (
            <div>Apply Promo-Code</div>
          )}
        </Button>
        <Button
          type={"reset"}
          onClick={() => {
            setApplied(false);
            setCode("");
            setIsApplying(false);
            setNetPrice(totalPrice);
          }}>
          Clear
        </Button>
      </form>
    </div>
  );
}

export default CartPromo;
