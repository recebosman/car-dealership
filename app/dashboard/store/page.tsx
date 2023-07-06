"use client";
import GetShopName from "@/action/shop/GetShopName";
import { CreateStoreCard } from "@/components/store/CreateStoreCard";
import { StoreCard } from "@/components/store/StoreCard";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const page = () => {
  const { data, isError, isLoading } = GetShopName();

  return (
    <div className="cntr">
      <h1 className="text-3xl font-bold">Your Store</h1>
      <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        <CreateStoreCard />
        {isLoading && (
          <>
            {Array.from(Array(3).keys()).map((i) => (
              <Skeleton key={i} />
            ))}
          </>
        )}
        {isError && <p className="text-red-500">Something went wrong</p>}
        {data &&
          data?.store?.map((store: any) => (
            <StoreCard key={store.id} storeName={store.name} id={store.id} />
          ))}
      </div>
    </div>
  );
};

export default page;
