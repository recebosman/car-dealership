"use client";
import GetCurrentUser from "@/action/auth/GetCurrentUser";
import GetVehicles from "@/action/cars/GetCars";
import AddVehicleModal from "@/components/modals/AddVehicleModal";
import SearchInput from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/comboBox";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationVehicle from "@/components/vehicles/Pagination";
import VehicleCards from "@/components/vehicles/VehicleCards";
import { vehicles_brand } from "@/constants";
import { vehicles_type } from "@/constants";
import useFilterStore from "@/store/useFilterStore";
import useSearchStore from "@/store/useSearchStore";
import { Frown, SlidersHorizontal } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

const Vehicles = () => {
  const { setVehicleType, vehicleType } = useFilterStore();
  const { isDataNotFound } = useSearchStore();
  const { data, isError, isLoading } = GetVehicles();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const SkeletonRepeat = ({ count }: { count: number }) => {
    const skeletonElements = [];

    for (let i = 0; i < count; i++) {
      skeletonElements.push(
        <div
          key={i}
          className="flex flex-col rounded-lg border bg-card max-w-md w-full"
        >
          <div className="flex justify-between p-4 w-full">
            <div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-2 p-4">
            <Skeleton className="h-48 w-full rounded-b-lg" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[30px]" />
            </div>
          </div>
        </div>
      );
    }

    return skeletonElements;
  };

  return (
    isClient && (
      <div className="cntr">
        <>
          <h1 className="text-3xl font-bold">Vehicles</h1>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div></div>
              <div className="space-x-4 hidden md:flex w-full">
                <div className="flex space-x-2 ">
                  <ComboboxDemo
                    data={vehicles_type}
                    setVehicleType={setVehicleType}
                    command="Select Type"
                  />
                  <ComboboxDemo data={vehicles_brand} command="Select Brand" />
                </div>
                <SearchInput />
              </div>
              <div className="space-x-4 flex">
                <Suspense fallback={<div>Loading...</div>}>
                  <AddVehicleModal />
                </Suspense>

                <Button
                  className="bg-[#A162F7] hover:bg-purple-700 rounded-lg"
                  size="icon"
                >
                  <SlidersHorizontal />
                </Button>
              </div>
            </div>
          </div>
        </>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 mt-8">
          {isLoading && (
            <>
              <SkeletonRepeat count={4} />
            </>
          )}
          {isError && (
            <div className="flex justify-center items-center">
              <p className="text-2xl">Error...</p>
            </div>
          )}

          {isDataNotFound ? (
            <div className="col-span-12">
              <Frown className="mx-auto" size={128} />
              <p className="text-2xl text-center font-semibold text-gray-800">
                Please try again with different keyword or add new vehicle.
              </p>
            </div>
          ) : (
            data?.vehicles?.map((data: any) => (
              <VehicleCards key={data.id} data={data} />
            ))
          )}
        </div>
        <PaginationVehicle />
      </div>
    )
  );
};

export default Vehicles;
