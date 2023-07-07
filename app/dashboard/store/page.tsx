"use client";
import GetShopName from "@/action/shop/GetShopName";
import { CreateStoreCard } from "@/components/store/CreateStoreCard";
import { StoreCard } from "@/components/store/StoreCard";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const { data, isError, isLoading, mutate } = GetShopName();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete("/api/store", {
        params: {
          id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Store deleted successfully.");
      mutate();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="cntr">
      <h1 className="text-3xl font-bold">Your Store</h1>
      <div className="mt-4 flex gap-4 ">
        <CreateStoreCard />
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center h-full">
          {isLoading && (
            <>
              {Array(3).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </>
          )}
          {isError && <p className="text-red-500">Something went wrong</p>}
          {data &&
            data?.store?.map((store: any) => (
              <StoreCard
                key={store.id}
                storeName={store.name}
                id={store.id}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
