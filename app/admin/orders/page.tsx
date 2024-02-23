import { DataTable } from "@/components/admin/orders/DataTable";
import axios from "axios";
import React from "react";
import { Columns } from "./columns";
import { CartProduct, OrdersType } from "@/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TryAgain from "@/components/auth/TryAgain";

export type Orders = {
  id: string;
  amount: number;
  status: string;
  phone: string;
  name: string;
  zip: number;
  state: string;
  city: string;
  street: string;
  date: Date;
  userId: string;
  products: [{ id: string; Quantity: number; size: string }];
};

// id: string;
//             name: string;
//             price: number;
//             Quantity: number;
//             size: string;
async function page() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN" || !session) {
      return <TryAgain message="You Are Not Authorized to Access this Page" />;
    }

    const orders = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/orders`
    );
    console.log("orders.data", orders.data);

    let ordersData: Orders[] = [];

    let userID = "";

    orders.data.map((order: any) => {
      userID = order.userId;
      return order.orders.map((o: OrdersType) => {
        console.log(userID);
        ordersData.push({
          amount: o.Tr_amt,
          id: o.Tr_id,
          date: o.payment_date,
          name: o.delivery.name,
          city: o.delivery.city,
          phone: o.delivery.phone,
          state: o.delivery.state,
          street: o.delivery.street,
          zip: o.delivery.zip,
          status: o.del_status,
          products: o.products,
          userId: userID,
        });
      });
    });

    console.log("ordersData===", ordersData);

    return (
      <div>
        <DataTable data={ordersData} columns={Columns} />
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default page;
