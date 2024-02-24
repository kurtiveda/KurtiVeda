import sha256 from "crypto-js/sha256";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/prisma/index";

export async function POST(req: Request, res: NextResponse) {
  const { transaction, userId } = await req.json();
  const merchantId = process.env.NEXT_PUBLIC_MID;
  console.log(merchantId);
  const transactionId = transaction;
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
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: { promoUsed: true },
    });
    if (user?.promoUsed === false) {
      await prisma?.user.update({
        where: {
          id: userId,
        },
        data: {
          promoUsed: true,
        },
      });
    }

    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
}
