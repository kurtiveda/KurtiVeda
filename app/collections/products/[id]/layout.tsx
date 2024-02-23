import Header from "@/components/Header/Header";
import Accordian from "@/components/Products/Accordian";
import PageLoader from "@/components/Products/PageLoader";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
