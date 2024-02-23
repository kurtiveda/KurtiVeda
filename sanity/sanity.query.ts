import { groq } from "next-sanity";
import client from "./sanity.client";
import { BannerType, ProductType } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

export async function getProducts(start: number, end: number) {
  return client.fetch<ProductType[]>(
    groq`*[_type == "Products" && !out_of_stock][${start.toString()}...${end.toString()}]{
        _id,
        Title,
        description,
        productMedia[]{
            asset -> {url}
        },
        Price,
        out_of_stock,
        sizes,
        features,
        line_description
      }`,
    {},
    {
      cache: "no-cache",
      next: { tags: ["Products"] },
    }
  );
}

export async function getNewProduct() {
  return client.fetch<ProductType[]>(
    groq`*[_type == "Products" && !out_of_stock]| order(_createdAt desc) [0...4]{
        _id,
        Title,
        description,
        productMedia[]{
            asset -> {url}
        },
        Price,
        out_of_stock,
        features,
    line_description
      }`,
    {},
    {
      cache: "no-cache",
      next: { tags: ["Products"] },
    }
  );
}

export async function getBanner() {
  return client.fetch<BannerType[]>(
    groq`*[_type == "Banner"]{
      _id,
      Title,
      description,
      bannerMedia[]{
        asset -> {url}
      }
    }`,
    {},
    {
      cache: "no-cache",
      next: { tags: ["Banner"] },
    }
  );
}

export async function getProductById(id: string) {
  return client.fetch<ProductType[]>(
    groq`*[_type == "Products" && _id == "${id}" && !out_of_stock]{
    _id,
    Title,
    description,
    productMedia[]{
        asset -> {url}
    },
    Price,
    out_of_stock,
    sizes,
    features,
    line_description
  }`,
    {},
    {
      cache: "no-cache",
      next: { tags: ["Products"] },
    }
  );
}
