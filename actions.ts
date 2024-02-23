"use server";

import { DelStatus } from "@prisma/client";
import { auth } from "./auth";
import { prisma } from "@/prisma/index";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { v4 as uuidv4 } from "uuid";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function setCartAddress(address: {
  name: string;
  phone: string;
  zip: number;
  state: string;
  city: string;
  street: string;
}) {
  const session = await auth();
  console.log(address.phone);
  const res = await prisma?.carts.update({
    where: {
      userId: session?.user?.id as string,
    },
    data: {
      cart: {
        updateMany: {
          where: {
            status: "IN_CART",
          },
          data: {
            delivery: address,
          },
        },
      },
    },
  });

  console.log(res);
  return res?.cart;
}

export async function setOrderAmt(amount: number, userId: string) {
  try {
    const setCartAmt = await prisma?.carts.update({
      where: {
        userId: userId,
      },
      data: {
        cart: {
          updateMany: {
            where: {
              status: "IN_CART",
            },
            data: {
              Tr_amt: amount,
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function setDelStatus(
  Tr_id: string,
  status: DelStatus,
  userId: string
) {
  try {
    const setStatus = await prisma?.orders?.update({
      where: {
        userId: userId,
      },
      data: {
        orders: {
          updateMany: {
            where: {
              Tr_id: Tr_id,
            },
            data: {
              del_status: status,
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}
