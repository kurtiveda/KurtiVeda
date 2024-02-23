import client from "@/sanity/sanity.client";
import { Addresses, Categories, Filters, ProductType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { groq } from "next-sanity";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { auth } from "@/auth";
import { setOrderAmt } from "@/actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function constructQuery(filters: Filters, start: number, end: number) {
  let query = '*[_type == "Products" &&  out_of_stock == false'; // Base query

  // Applying sizes filter
  if (filters.sizes && filters.sizes.length > 0) {
    query += ` && (${filters.sizes
      .map((size) => `"${size}" in sizes`)
      .join("||")})`;
  }

  // Applying price filter
  if (filters.price) {
    query += ` && Price >= ${filters.price.min} && Price <= ${filters.price.max}`;
  }

  // Applying categories filter
  if (filters.categories && filters.categories.length > 0) {
    const categoryRefQuery = filters.categories
      .map((id) => `references(categories[*]._ref, "${id}")`)
      .join(" || ");
    query += ` && (${categoryRefQuery})`;
  }

  query += "]"; // Closing the query

  // Applying sort filter
  if (filters.sort) {
    query += `| order(${filters.sort})`;
  }

  query += `[${start.toString()}...${end.toString()}]`;

  query += `{ _id,
  Title,
  productMedia[]{
      asset -> {url}
  },
  Price,
 }`;

  return query;
}

export async function applyFilters(query: string, start: number, end: number) {
  if (query) {
    const decodedQuery = decodeURIComponent(query);
    const queryData = JSON.parse(decodedQuery);

    const queryGroq = constructQuery(queryData, start, end);

    // console.log(queryGroq);
    return client.fetch<ProductType[]>(groq`${queryGroq}`);
  }
}

export async function getCategory() {
  return client.fetch<Categories[]>(
    groq`*[_type == "Category"]|order(_createdAt desc)[0...4]{_id, title}`
  );
}
export async function makePayment(
  e: any,
  router: AppRouterInstance,
  amount: number,
  mobileNumber: string,
  userId: string
) {
  e.preventDefault();
  const transaction = "Tr-" + uuidv4().toString().slice(-6);

  const payload = {
    merchantId: process.env.NEXT_PUBLIC_MID,
    merchantTransactionId: transaction,
    merchantUserId: "MU-" + uuidv4().toString().slice(-6),
    amount: amount * 100,
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/status/${transaction}`,
    redirectMode: "POST",
    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/status/${transaction}`,
    mobileNumber: mobileNumber,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const dataPayload = JSON.stringify(payload);
  console.log(dataPayload);

  const dataBase64 = Buffer.from(dataPayload).toString("base64");
  console.log(dataBase64);

  const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = sha256(fullURL);

  const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
  console.log("c===", checksum);

  const UAT_PAY_API_URL =
    "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

  const response = await axios.post(
    UAT_PAY_API_URL,
    {
      request: dataBase64,
    },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
    }
  );
  // const response = await axios.post(
  //   `${process.env.NEXT_PUBLIC_APP_URL}/api/makePayment`,
  //   {
  //     amount: amount,
  //     mobileNumber: mobileNumber,
  //   }
  // );

  await setOrderAmt(amount, userId);

  const redirect = response.data.data.instrumentResponse.redirectInfo.url;
  return router.push(redirect);
}
