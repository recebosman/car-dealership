"use client";
import AddVehicleModal from "@/components/modals/AddVehicleModal";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/comboBox";
import { Input } from "@/components/ui/input";
import VehicleCards from "@/components/vehicles/VehicleCards";
import { vehicles_brand } from "@/constants";
import { vehicles_type } from "@/constants";
import { SlidersHorizontal } from "lucide-react";

const Vehicles = () => {
  return (
    <div className="cntr">
      <>
        <h1 className="text-3xl font-bold">Vehicles</h1>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="space-x-4 hidden md:flex w-full">
              <div className="flex space-x-2 ">
                <ComboboxDemo data={vehicles_type} command="Select Type" />
                <ComboboxDemo data={vehicles_brand} command="Select Brand" />
              </div>
              <div className="hidden lg:flex w-1/3  items-center space-x-2">
                <Input type="email" placeholder="Search a vehicle" />
                <Button type="submit">Search</Button>
              </div>
            </div>
            <div className="space-x-4 flex">
              <AddVehicleModal />
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
        <VehicleCards />
        <VehicleCards />
        <VehicleCards />
        <VehicleCards />
      </div>
    </div>
  );
};

export default Vehicles;
