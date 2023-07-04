import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/comboBox";
import { Input } from "@/components/ui/input";
import { vehicles_brand } from "@/constants";
import { vehicles_type } from "@/constants";
import { Grip, SlidersHorizontal } from "lucide-react";

const page = () => {
  return (
    <div className="cntr">
      <h1 className="text-3xl font-bold">Your Vehicles</h1>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="space-x-4 flex w-full">
            <ComboboxDemo data={vehicles_type} command="Select Type" />
            <ComboboxDemo data={vehicles_brand} command="Select Brand" />
            <div className="flex w-full max-w-lg items-center space-x-2">
              <Input type="email" placeholder="Search a vehicle" />
              <Button type="submit">Search</Button>
            </div>
          </div>
          <div className="space-x-4 flex">
            <Button variant="outline" size="icon">
              <Grip />
            </Button>
            <Button className="bg-[#A162F7] hover:bg-purple-700" size="icon">
              <SlidersHorizontal />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
