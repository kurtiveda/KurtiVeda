import { auth } from "@/auth";
import TryAgain from "@/components/auth/TryAgain";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return <TryAgain message="You are not allowed to visit this page" />;
  }
  return <div>{children}</div>;
}

export default layout;
