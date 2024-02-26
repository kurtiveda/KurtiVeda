import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import UserAddressCards from "@/components/users/UserAddressCards";
import { getAddresses } from "@/controller/products";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const session = await auth();
  const addresses = await getAddresses(session?.user?.id as string);

  return (
    <div className="w-full flex flex-col laptop:justify-start laptop:items-start justify-center items-center gap-10 py-10 px-4">
      <p className="text-4xl font-playfair tracking-wider">Saved Addresses:</p>
      <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/users/manage/addresses`}>
        <div className="flex justify-center items-center gap-2 bg-[#A77737] text-white rounded-lg p-2 w-fit font-lato uppercase text-xs tracking-widest">
          <PlusIcon className="w-5 h-5" /> New Address
        </div>
      </Link>
      <div className="flex justify-center items-centers laptop:justify-start laptop:items-start w-full">
        <UserAddressCards
          addresses={addresses}
          userId={session?.user?.id as string}
        />
      </div>
    </div>
  );
}

export default page;
