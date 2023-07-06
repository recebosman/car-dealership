import { CreateStoreCard } from "@/components/store/CreateStoreCard";
import StoreCard from "@/components/store/StoreCard";
import React from "react";

const page = () => {
  return (
    <div className="cntr">
      <h1 className="text-3xl font-bold">Your Store</h1>
      <div className="mt-4">
        <CreateStoreCard />
      </div>
    </div>
  );
};

export default page;
