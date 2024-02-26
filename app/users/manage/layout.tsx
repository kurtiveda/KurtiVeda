import Header from "@/components/Header/Header";
import ManageSideBar from "@/components/users/ManageSideBar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <hr />
      <div className="flex justify-start items-start relative">
        <div className="w-[25rem] border h-screen xsPhone:hidden laptop:block">
          <ManageSideBar />
        </div>
        <div className="w-full laptop:ml-10 overflow-x-auto">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
