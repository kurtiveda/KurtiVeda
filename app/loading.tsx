import Header from "@/components/Header/Header";
import { Loader, Loader2Icon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-screen h-[100dvh]">
        <Loader2Icon className="animate-spin w-[100px] h-auto text-[#A77737]" />
      </div>
    </>
  );
};

export default loading;
