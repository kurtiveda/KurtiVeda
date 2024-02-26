"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

import Link from "next/link";
import {
  CheckCircle2Icon,
  HomeIcon,
  LayoutDashboard,
  Loader2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { getAddresses } from "@/controller/products";
import { useRouter } from "next/navigation";

function UserDetailsForm({
  userId,
  addressId,
}: {
  userId: string;
  addressId: string | undefined;
}) {
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  const schema = z.object({
    name: z.string().trim().min(2).max(255),
    phone: z.string().regex(phoneRegex).min(10).max(10),
    street: z.string().trim().min(2),
    city: z.string().trim().min(2),
    state: z.string().trim().min(2),
    zip: z.string().min(6).max(6),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [address, setAddress] = useState<{
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: number;
  }>({ name: "", phone: "", street: "", city: "", state: "", zip: 0 });

  const { register, handleSubmit, setValue } = form;

  useEffect(() => {
    if (addressId) {
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        method: "GET",
        headers: { userId: userId, addressId: addressId },
      })
        .then((addresses) => {
          return addresses.json();
        })
        .then((addresses) => {
          setValue("name", addresses[0].name);
          setValue("city", addresses[0].city);
          setValue("phone", addresses[0].phone);
          setValue("state", addresses[0].state);
          setValue("street", addresses[0].street);
          setValue("zip", String(addresses[0].zip));
        })
        .catch((error) => console.error(error));
    }
  }, [addressId, userId, setValue]);

  const { errors, isSubmitting, isLoading } = form.formState;

  const router = useRouter();

  const submitData = (data: z.infer<typeof schema>) => {
    const { name, phone, street, city, state, zip } = data;

    const obj = {
      name,
      phone,
      street,
      city,
      state,
      zip: Number(zip),
      userId,
      addressId: addressId?.at(0) as string,
    };

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
      method: addressId ? "PUT" : "POST",
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success("Data saved");
        router.refresh();
        return data;
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error(err);
      });

    return obj;
  };

  return (
    <main className="flex flex-col justify-center laptop:items-start xsPhone:items-center phone:flex-col laptop:flex-col gap-[3rem] py-10 px-6">
      <p className=" w-full text-4xl font-playfair tracking-wider xsPhone:text-center laptop:text-start">
        {addressId ? <>Update Address: </> : <>Add New Address: </>}
      </p>
      <section className="border border-[#A77737] laptop:w-[60%] tablet:w-[70%] phone:w-full tablet:px-[5rem] laptop:px-0 bg-white/80 h-full flex justify-center items-center phone:py-10">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(submitData)}
            className="laptop:w-[60%] phone:w-[80%] flex flex-col justify-center items-center gap-5 ">
            <p className="laptop:text-2xl font-bold py-2 text-[#A77737] font-lato tracking-widest">
              Enter Your Details
            </p>
            <div className="flex flex-col gap-1 w-full ">
              <Input
                type="text"
                {...register("name")}
                name="name"
                placeholder="Full Name"
                className={cn(
                  "py-6 px-4 rounded-xl font-lato tracking-widest",
                  errors.name &&
                    "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                )}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Input
                type="text"
                {...register("phone")}
                name="phone"
                placeholder="Contact Number"
                className={cn(
                  "py-6 px-4 rounded-xl font-lato tracking-widest",
                  errors.name &&
                    "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                )}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 grid-rows-auto w-full gap-5">
              <div>
                <Input
                  type="text"
                  {...register("street")}
                  name="street"
                  placeholder="Street"
                  className={cn(
                    "py-6 px-4 rounded-xl font-lato tracking-widest",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.street && (
                  <span className="text-red-500 text-xs">
                    {errors.street.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  {...register("city")}
                  name="city"
                  placeholder="City"
                  className={cn(
                    "py-6 px-4 rounded-xl font-lato tracking-widest",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.city && (
                  <span className="text-red-500 text-xs">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  {...register("state")}
                  name="state"
                  placeholder="State"
                  className={cn(
                    "py-6 px-4 rounded-xl font-lato tracking-widest",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.state && (
                  <span className="text-red-500 text-xs">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  {...register("zip")}
                  name="zip"
                  placeholder="Zip"
                  className={cn(
                    "py-6 px-4 rounded-xl font-lato tracking-widest",
                    errors.name &&
                      "border-red-600 border-2 placeholder-red-700 bg-red-200/50"
                  )}
                />
                {errors.zip && (
                  <span className="text-red-500 text-xs">
                    {errors.zip.message}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex justify-center items-center gap-5">
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-[1.25rem] rounded-xl font-lato tracking-widest uppercase bg-[#A77737] hover:bg-[#9a6b2e]">
                {isSubmitting || isLoading ? <Loader2Icon /> : <>Submit</>}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}

export default UserDetailsForm;
