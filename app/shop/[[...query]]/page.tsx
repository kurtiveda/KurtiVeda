import AllProducts from "@/components/Products/AllProducts";
import CardLoaders from "@/components/Products/CardLoaders";
import Filters from "@/components/Products/Filters";
import Pagination from "@/components/Products/Pagination";
import { ProdCards } from "@/components/Products/ProdCards";
import { applyFilters } from "@/lib/utils";
import client from "@/sanity/sanity.client";
import { getProducts } from "@/sanity/sanity.query";
import { Categories, ProductType } from "@/types";
import { groq } from "next-sanity";
import React, { Suspense } from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams: any;
}) => {
  const page = searchParams["page"] ?? "1";
  const pageSize = searchParams["pageSize"] ?? "10";

  const start = Number(page - 1) * Number(pageSize);
  const end = start + Number(pageSize);

  const products = params.query
    ? await applyFilters(params.query && params.query[0], start, end)
    : await getProducts(start, end);

  return (
    <Suspense fallback={<CardLoaders />}>
      <div className="flex flex-col justify-center items-center gap-6">
        <AllProducts products={products!} />
        <Pagination
          hasPreviousPage={start > 0}
          hasNextPage={end <= products?.length!}
        />
      </div>
    </Suspense>
  );
};

export default Page;
