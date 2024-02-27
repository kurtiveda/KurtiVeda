"use client";

import AllProducts from "@/components/Products/AllProducts";
import CardLoaders from "@/components/Products/CardLoaders";
import Pagination from "@/components/Products/Pagination";
import { applyFilters, constructQuery } from "@/lib/utils";
import client from "@/sanity/sanity.client";
import { Filters, ProductType } from "@/types";
import { groq } from "next-sanity";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: any;
}) {
  //   const page = searchParams["page"] ?? "1";
  //   const pageSize = searchParams["pageSize"] ?? "4";

  //   const start = Number(page - 1) * Number(pageSize);
  //   const end = start + Number(pageSize);
  //   const query = constructQuery(
  //     {
  //       sort: "",
  //       sizes: [],
  //       categories: [params.category],
  //     },
  //     start,
  //     end
  //   );

  const filters: Filters = {
    sizes: [],
    sort: "",
    categories: [params.category],
  };

  localStorage.setItem("categories", JSON.stringify(params.category));

  const query = encodeURIComponent(JSON.stringify(filters));

  return redirect(`/shop/${query}`);

  // console.log(queryGroq);
  //   const products = await client.fetch<ProductType[]>(groq`${query}`);

  //   console.log(products);

  // <Suspense fallback={<CardLoaders />}>
  //   <div className="flex flex-col justify-center items-center gap-6">
  //     <AllProducts products={products!} />
  //     <Pagination
  //       hasPreviousPage={start > 0}
  //       hasNextPage={end <= products?.length!}
  //     />
  //   </div>
  // </Suspense>
}

export default Page;
