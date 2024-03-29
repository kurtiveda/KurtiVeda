import sha256 from "crypto-js/sha256";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { auth } from "@/auth";
import { prisma } from "@/prisma/index";

export async function POST(req: Request, res: NextResponse) {
  const data = await req.formData();
  //   const status = data.get("code");
  //   console.log(status);
  const merchantId = process.env.NEXT_PUBLIC_MID;
  console.log(merchantId);
  const transactionId = data.get("transactionId");
  console.log(transactionId);

  const st =
    `/pg/v1/status/${merchantId}/${transactionId}` +
    process.env.NEXT_PUBLIC_SALT_KEY;
  // console.log(st);
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
  console.log(checksum);

  const options = {
    method: "get",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": merchantId,
    },
  };

  // CHECK PAYMENT STATUS
  const response = await axios.request(options);
  console.log("r===", response.data.code);
  // return NextResponse.json(response.data.code);
  if (response.data.code == "PAYMENT_SUCCESS") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/success/${transactionId}`,
      {
        status: 301,
      }
    );
  } else {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/failure`, {
      status: 301,
    });
  }
}
