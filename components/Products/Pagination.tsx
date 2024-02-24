"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

function Pagination({
  hasPreviousPage,
  hasNextPage,
}: {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);

  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "10";

  async function incNumber() {
    try {
      setLoading(true);
      await router.push(`?page=${Number(page) + 1}&pageSize=${pageSize}`);
    } finally {
      setLoading(false);
    }
  }

  async function decrementNumber() {
    if (Number(page) > 1) {
      setLoading(() => true);
      await router.push(`?page=${Number(page) - 1}&pageSize=${pageSize}`);
      setLoading(() => false);
    }
  }

  useEffect(() => setLoading(() => false), []);

  return (
    <div className="w-[96%] flex justify-between items-center">
      <Button
        onClick={decrementNumber}
        disabled={!hasPreviousPage}
        className="flex justify-center items-center bg-white text-[#c38f4c] font-lato text-sm uppercase font-bold hover:bg-[#c38f4c]/10 hover:scale-105 transition">
        {loading ? <Loader className="animate-spin" /> : <ChevronLeft />}
        Previous
      </Button>
      <Button
        onClick={incNumber}
        disabled={!hasNextPage}
        className="flex justify-center items-center bg-white text-[#c38f4c] font-lato font-bold text-sm uppercase hover:bg-[#c38f4c]/10 hover:scale-105 transition">
        Next {loading ? <Loader className="animate-spin" /> : <ChevronRight />}
      </Button>
    </div>
  );
}

export default Pagination;
