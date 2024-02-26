import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="w-full text-center flex flex-col justify-center items-center p-10 gap-10">
      <div className="space-y-4">
        <p className="text-4xl font-playfair">Manage Account</p>
        <h2 className="font-lato uppercase text-neutral-300 text-sm tracking-widest">
          Manage Your Addresses and Orders
        </h2>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link href={`/users/manage/viewAddress`}>
          <div className="bg-[#A77737] hover:bg-[#90642c] transition hover:scale-105 text-white p-2 px-4 font-lato tracking-widest text-sm">
            View Address
          </div>
        </Link>
        <Link href={`/users/manage/orders`}>
          <div className="bg-[#A77737] hover:bg-[#90642c] transition hover:scale-105 text-white p-2 px-4 font-lato tracking-widest text-sm">
            View Orders
          </div>
        </Link>
      </div>
    </div>
  );
}

export default page;
