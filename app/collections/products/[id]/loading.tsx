import Header from "@/components/Header/Header";
import PageLoader from "@/components/Products/PageLoader";
import React from "react";

function loading() {
  return (
    <div className="pb-10">
      <PageLoader />
    </div>
  );
}

export default loading;
