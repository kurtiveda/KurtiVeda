"use client";

import { cn } from "@/lib/utils";
import { CartProduct, ProductType } from "@/types";
import { ColumnDef, getPaginationRowModel } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon, MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import OrdersCard from "@/components/admin/orders/OrdersCard";
import { setDelStatus } from "@/actions";
import { useRouter } from "next/navigation";
import OrderStateUpdate from "@/components/admin/orders/OrderStateUpdate";
import { DelStatus } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
  products: [{ id: string; Quantity: number; size: string }];
  date: Date;
  userId: string;
};

export const Columns: ColumnDef<Orders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-6 w-6" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"));

      return (
        <div className="font-bold text-md text-center text-green-600">
          ₹ {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-6 w-6" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));

      return (
        <div className="text-start font-medium">{date.toDateString()}</div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "TransactionID",
    cell: ({ row }) => {
      const transactionID = String(row.getValue("id"));

      return (
        <div className="text-start font-lato text-md text-violet-600 font-bold">
          {transactionID}
        </div>
      );
    },
  },
  {
    accessorKey: "street",
    header: () => <div className="">Street</div>,
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "zip",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Pincode
          <ArrowUpDown className="ml-2 h-6 w-6" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pincode = Number(row.getValue("zip"));

      return <div className="text-center">{pincode}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = String(row.getValue("status"));

      //  | "EXCHANGE_PROCESSING" | "EXCHANGE_DONE"

      let className = "";

      switch (status) {
        case "PENDING":
          className = "bg-red-200 text-red-900";
          break;
        case "PROCESSING":
          className = "bg-yellow-200 text-yellow-900";
          break;
        case "DELIVERED":
          className = "bg-teal-200 text-teal-900";
          break;
        case "EXCHANGE_PROCESSING":
          className = "bg-sky-200 text-sky-900";
          break;
        case "EXCHANGE_DONE":
          className = "bg-violet-200 text-violet-900";
      }

      return (
        <div
          className={cn(
            "text-center rounded-full font-lato p-2 w-full text-xs",
            className
          )}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          No. of Products
          <ArrowUpDown className="ml-2 h-6 w-6" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const prod: Array<CartProduct> = row.getValue("products");
      const count = prod.length;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    id: "viewOrder",
    header: "View Order Details",
    cell: ({ row }) => {
      const products: CartProduct[] = row.getValue("products");
      console.log("prodID", products);
      return (
        <div className="flex justify-center items-center text-center">
          <Dialog>
            <DialogTrigger className="bg-slate-700 px-2 py-2 rounded-full text-white">
              <EyeIcon />
            </DialogTrigger>
            <DialogContent className="z-[200] bg-white">
              <DialogHeader>
                <DialogTitle>View Order Details</DialogTitle>
              </DialogHeader>
              {products.map((prod) => {
                return (
                  <OrdersCard
                    key={prod.id}
                    id={prod.id}
                    size={prod.size}
                    quantity={prod.Quantity}
                  />
                );
              })}
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
  },
  {
    id: "statusChange",
    header: "Change Status",
    cell: ({ row }) => {
      const trid = String(row.getValue("id"));
      const userId = String(row.getValue("userId"));

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex justify-center items-center p-4 bg-sky-600 hover:bg-sky-700 hover:text-white rounded-full text-white font-lato">
              Update Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Choose Status</DropdownMenuLabel>
            <DropdownMenuItem className="font-lato text-sm">
              <OrderStateUpdate trid={trid} userId={userId} status="PENDING" />
            </DropdownMenuItem>
            <DropdownMenuItem className="font-lato text-sm">
              <OrderStateUpdate
                trid={trid}
                userId={userId}
                status="PROCESSING"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="font-lato text-sm">
              <OrderStateUpdate
                trid={trid}
                userId={userId}
                status="DELIVERED"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="font-lato text-sm">
              <OrderStateUpdate
                trid={trid}
                userId={userId}
                status="EXCHANGE_PROCESSING"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="font-lato text-sm">
              <OrderStateUpdate
                trid={trid}
                userId={userId}
                status="EXCHANGE_DONE"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
