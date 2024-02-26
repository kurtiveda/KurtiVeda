import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/index";
import { randomUUID } from "crypto";
import { getAddresses } from "@/controller/products";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const { name, phone, street, state, city, zip, userId } = await req.json();
  try {
    const user = await prisma?.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json("User not found");
    }
    const obj = {
      id: randomUUID(),
      name,
      phone,
      street,
      state,
      city,
      zip,
    };
    console.log(obj);
    const userAddress = await prisma?.user.update({
      where: { id: userId },
      data: {
        address: {
          push: obj,
        },
      },
    });
    console.log("userAddress === ", userAddress);
    return NextResponse.json({ success: "user address added successfully" });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function PUT(req: NextRequest) {
  const { name, phone, street, state, city, zip, userId, addressId } =
    await req.json();
  try {
    const user = await prisma?.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json("User not found");
    }
    const obj = {
      id: addressId,
      name,
      phone,
      street,
      state,
      city,
      zip,
    };
    console.log(obj);
    const userAddress = await prisma?.user.update({
      where: { id: userId },
      data: {
        address: {
          updateMany: {
            where: {
              id: addressId,
            },
            data: obj,
          },
        },
      },
    });
    console.log("updatedAddress === ", userAddress);
    return NextResponse.json({ success: "user address added successfully" });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function GET(req: NextRequest) {
  //   const { userId, addressId } = await req.json();
  const userId = headers().get("userId");
  const addressId = headers().get("addressId");
  try {
    const addresses = await getAddresses(userId as string);

    if (!addresses) {
      return NextResponse.json("No Addresses available for this user");
    }

    const currentAddress = addresses.filter(
      (address) => address.id === addressId
    );

    return NextResponse.json(currentAddress);
  } catch (err) {
    console.log(err);
    return NextResponse.json("GET ADDRESS ERROR");
  }
}

export async function DELETE(req: NextRequest) {
  const userId = headers().get("userId")!;
  const addressId = headers().get("addressId")!;
  try {
    const addresses = await getAddresses(userId as string);

    if (!addresses) {
      return NextResponse.json("No Addresses available for this user");
    }

    const newAddresses = addresses.filter(
      (address) => address.id !== addressId
    );

    const updatedAddresses = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address: newAddresses,
      },
    });
    console.log("updatedAddresses === ", updatedAddresses);
    return NextResponse.json(updatedAddresses);
  } catch (err) {
    console.log("Address Delete Error", err);
    return NextResponse.json({ error: err });
  }
}
