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
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

type Props = {
  data: any;
  error: any;
  isLoading: any;
};

const FavTable = (props: Props) => {
  if (props.isLoading) {
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

  if (props.error) {
    return <div>{props.error.message}</div>;
  }

  return (
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
        {props?.data?.map((fav: any) => (
          <TableRow key={fav.id}>
            <TableCell className="font-medium">
              <Image
                src={fav.vehicle.Images[0].url}
                width={150}
                height={150}
                alt={fav.vehicle.name}
                className="rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium">{fav.vehicle.model}</TableCell>
            <TableCell>{fav.vehicle.name}</TableCell>
            <TableCell>{fav.vehicle.year}</TableCell>
            <TableCell>{fav.vehicle.vehicle_type}</TableCell>
            <TableCell>{fav.vehicle.fuel_type}</TableCell>
            <TableCell className="text-right">
              {fav.vehicle.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
            <TableCell className="flex justify-end">
              <Button variant={"default"} size={"icon"} className="mr-2">
                <Link href={`/dashboard/vehicles/${fav.vehicle.id}`}>
                  <Link2 size={24} />
                </Link>
              </Button>
              <Button variant={"destructive"} size={"icon"}>
                <Trash size={24} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FavTable;
