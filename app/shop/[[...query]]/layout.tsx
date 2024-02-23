import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import Filters, { ProfileForm } from "@/components/Products/Filters";
import { ProdCards } from "@/components/Products/ProdCards";
import { applyFilters } from "@/lib/utils";
import client from "@/sanity/sanity.client";
import { Categories, ProductType } from "@/types";
import { groq } from "next-sanity";
import PageLoader from "@/components/Products/PageLoader";
import CardLoaders from "@/components/Products/CardLoaders";
import BreadCrumbs from "@/components/ui/BreadCrumbs";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { query: string };
}) => {
  const categories = await client.fetch<Categories[]>(
    groq`*[_type == "Category"]`,
    {},
    { next: { revalidate: 1 } }
  );

  return (
    <>
      <Header />
      <Separator />
      <div className="flex flex-col justify-center items-start">
        <div className="w-full pt-8 ">
          <BreadCrumbs />
        </div>
        <div className=" w-full text-center font-light flex tablet:flex-row xsPhone:flex-col justify-start items-center  py-[1.5rem] pt-0 realtive">
          <div className="tablet:absolute right-6 tablet:hidden xsPhone:flex">
            <Filters
              categories={categories}
              query={params.query && params.query[0]}
            />
          </div>
        </div>
        <div className="flex justify-start items-start w-full relative">
          <div className="w-[25%] h-full laptop:px-4 tablet:pl-4 xsPhone:hidden tablet:flex sticky top-0">
            <ProfileForm categories={categories} className="" />
          </div>
          <Suspense fallback={<CardLoaders />}>
            <div className="tablet:w-[85%] xsPhone:w-full py-4">{children}</div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Layout;
