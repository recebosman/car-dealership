"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link2, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import GetCarByStoreId from "@/action/cars/GetCarByStoreId";

const Store = ({ params }: any) => {
  const { data: cars, error, isLoading, mutate } = GetCarByStoreId(params);
  const [deleting, setDeleting] = useState(false);

  if (isLoading) {
    return (
      <div className="cntr">
        <Table>
          <TableCaption>
            A list of your recent
            <span className="text-red-600"> favorites</span>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[100px]">Model</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Fuel Type</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[100px] h-[40px]" />
              </TableCell>
              <TableCell className="flex justify-end">
                <Button variant={"default"} size={"icon"} className="mr-2">
                  <Skeleton className="h-6 w-6" />
                </Button>
                <Button variant={"destructive"} size={"icon"}>
                  <Skeleton className="h-6 w-6" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return <div>error</div>;
  }

  const handleDelete = async (id: number) => {
    if (deleting) return;
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/vehicle?id=${id}`);
      toast.success("Vehicle deleted successfully");
      mutate();
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again");
    }
    setDeleting(false);
  };

  return (
    <div className="cntr">
      <Table>
        <TableCaption>
          A list of your recent
          <span className="text-red-600"> vehicles</span>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Model</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fuel Type</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars?.vehicles?.map((data: any) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">
                <Image
                  src={data.Images[0].url}
                  width={150}
                  height={150}
                  alt="car image"
                  className="rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">{data.model}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.year}</TableCell>
              <TableCell>{data.vehicle_type}</TableCell>
              <TableCell>{data.fuel_type}</TableCell>
              <TableCell className="text-right">
                {data.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell className="flex justify-end">
                <Button variant={"default"} size={"icon"} className="mr-2">
                  <Link href={`/dashboard/vehicles/${data.id}`}>
                    <Link2 size={24} />
                  </Link>
                </Button>
                <Button
                  onClick={() => handleDelete(data.id)}
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash size={24} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Store;
