import React from "react";
import Countdown from "@/components/ui/Countdown";

function CountDownCarousel({ promoCodes }: { promoCodes: any }) {
  return (
    <>
      {promoCodes.map((promo: any, index: number) => {
        return (
          <Countdown
            expiration={new Date(promo.expirationDate)}
            key={index}
            name={promo.code}
            tagline={promo.tagline}
          />
        );
      })}
    </>
  );
}

export default CountDownCarousel;
