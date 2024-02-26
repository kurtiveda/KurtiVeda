import { auth } from "@/auth";
import TryAgain from "@/components/auth/TryAgain";
import UserDetailsForm from "@/components/users/UserDetails";
import { redirect } from "next/navigation";
import React from "react";

async function Details({ params }: { params: { id: string } }) {
  const session = await auth();
  // if (session?.user?.role !== "USER") {
  //   return (
  //     <TryAgain message={"You Must Log-In as a User to access this page"} />
  //   );
  // }

  return (
    <div className="">
      <UserDetailsForm
        userId={session?.user?.id as string}
        addressId={params.id}
      />
    </div>
  );
}

export default Details;
