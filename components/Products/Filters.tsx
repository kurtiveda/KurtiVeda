"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";

import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Categories, Filters, ProductType } from "@/types";
import client from "@/sanity/sanity.client";
import { groq } from "next-sanity";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FilterIcon } from "lucide-react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import useFiltersStore from "@/zustand/filterStore";

interface FilterComponentProps {
  categories: Categories[];
  query?: string;
}

const Filter = ({ categories, query }: FilterComponentProps) => {
  //   return (
  //     <div>
  //       <div>Filters</div>
  //     </div>
  //   );
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="uppercase font-lato tracking-widest">
            Filters and Sort
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <ProfileForm className="w-full" categories={categories} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="border-[#A77737] text-[#A77737] hover:text-[#A77737] hover:bg-slate-300/20 mt-8 rounded-none">
          Filters and Sort
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white w-full">
        <ProfileForm className="px-4 w-full" categories={categories} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-[#A77737] text-[#A77737] hover:text-[#A77737] hover:bg-slate-300/20 rounded-none">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Filter;

export function ProfileForm({
  className,
  categories,
}: {
  className: string;
  categories?: Categories[];
}) {
  const router = useRouter();

  const { presetFilters, setPresetFilters, resetFilters } = useFiltersStore();

  const [currentCategory, setCurrentCategory] = useState<string[]>();

  useEffect(() => {
    const currentFilters = JSON.parse(localStorage.getItem("presetFilters")!);
    const curCat = JSON.parse(localStorage.getItem("categories")!);
    setCurrentCategory(curCat);

    setPresetFilters({ ...currentFilters, categories: curCat });
  }, [setPresetFilters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPresetFilters({ ...presetFilters, sort: e.target.value });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    if (e.target.checked) {
      setPresetFilters({
        ...presetFilters,
        sizes: [...presetFilters.sizes, size],
      });
    } else {
      setPresetFilters({
        ...presetFilters,
        sizes: presetFilters.sizes.filter((s) => s !== size),
      });
    }
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => {
    const isChecked = e.target.checked;

    let updatedCategories;
    if (isChecked) {
      updatedCategories = [...presetFilters.categories, _id];
    } else {
      updatedCategories = presetFilters.categories.filter((c) => c !== _id);
      setCurrentCategory([""]);
      localStorage.setItem("categories", JSON.stringify([""]));
    }

    setPresetFilters({
      ...presetFilters,
      categories: updatedCategories,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = encodeURIComponent(JSON.stringify(presetFilters));
    localStorage.setItem("presetFilters", JSON.stringify(presetFilters));
    localStorage.setItem(
      "categories",
      JSON.stringify(presetFilters.categories)
    );
    router.replace(`/shop/${queryString}`);
  };

  return (
    <div className="bg-white p-4 w-full rounded-lg shadow-none font-lato tracking-widest space-y-7 font-light laptop:text-sm phone:text-[10px] uppercase">
      <h2 className="text-lg font-semibold mb-2 font-lato tracking-widest uppercase flex justify-start items-center gap-2 text-[#A77737]">
        <FilterIcon className="w-5 h-5 fill-[#A77737] text-[#A77737]" /> Filters
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 space-y-3">
          <label className="block text-sm font-medium mb-1">Sort By:</label>
          <select
            className="rounded-md border px-2 py-2 laptop:w-full relative xsPhone:w-full text-sm"
            value={presetFilters.sort}
            onChange={handleSortChange}>
            <option value="Title asc">Name (A-Z)</option>
            <option value="Title desc">Name (Z-A)</option>
            <option value="Price asc">Price (Low to High)</option>
            <option value="Price desc">Price (High to Low)</option>
          </select>
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-sm font-medium mb-1">Sizes:</label>
          <div className="flex flex-col justify-start items-start gap-3">
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="S"
                onChange={handleSizeChange}
                checked={presetFilters.sizes?.includes("S")}
              />
              <span className="ml-2">Small (S)</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="M"
                onChange={handleSizeChange}
                checked={presetFilters.sizes?.includes("M")}
              />
              <span className="ml-2">Medium (M)</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="L"
                onChange={handleSizeChange}
                checked={presetFilters.sizes?.includes("L")}
              />
              <span className="ml-2">Large (L)</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="XL"
                onChange={handleSizeChange}
                checked={presetFilters.sizes?.includes("XL")}
              />
              <span className="ml-2">XL</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="XXL"
                onChange={handleSizeChange}
                checked={presetFilters.sizes?.includes("XXL")}
              />
              <span className="ml-2">XXL</span>
            </label>
          </div>
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-sm font-medium mb-1">Categories:</label>
          <div
            className="flex flex-col justify-center items-start gap-3"
            key={Math.random()}>
            {categories?.map((category, index) => {
              return (
                <>
                  <label className="inline-flex items-center mr-4" key={index}>
                    <input
                      type="checkbox"
                      value={category.title}
                      onChange={(e) => handleCategoryChange(e, category._id)}
                      color="#A77737"
                      checked={
                        presetFilters.categories.includes(category._id) ||
                        currentCategory?.includes(category._id)
                      }
                    />
                    <span className="ml-2">{category.title}</span>
                  </label>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex tablet:flex-col laptop:flex-row w-full gap-4 justify-center items-center text-center ">
          <button
            type="submit"
            className="bg-[#c38f4c] hover:bg-[#A77737] transition text-white font-semibold px-4 py-2 uppercase laptop:w-1/2 tablet:w-full text-[12px]">
            Apply
          </button>
          <button
            type="button"
            className="bg-white text-[#c38f4c] border border-[#c38f4c] hover:bg-[#c38f4c]/10 text-[12px] uppercase transition font-semibold px-4 py-2 laptop:w-1/2 tablet:w-full"
            onClick={() => {
              resetFilters();
              localStorage.setItem(
                "presetFilters",
                JSON.stringify({ sort: "", sizes: [], categories: [] })
              );
              localStorage.setItem("categories", JSON.stringify([""]));
              router.replace("/shop");
            }}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
