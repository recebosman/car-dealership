import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Store } from "lucide-react";
import Link from "next/link";

type StoreCardProps = {
  storeName: string;
  id: number;
  vehicleCount: number;
  handleDelete: (id: number) => void;
};

export function StoreCard({
  storeName,
  id,
  handleDelete,
  vehicleCount,
}: StoreCardProps) {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Store /> {storeName}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant="ghost">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleDelete(id)}>
                  <span>Delete Shop</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-gray-500">{storeName}.com</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-lg text-gray-500">Total Vehicles</span>
            <span className="text-2xl font-bold">{vehicleCount}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-lg text-gray-500">Total Orders</span>
            <span className="text-2xl font-bold">
              {Math.floor(Math.random() * 100)}
            </span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/store/${id}`}>
          <Button variant="default">View Store</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
