"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Info, Mail, Phone, Store, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GetCarById from "@/action/cars/GetCarById";
import { Vehicles } from "@prisma/client";

const Vehicle = ({ params }: any) => {
  const idNumber = parseInt(params.id);
  const { data, error, isLoading } = GetCarById({ id: idNumber });

  if (isLoading) {
    return (
      <div className="relative mx-auto max-w-screen-2xl px-4 py-8">
        <div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="grid gap-8 lg:grid-cols-4 lg:items-start mt-2">
            <div className="lg:col-span-3">
              <Skeleton className="h-96 w-full rounded-xl" />
              <ul className="mt-1 flex gap-1">
                <li>
                  <Skeleton className="h-16 w-16 rounded-md" />
                </li>
                <li>
                  <Skeleton className="h-16 w-16 rounded-md" />
                </li>
                <li>
                  <Skeleton className="h-16 w-16 rounded-md" />
                </li>
              </ul>
            </div>
            <div className="lg:sticky lg:top-0">
              <div className="space-y-4 lg:pt-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-12 w-full rounded" />
                <Skeleton className="h-12 w-full rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const vehicle = data.vehicleById;

  return (
    <div className="relative mx-auto max-w-screen-2xl px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">{vehicle.name}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {vehicle.model}{" "}
          <span>
            {vehicle.vehicle_type === "new" ? (
              <Badge variant="green" className="ml-2 capitalize">
                {vehicle.vehicle_type}
              </Badge>
            ) : vehicle.vehicle_type === "used" ? (
              <Badge variant="yellow" className="ml-2 capitalize">
                {vehicle.vehicle_type}
              </Badge>
            ) : (
              <Badge variant="brown" className="ml-2 capitalize">
                {vehicle.vehicle_type}
              </Badge>
            )}
          </span>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
        <div className="lg:col-span-3">
          <div className="relative mt-4">
            <Image
              width={800}
              height={540}
              alt={vehicle.name}
              src={vehicle.Images[0].url}
              className="h-72 w-full rounded-xl object-cover lg:h-[540px] cursor-pointer "
            />

            <div className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>

              <span className="ms-1.5 text-xs"> Hover to zoom </span>
            </div>
          </div>

          <ul className="mt-1 flex gap-1">
            {vehicle.Images.map((image: any) => (
              <li key={image.id}>
                <Image
                  alt="Tee"
                  src={vehicle.Images[0].url}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-md object-cover transform hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:sticky lg:top-0">
          <div className="space-y-4 lg:pt-4">
            <div className="space-y-2  py-2 px-4  shadow-md rounded-lg border-2 border-black">
              <span className="text-md font-semibold text-slate-900 flex items-center gap-1 ">
                <Info /> Seller Info
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold flex items-center gap-1">
                  <Store size={24} />
                  {vehicle.store.name}
                </h2>
                <span className="text-sm text-gray-900 cursor-pointer flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 font-bold text-base   ">
                    <User size={24} /> {vehicle.user.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Button variant="outline" size="icon">
                      <Mail />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone />
                    </Button>
                  </span>
                </span>
              </div>
            </div>
            <fieldset>
              <legend className="text-2xl font-bold">Vehicle Year</legend>

              <div className="mt-2 flex flex-wrap gap-1">
                <Badge className="block rounded-full border border-gray-200 px-3 py-1 text-sm peer-checked:bg-gray-100 cursor-pointer">
                  {vehicle.year}
                </Badge>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-lg font-bold">Other İnformations</legend>

              <div className="mt-2 flex flex-wrap gap-1 capitalize">
                <Badge
                  variant={"green"}
                  className="block rounded-full border uppercase  border-gray-200 px-3 py-1 text-sm peer-checked:bg-gray-100"
                >
                  {vehicle.kilometers} km
                </Badge>
                <Badge
                  variant={"destructive"}
                  className="block rounded-full border border-gray-200 px-3 py-1 text-sm peer-checked:bg-gray-100"
                >
                  {vehicle.fuel_type}
                </Badge>
                <Badge
                  variant={"yellow"}
                  className="block rounded-full border border-gray-200 px-3 py-1 text-sm peer-checked:bg-gray-100"
                >
                  {vehicle.vehicle_class}
                </Badge>
              </div>
            </fieldset>

            <div className="rounded border bg-gray-100 p-4">
              <p className="text-sm">
                <span className="block"> Pay as low as $1,000/mo with </span>

                <a href="" className="mt-1 inline-block underline">
                  {" "}
                  Find out more{" "}
                </a>
              </p>
            </div>

            <div>
              <span className="font-bold text-lg md:text-2xl lg:text-2xl cursor-pointer ml-2">
                <span className="text-green-600">$</span>{" "}
                <span className="text-slate-900">
                  {vehicle.price.toLocaleString("en-US")}
                </span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
            >
              Buy now
            </button>

            <button
              type="button"
              className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Negotiate With Seller
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mt-8">
          {vehicle.store.name} Other Vehicles
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicle.store.vehicles
            .filter((x: Vehicles) => (x.id as number) !== vehicle.id)
            .reverse()
            .slice(0, 4)
            .map((vehicle: any) => {
              return (
                <Link
                  key={vehicle.id}
                  href={`/dashboard/vehicles/${vehicle.id}`}
                  className="relative block overflow-hidden max-w-md mb-4 w-full"
                >
                  <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                    <span className="sr-only">Wishlist</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>

                  <Image
                    src={vehicle.Images[0].url}
                    width={350}
                    height={150}
                    alt={vehicle.name}
                    className=" w-full object-cover transition duration-500 hover:scale-105 hover:opacity-75 sm:h-48 rounded-lg"
                  />

                  <div className="relative border border-gray-100 bg-white p-6">
                    {vehicle.vehicle_type === "new" ? (
                      <Badge variant={"green"} className="capitalize">
                        {vehicle.vehicle_type}
                      </Badge>
                    ) : vehicle.vehicle_type === "used" ? (
                      <Badge variant={"yellow"} className="capitalize">
                        {vehicle.vehicle_type}
                      </Badge>
                    ) : (
                      <Badge variant={"brown"} className="capitalize">
                        {vehicle.vehicle_type}
                      </Badge>
                    )}

                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {vehicle.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-gray-700">
                      ${vehicle.price.toLocaleString("en-US")}{" "}
                    </p>

                    <form className="mt-4">
                      <Button size={"full"}>Buy Now!</Button>
                    </form>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
