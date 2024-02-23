"use client";
import React from "react";
import { Button } from "./button";
import { usePathname, useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsAppButton = ({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) => {
  const url = usePathname();

  const newMessage =
    ((message + " " + process.env.NEXT_PUBLIC_DEMO_URL) as string) + url;

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      newMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="bg-green-500 hover:bg-green-600 hover:scale-105 transition font-lato uppercase tracking-widest font-medium flex justify-center items-center gap-2">
      <FaWhatsapp className="w-5 h-5" />
      <p> Message</p>
    </Button>
  );
};

export default WhatsAppButton;
