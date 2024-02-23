import axios from "axios";
import sha256 from "crypto-js/sha256";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { amount, mobileNumber } = await req.json();
    const transaction = "Tr-" + v4().toString().slice(-6);

    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MID,
      merchantTransactionId: transaction,
      merchantUserId: "MU-" + v4().toString().slice(-6),
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

    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
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
    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
  }
}
