import CardIcon from "@/components/ui/CardIcon";
import { Car, DollarSign, Store } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="cntr">
      <h1 className="text-center font-bold text-2xl ">
        Welcome to the Car Dealership
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Link href="/dashboard/vehicles">
          <CardIcon
            title="Vehicles"
            description="All vehicles in the dealership"
            icon={
              <Car size={64} className="text-emerald-500 shadow-slate-200" />
            }
          />
        </Link>
        <Link href="/dashboard/stores">
          <CardIcon
            title="Stores"
            description="All your stores"
            icon={
              <Store size={64} className="text-emerald-500 shadow-slate-200" />
            }
          />
        </Link>
        <Link href="/dashboard/offers">
          <CardIcon
            title="Offers"
            description="All offers that are currently active"
            icon={
              <DollarSign
                size={64}
                className="text-emerald-500 shadow-slate-200"
              />
            }
          />
        </Link>
      </div>
    </div>
  );
};

export default page;
