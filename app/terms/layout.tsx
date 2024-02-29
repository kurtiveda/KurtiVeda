import Header from "@/components/Header/Header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* <hr /> */}
      {children}
    </div>
  );
}

export default layout;
